import { ZodParserError } from "@/error/parser";
import { PlayerMatchRepository } from "@/repository/playerMatch";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user";
import {
  IRiotQueryController,
  RiotMatchDetailed,
  RiotQueryRouteObject,
} from "@instalock/api";
import {
  getGameModeName,
  RiotClient,
  TierNumber,
  tierNumberToNameObject,
} from "@instalock/riot";
import {
  _Route,
  Controller,
  HttpStatus,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";
import { Request, Response } from "express";

@Controller({
  deps: [UserRepository, RiotMatchRepository, PlayerMatchRepository],
})
export class RiotQueryController implements IRiotQueryController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
    private readonly playerMatchRepository: PlayerMatchRepository,
  ) {}

  @_Route({
    ...RiotQueryRouteObject.getMyRiotDataShallow,
  })
  async getMyRiotDataShallow(
    _request: Request,
    response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotQueryController["getMyRiotDataShallow"]>>
  > {
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

    const { riotAuth, riotEntitlement, puuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !puuid || !riotTag) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "Some data is missing. Please logout & re-authenticate.",
      );
    }

    const myRank = await (async () => {
      const mostRecentMatch = (
        await this.riotMatchRepository.getMatchesByPlayerPuuid(user.puuid, 1)
      )[0];

      if (!mostRecentMatch) {
        return null;
      }

      const pm =
        await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
          user.puuid,
          mostRecentMatch.id,
        );

      return pm ? pm.tier : null;
    })();

    const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid,
      startIndex: 0,
      endIndex: 1,
    });

    if (!riotMatchInfoRes.ok) {
      throw new Error(
        `Failed to fetch riot match information with status of ${riotMatchInfoRes.status}`,
      );
    }

    const riotMatchInfoJson = await riotMatchInfoRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      throw new Error(`Failed to deserialized riot match info`);
    }

    const latestMatch = riotMatchInfoJson.Matches[0];

    const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
    const tierName = tierNumberToNameObject[tierKey];

    return ResponseEntity.ok().body({
      success: true,
      message: "Your riot data has been successfully retrieved!",
      payload: {
        puuid,
        riotTag,
        rank:
          myRank && !(myRank == null || myRank == 0)
            ? myRank
            : latestMatch.TierAfterUpdate,
        rr: latestMatch.RankedRatingAfterUpdate,
        rankName: tierName,
      },
    });
  }

  @_Route({
    ...RiotQueryRouteObject.getMyMatchesShallow,
  })
  async getMyMatchesShallow(
    _request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotQueryController["getMyMatchesShallow"]>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const puuid = response.locals.user.id;

    const user = await this.userRepository.getUserByPuuid(puuid);
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

    const matches =
      await this.riotMatchRepository.getMatchesByPlayerPuuid(puuid);
    const matchesWithoutRawField = matches.map((m) => ({
      ...m,
      raw: undefined,
    }));

    const mostRecentPlayerMatch =
      await this.playerMatchRepository.getMostRecentPlayerMatchByUserPuuid(
        puuid,
      );

    if (!mostRecentPlayerMatch) {
      throw new Error("Player match is missing but it should not be.");
    }

    const playerMatches =
      await this.playerMatchRepository.getBulkPlayerMatchesByPlayerAndMatches(
        matchesWithoutRawField.map((m) => ({ playerId: puuid, matchId: m.id })),
      );

    const joinIdsToPlayerMatchMap = new Map(
      playerMatches.map((pm) => [`${pm.playerId}:${pm.matchId}`, pm]),
    );

    const finalMatches: RiotMatchDetailed[] = matchesWithoutRawField.map(
      (m) => {
        const playerMatch =
          joinIdsToPlayerMatchMap.get(`${puuid}:${m.id}`) ?? null;

        const gameMode = getGameModeName(m.queueId ?? "Unknown");

        return {
          playerData: playerMatch,
          matchData: m,
          gameModeName: gameMode,
        };
      },
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "User matches received!",
      payload: finalMatches,
    });
  }

  @_Route({
    method: RiotQueryRouteObject.getMatchShallow.method,
    path: RiotQueryRouteObject.getMatchShallow.path(":matchId"),
  })
  async getMatchShallow(
    request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotQueryController["getMatchShallow"]>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const parser =
      await RiotQueryRouteObject.getMatchShallow.schema.pathParams.safeParseAsync(
        request.params,
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const matchId = parser.data;
    const puuid = response.locals.user.id;

    const user = await this.userRepository.getUserByPuuid(puuid);
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

    const playerMatch =
      await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
        puuid,
        matchId,
      );

    if (!playerMatch) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "There is no match with that ID.",
      );
    }

    const riotMatch = await this.riotMatchRepository.getMatchById(
      playerMatch.matchId,
    );

    if (!riotMatch) {
      throw new Error(
        "Expected riot match to exist considering we got player match using a composite key.",
      );
    }

    const riotMatchWithoutRaw = {
      ...riotMatch,
      raw: undefined,
    };

    return ResponseEntity.ok().body({
      success: true,
      message: "User matches received!",
      payload: {
        playerData: playerMatch,
        matchData: riotMatchWithoutRaw,
        gameModeName: getGameModeName(riotMatchWithoutRaw.queueId ?? "Unknown"),
      },
    });
  }

  @_Route({
    method: RiotQueryRouteObject.getPlayerData.method,
    path: RiotQueryRouteObject.getPlayerData.path(":puuid"),
  })
  async getPlayerData(
    request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotQueryController["getPlayerData"]>>> {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const parser =
      await RiotQueryRouteObject.getPlayerData.schema.pathParams.safeParseAsync(
        request.params["puuid"],
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const puuid = parser.data;

    const user = await this.userRepository.getUserByPuuid(
      response.locals.user.id,
    );

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    const { riotAuth, riotEntitlement, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !puuid || !riotTag) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "Some data is missing. Please logout & re-authenticate.",
      );
    }

    const myRank = await (async () => {
      const mostRecentMatch = (
        await this.riotMatchRepository.getMatchesByPlayerPuuid(user.puuid, 1)
      )[0];

      if (!mostRecentMatch) {
        return null;
      }

      const pm =
        await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
          user.puuid,
          mostRecentMatch.id,
        );

      return pm ? pm.tier : null;
    })();

    const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid,
      startIndex: 0,
      endIndex: 1,
    });

    if (!riotMatchInfoRes.ok) {
      console.log(await riotMatchInfoRes.json());
      throw new Error(
        `Failed to fetch riot match information with status of ${riotMatchInfoRes.status}`,
      );
    }

    const riotMatchInfoJson = await riotMatchInfoRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      throw new Error(`Failed to deserialized riot match info`);
    }

    const latestMatch = riotMatchInfoJson.Matches[0];

    const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
    const tierName = tierNumberToNameObject[tierKey];

    return ResponseEntity.ok().body({
      success: true,
      message: "Your riot data has been successfully retrieved!",
      payload: {
        puuid,
        riotTag,
        rank:
          myRank && !(myRank == null || myRank == 0)
            ? myRank
            : latestMatch.TierAfterUpdate,
        rr: latestMatch.RankedRatingAfterUpdate,
        rankName: tierName,
      },
    });
  }
}
