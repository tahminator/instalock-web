import type { Request, Response } from "express";
import type { z } from "zod";

import { TimedAll } from "@instalock/meter";
import { RiotClient } from "@instalock/riot";
import {
  Controller,
  ControllerSchema,
  DELETE,
  GET,
  HttpStatus,
  POST,
  RequestBody,
  ResponseBody,
  ResponseEntity,
  ResponseStatusError,
  RouteSchema,
} from "@tahminator/sapling";

import {
  AuthenticateResponseBodySchema,
  AuthModalSchema,
  GetMeResponseBodySchema,
  LogoutResponseBodySchema,
  type AuthModalDto,
} from "@/controller/api/riot/auth/schema";
import { errorResponseBody } from "@/lib/api";
import { unwrap } from "@/lib/result";
import { SessionRepository } from "@/repository/session";
import { UserNotifier } from "@/repository/user/notify";
import { UserRepository } from "@/repository/user/repo";
import { AuthService } from "@/service/auth";

@Controller({
  prefix: "/api/riot/auth",
  deps: [UserRepository, SessionRepository, AuthService, UserNotifier],
})
@ControllerSchema({
  title: "Riot Authentication Routes",
  description:
    "Routes for authenticating with Riot, inspecting the current session, and logging out.",
})
@TimedAll()
export default class RiotAuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly authService: AuthService,
    private readonly userNotifier: UserNotifier,
  ) {}

  @GET()
  @ResponseBody(GetMeResponseBodySchema)
  @RouteSchema({
    summary: "Get current authentication status",
    description:
      "Returns the authenticated user and their active session, provided the request carries a valid session cookie and the linked Riot credentials are still valid.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The current user and session were retrieved",
        schema: GetMeResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description:
          "There is no active session, or the linked Riot credentials are no longer valid",
        schema: errorResponseBody,
      },
    ],
  })
  async getMe(
    _request: Request,
    response: Response,
  ): Promise<ResponseEntity<z.infer<typeof GetMeResponseBodySchema>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const user = unwrap(
      await this.userRepository.getUserByPuuid(response.locals.user.id),
    );

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    const session = unwrap(
      await this.sessionRepository.getActiveSessionById(
        response.locals.session.id,
      ),
    );

    if (!session) {
      throw new Error("Expected session to exist but did not.");
    }

    const { riotAuth, riotEntitlement } = user;

    if (!riotAuth || !riotEntitlement) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const riotRes = await RiotClient.getUserInfo(riotAuth);

    if (!riotRes.ok) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    return ResponseEntity.ok().body({
      success: true,
      message: "Authenticated!",
      payload: {
        user,
        session,
      },
    }) satisfies ResponseEntity<z.infer<typeof GetMeResponseBodySchema>>;
  }

  @POST()
  @RequestBody(AuthModalSchema)
  @ResponseBody(AuthenticateResponseBodySchema)
  @RouteSchema({
    summary: "Authenticate with Riot",
    description:
      "Exchanges the access token embedded in the Riot auth-modal redirect URL for Riot entitlements and user info, then creates (or updates) the local user and starts a session, setting the session cookie on the response.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "Riot authentication succeeded and a session was created",
        schema: AuthenticateResponseBodySchema,
      },
      {
        statusCode: HttpStatus.BAD_REQUEST,
        description:
          "The redirect URL could not be parsed for an access token, or Riot rejected the token",
        schema: errorResponseBody,
      },
    ],
  })
  async authenticate(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<z.infer<typeof AuthenticateResponseBodySchema>>> {
    const { url } = request.body as AuthModalDto;

    const authToken = (() => {
      try {
        const urlObject = new URL(url);
        const params = new URLSearchParams(urlObject.hash.substring(1));
        return params.get("access_token");
      } catch (e) {
        console.error(e);
        return null;
      }
    })();

    if (!authToken) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "URL cannot be parsed to find the access_token. If this issue keeps ocurring, please contact tahmidd on Discord.",
      );
    }

    const riotRes = await RiotClient.getEntitlement(authToken);

    const riotJson = await riotRes.json();

    if (riotJson.errorCode !== undefined) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "Failed to authenticate.",
      );
    }

    const { entitlements_token: entitlementToken } = riotJson;

    const riotUserInfoRes = await RiotClient.getUserInfo(authToken);

    if (!riotUserInfoRes.ok) {
      throw new Error(
        `Failed to fetch user info from RiotClient with status code of ${riotUserInfoRes.status}`,
      );
    }

    const riotUserInfoJson = await riotUserInfoRes.json();

    if (riotUserInfoJson.error !== undefined) {
      throw new Error(
        `Failed to fetch user info from RiotClient: ${JSON.stringify(riotUserInfoJson)}`,
      );
    }

    const tagName = `${riotUserInfoJson.acct.game_name}#${riotUserInfoJson.acct.tag_line}`;
    const puuid = riotUserInfoJson.sub;

    const user = await (async () => {
      const u = unwrap(await this.userRepository.getUserByPuuid(puuid));
      if (u != null) {
        return unwrap(
          await this.userRepository.updateUser({
            ...u,
            riotEntitlement: entitlementToken,
            riotAuth: authToken,
            newUser: false,
          }),
        );
      }

      const cu = unwrap(
        await this.userRepository.createUser({
          puuid,
          riotEntitlement: entitlementToken,
          riotAuth: authToken,
          riotTag: tagName,
        }),
      );

      await this.userNotifier.triggerUpdateNewUserMatches(cu.puuid);

      return cu;
    })();

    const session = await this.authService.createSession(user.puuid, {});

    response.appendHeader(
      "Set-Cookie",
      this.authService.createSessionCookie(session.id).serialize(),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Riot authentication succeeded!",
      payload: {},
    }) satisfies ResponseEntity<z.infer<typeof AuthenticateResponseBodySchema>>;
  }

  @DELETE()
  @ResponseBody(LogoutResponseBodySchema)
  @RouteSchema({
    summary: "Log out the current user",
    description:
      "Clears the stored Riot credentials, invalidates the active session, and clears the session cookie.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The user's credentials and session were cleared",
        schema: LogoutResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description: "There is no active session to log out of",
        schema: errorResponseBody,
      },
    ],
  })
  async logout(
    _request: Request,
    response: Response,
  ): Promise<ResponseEntity<z.infer<typeof LogoutResponseBodySchema>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const user = unwrap(
      await this.userRepository.getUserByPuuid(response.locals.user.id),
    );

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    unwrap(
      await this.userRepository.updateUser({
        ...user,
        riotAuth: null,
        riotEntitlement: null,
      }),
    );

    await this.authService.invalidateSession(response.locals.session.id);

    response.setHeader(
      "Set-Cookie",
      this.authService.createBlankSessionCookie().serialize(),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Your credentials have been successfully removed!",
      payload: {},
    }) satisfies ResponseEntity<z.infer<typeof LogoutResponseBodySchema>>;
  }
}
