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
  ControllerSchema,
  GET,
  HttpStatus,
  RequestParam,
  ResponseBody,
  ResponseEntity,
  ResponseStatusError,
  RouteSchema,
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
import { errorResponseBody } from "@/lib/api";
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
@ControllerSchema({
  title: "Riot Querying Routes (auth'd)",
  description:
    "Routes for looking up Riot player and match data on behalf of the currently authenticated user.",
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
  @RouteSchema({
    summary: "Get the current user's Riot player data",
    description:
      "Returns the authenticated user's Riot tag, rank, and RR, combining locally stored match history with a live lookup against Riot's competitive updates endpoint.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The current user's Riot data was retrieved successfully",
        schema: GetMyRiotPlayerDataResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description: "There is no active session",
        schema: errorResponseBody,
      },
      {
        statusCode: HttpStatus.BAD_REQUEST,
        description:
          "The user's stored Riot credentials are incomplete; they must logout and re-authenticate",
        schema: errorResponseBody,
      },
    ],
  })
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
  @RouteSchema({
    summary: "Get the current user's enriched match history",
    description:
      "Returns the authenticated user's full match history, enriched with per-player match data and human-readable game mode names.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The current user's matches were retrieved successfully",
        schema: GetMyRiotMatchesEnrichedResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description: "There is no active session",
        schema: errorResponseBody,
      },
      {
        statusCode: HttpStatus.NOT_FOUND,
        description: "The authenticated user could not be found",
        schema: errorResponseBody,
      },
    ],
  })
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
  @RouteSchema({
    summary: "Get one of the current user's matches by ID",
    description:
      "Returns a single enriched match the authenticated user played in, including every player's per-match data.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The match was retrieved successfully",
        schema: GetRiotMatchEnrichedByMatchIdResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description: "There is no active session",
        schema: errorResponseBody,
      },
      {
        statusCode: HttpStatus.NOT_FOUND,
        description:
          "The authenticated user could not be found, or they have no match with the given ID",
        schema: errorResponseBody,
      },
    ],
  })
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
  @RouteSchema({
    summary: "Get another player's Riot data by PUUID",
    description:
      "Looks up a player's Riot tag and rank by PUUID using the authenticated user's Riot credentials, backed by a caching lookup service.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "The player's Riot data was retrieved successfully",
        schema: GetRiotPlayerDataByPuuidResponseBodySchema,
      },
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        description: "There is no active session",
        schema: errorResponseBody,
      },
      {
        statusCode: HttpStatus.BAD_REQUEST,
        description:
          "The authenticated user's stored Riot credentials are incomplete; they must logout and re-authenticate",
        schema: errorResponseBody,
      },
    ],
  })
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
