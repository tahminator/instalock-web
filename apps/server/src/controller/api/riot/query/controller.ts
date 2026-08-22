import type { TierNumber } from "@instalock/riot";
import type { Request, Response } from "express";
import type { z } from "zod";

import { TimedAll } from "@instalock/meter";
import {
  getGameModeName,
  RiotClient,
  tierNumberToNameObject,
} from "@instalock/riot";
import {
  Controller,
  GET,
  HttpStatus,
  RequestParam,
  ResponseBody,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";

import {
  GetMyRiotMatchesEnrichedResponseBodySchema,
  GetMyRiotPlayerDataResponseBodySchema,
  GetRiotMatchEnrichedByMatchIdResponseBodySchema,
  GetRiotPlayerDataByPuuidResponseBodySchema,
  MatchEnrichLookupRequestParamSchema,
  RiotPlayerLookupRequestParamSchema,
  toIsoDateOrNull,
  type MatchEnrichLookupRequestParam,
  type RiotMatchEnrichedDto,
  type RiotPlayerLookupRequestParam,
} from "@/controller/api/riot/query/schema";
import { unwrap } from "@/lib/result";
import { PlayerMatchRepository } from "@/repository/playerMatch";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user/repo";
import { CachingLookupService } from "@/service/lookup";

@Controller({
  prefix: "/api/riot/query",
  deps: [
    UserRepository,
    RiotMatchRepository,
    PlayerMatchRepository,
    CachingLookupService,
  ],
})
@TimedAll()
export default class RiotQueryController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
    private readonly playerMatchRepository: PlayerMatchRepository,
    private readonly cachingLookupService: CachingLookupService,
  ) {}

  @GET("/me")
  @ResponseBody(GetMyRiotPlayerDataResponseBodySchema)
  async getMyRiotPlayerData(
    _request: Request,
    response: Response,
  ): Promise<
    ResponseEntity<z.infer<typeof GetMyRiotPlayerDataResponseBodySchema>>
  > {
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

    const { riotAuth, riotEntitlement, puuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !puuid || !riotTag) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "Some data is missing. Please logout & re-authenticate.",
      );
    }

    const myRank = await (async () => {
      const matches = unwrap(
        await this.riotMatchRepository.getMatchesByPlayerPuuid(user.puuid, 1),
      );
      const mostRecentMatch = matches[0];

      if (!mostRecentMatch) {
        return null;
      }

      const pm = unwrap(
        await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
          user.puuid,
          mostRecentMatch.id,
        ),
      );

      return pm ? pm.tier : null;
    })();

    const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid,
      startIndex: 0,
      endIndex: 1,
      reqPuuid: puuid,
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

    if (!latestMatch) {
      return ResponseEntity.ok().body({
        success: true,
        message: "Your riot data has been successfully retrieved!",
        payload: {
          puuid,
          riotTag,
          rank: null,
          rr: null,
          rankName: null,
        },
      });
    }

    const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
    const tierName = tierNumberToNameObject[tierKey];

    return ResponseEntity.ok().body({
      success: true,
      message: "Your riot data has been successfully retrieved!",
      payload: {
        puuid,
        riotTag,
        rank:
          myRank && !(myRank == null || myRank == 0) ?
            myRank
          : latestMatch.TierAfterUpdate,
        rr: latestMatch.RankedRatingAfterUpdate,
        rankName: tierName,
      },
    }) satisfies ResponseEntity<
      z.infer<typeof GetMyRiotPlayerDataResponseBodySchema>
    >;
  }

  @GET("/me/match")
  @ResponseBody(GetMyRiotMatchesEnrichedResponseBodySchema)
  async getMyRiotMatchesEnriched(
    _request: Request,
    response: Response,
  ): Promise<
    ResponseEntity<z.infer<typeof GetMyRiotMatchesEnrichedResponseBodySchema>>
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const puuid = response.locals.user.id;

    const user = unwrap(await this.userRepository.getUserByPuuid(puuid));
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

    // TODO: Refactor this legacy fetching logic, causing lots of performance issues.
    const matches = unwrap(
      await this.riotMatchRepository.getMatchesByPlayerPuuid(puuid),
    );
    const matchesWithoutRawField = matches.map((m) => ({
      ...m,
      raw: undefined,
      gameStart: toIsoDateOrNull(m.gameStart),
      gameEnd: toIsoDateOrNull(m.gameEnd),
    }));

    const mostRecentPlayerMatch = unwrap(
      await this.playerMatchRepository.getMostRecentPlayerMatchByUserPuuid(
        puuid,
      ),
    );

    if (!mostRecentPlayerMatch) {
      return ResponseEntity.ok().body({
        success: true,
        message: "No matches found",
        payload: [],
      }) satisfies ResponseEntity<
        z.infer<typeof GetMyRiotMatchesEnrichedResponseBodySchema>
      >;
    }

    const playerMatches = unwrap(
      await this.playerMatchRepository.getBulkPlayerMatchesByPlayerAndMatches(
        matchesWithoutRawField.map((m) => ({ playerId: puuid, matchId: m.id })),
      ),
    );

    const joinIdsToPlayerMatchMap = new Map(
      playerMatches.map((pm) => [`${pm.playerId}:${pm.matchId}`, pm]),
    );

    const finalMatches: RiotMatchEnrichedDto[] = matchesWithoutRawField.map(
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
    }) satisfies ResponseEntity<
      z.infer<typeof GetMyRiotMatchesEnrichedResponseBodySchema>
    >;
  }

  @GET("/me/match/:matchId")
  @RequestParam(MatchEnrichLookupRequestParamSchema)
  @ResponseBody(GetRiotMatchEnrichedByMatchIdResponseBodySchema)
  async getRiotMatchEnrichedByMatchId(
    request: Request,
    response: Response,
  ): Promise<
    ResponseEntity<
      z.infer<typeof GetRiotMatchEnrichedByMatchIdResponseBodySchema>
    >
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const { matchId } = request.params as MatchEnrichLookupRequestParam;

    const puuid = response.locals.user.id;

    const user = unwrap(await this.userRepository.getUserByPuuid(puuid));
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

    const playerMatch = unwrap(
      await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
        puuid,
        matchId,
      ),
    );

    if (!playerMatch) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "There is no match with that ID.",
      );
    }

    const riotMatch = unwrap(
      await this.riotMatchRepository.getMatchById(playerMatch.matchId),
    );

    if (!riotMatch) {
      throw new Error(
        "Expected riot match to exist considering we got player match using a composite key.",
      );
    }

    const riotMatchWithoutRaw = {
      ...riotMatch,
      raw: undefined,
      gameStart: toIsoDateOrNull(riotMatch.gameStart),
      gameEnd: toIsoDateOrNull(riotMatch.gameEnd),
    };

    const allPlayers = unwrap(
      await this.playerMatchRepository.getPlayerMatchesByMatchId(
        playerMatch.matchId,
      ),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "User matches received!",
      payload: {
        playerData: playerMatch,
        matchData: riotMatchWithoutRaw,
        gameModeName: getGameModeName(riotMatchWithoutRaw.queueId ?? "Unknown"),
        players: allPlayers,
      },
    }) satisfies ResponseEntity<
      z.infer<typeof GetRiotMatchEnrichedByMatchIdResponseBodySchema>
    >;
  }

  @GET("/:puuid")
  @RequestParam(RiotPlayerLookupRequestParamSchema)
  @ResponseBody(GetRiotPlayerDataByPuuidResponseBodySchema)
  async getRiotPlayerDataByPuuid(
    request: Request,
    response: Response,
  ): Promise<
    ResponseEntity<z.infer<typeof GetRiotPlayerDataByPuuidResponseBodySchema>>
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const { puuid } = request.params as RiotPlayerLookupRequestParam;

    const authenticatedUser = unwrap(
      await this.userRepository.getUserByPuuid(response.locals.user.id),
    );

    if (!authenticatedUser) {
      throw new Error("Expected user to exist but did not.");
    }

    const { riotAuth, riotEntitlement } = authenticatedUser;

    if (!riotAuth || !riotEntitlement || !puuid) {
      throw new ResponseStatusError(
        HttpStatus.BAD_REQUEST,
        "Some data is missing. Please logout & re-authenticate.",
      );
    }

    const playerData = await this.cachingLookupService.getPlayer(
      puuid,
      riotAuth,
      riotEntitlement,
      authenticatedUser.puuid,
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Your riot data has been successfully retrieved!",
      payload: playerData,
    }) satisfies ResponseEntity<
      z.infer<typeof GetRiotPlayerDataByPuuidResponseBodySchema>
    >;
  }
}
