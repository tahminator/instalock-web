import type { Request, Response } from "express";
import type { z } from "zod";

import { TimedAll } from "@instalock/meter";
import { RiotClient } from "@instalock/riot";
import {
  Controller,
  DELETE,
  GET,
  HttpStatus,
  POST,
  RequestBody,
  ResponseBody,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";

import {
  AuthenticateResponseBodySchema,
  AuthModalSchema,
  GetMeResponseBodySchema,
  LogoutResponseBodySchema,
  type AuthModalDto,
} from "@/controller/api/riot/auth/schema";
import { unwrap } from "@/lib/result";
import { SessionRepository } from "@/repository/session";
import { UserNotifier } from "@/repository/user/notify";
import { UserRepository } from "@/repository/user/repo";
import { AuthService } from "@/service/auth";

@Controller({
  prefix: "/api/riot/auth",
  deps: [UserRepository, SessionRepository, AuthService, UserNotifier],
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
      } catch {
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
