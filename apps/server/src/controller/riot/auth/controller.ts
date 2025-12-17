import { ZodParserError } from "@/error/parser";
import { SessionRepository } from "@/repository/session";
import { UserRepository } from "@/repository/user";
import { AuthService } from "@/service/auth";
import { IRiotAuthController, RiotAuthRouteObject } from "@instalock/api";
import { RiotClient } from "@instalock/riot";
import {
  _Route,
  Controller,
  HttpStatus,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";
import { Request, Response } from "express";

@Controller({
  deps: [UserRepository, SessionRepository, AuthService],
})
export class RiotAuthController implements IRiotAuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly authService: AuthService,
  ) {}

  @_Route({
    ...RiotAuthRouteObject.getMe,
  })
  async getMe(
    _request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotAuthController["getMe"]>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const user = await this.userRepository.getUserByPuuid(
      response.locals.user.id,
    );

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    const session = await this.sessionRepository.getActiveSessionById(
      response.locals.session.id,
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
    }) satisfies Awaited<ReturnType<IRiotAuthController["getMe"]>>;
  }

  @_Route({
    ...RiotAuthRouteObject.authenticate,
  })
  async authenticate(
    request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotAuthController["authenticate"]>>> {
    const parser =
      await RiotAuthRouteObject.authenticate.schema.requestBody.safeParseAsync(
        request.body,
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const { url } = parser.data;

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
      const u = await this.userRepository.getUserByPuuid(puuid);
      if (u != null) {
        return this.userRepository.updateUser({
          ...u,
          riotEntitlement: entitlementToken,
          riotAuth: authToken,
        });
      }

      const cu = await this.userRepository.createUser({
        puuid,
        riotEntitlement: entitlementToken,
        riotAuth: authToken,
        riotTag: tagName,
      });

      return cu;
    })();

    if (!user) {
      throw new Error(
        `Expected a user that either existed or was newly created.`,
      );
    }

    const session = await this.authService.createSession(user.puuid, {});

    response.appendHeader(
      "Set-Cookie",
      this.authService.createSessionCookie(session.id).serialize(),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Riot authentication succeeded!",
      payload: {},
    }) satisfies Awaited<ReturnType<IRiotAuthController["authenticate"]>>;
  }

  @_Route({
    ...RiotAuthRouteObject.logout,
  })
  async logout(
    _request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotAuthController["logout"]>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const user = await this.userRepository.getUserByPuuid(
      response.locals.user.id,
    );

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    const updatedUser = await this.userRepository.updateUser({
      ...user,
      riotAuth: null,
      riotEntitlement: null,
    });

    if (!updatedUser) {
      throw new Error("Update user operation failed");
    }

    await this.authService.invalidateSession(response.locals.session.id);

    response.setHeader(
      "Set-Cookie",
      this.authService.createBlankSessionCookie().serialize(),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Your credentials have been successfully removed!",
      payload: {},
    }) satisfies Awaited<ReturnType<IRiotAuthController["logout"]>>;
  }
}
