import type { TierNumber } from "@instalock/riot";
import type { Request, Response } from "express";
import type { z } from "zod";

import { TimedAll } from "@instalock/meter";
import { getGameModeName, tierNumberToNameObject } from "@instalock/riot";
import {
  Controller,
  GET,
  HttpStatus,
  RequestParam,
  RequestQuery,
  ResponseBody,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";

import {
  RiotPlayerLookupRequestParamSchema,
  toIsoDateOrNull,
  type RiotMatchEnrichedDto,
  type RiotPlayerLookupRequestParam,
} from "@/controller/api/riot/query/schema";
import {
  GetMetricsResponseBodySchema,
  GetRiotPlayerDataDetailedByPuuidResponseBodySchema,
  GetUsersShallowResponseBodySchema,
  QueryByRiotNameRequestQuerySchema,
  type QueryByRiotNameRequestQuery,
  type RiotPlayerDataDetailedDto,
  type RiotPlayerDataShallowDto,
} from "@/controller/api/riot/unauthenticated/schema";
import { unwrap } from "@/lib/result";
import { PlayerMatchRepository } from "@/repository/playerMatch";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user/repo";
import { MetricsService } from "@/service/metrics";

@Controller({
  prefix: "/api/riot/public",
  deps: [
    UserRepository,
    RiotMatchRepository,
    PlayerMatchRepository,
    MetricsService,
  ],
})
@TimedAll()
export default class RiotUnauthenticatedController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
    private readonly playerMatchRepository: PlayerMatchRepository,
    private readonly metricsService: MetricsService,
  ) {}

  @GET("/metrics")
  @ResponseBody(GetMetricsResponseBodySchema)
  async getMetrics(
    _request: Request,
    _response: Response,
  ): Promise<ResponseEntity<z.infer<typeof GetMetricsResponseBodySchema>>> {
    const metrics = await this.metricsService.getMetrics();

    return ResponseEntity.ok().body({
      success: true,
      message: "Metrics received!",
      payload: {
        ...metrics,
      },
    }) satisfies ResponseEntity<z.infer<typeof GetMetricsResponseBodySchema>>;
  }

  @GET("/user")
  @RequestQuery(QueryByRiotNameRequestQuerySchema)
  @ResponseBody(GetUsersShallowResponseBodySchema)
  async getUsersShallow(
    request: Request,
    _response: Response,
  ): Promise<
    ResponseEntity<z.infer<typeof GetUsersShallowResponseBodySchema>>
  > {
    const { query } = request.query as QueryByRiotNameRequestQuery;

    const users = unwrap(
      await this.userRepository.getUsersWithRiotTagWithQuery(query),
    );
    const playerData: RiotPlayerDataShallowDto[] = users.map(
      ({ riotTag, puuid }) => ({
        riotTag,
        puuid,
      }),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "List of users retrieved!",
      payload: playerData,
    }) satisfies ResponseEntity<
      z.infer<typeof GetUsersShallowResponseBodySchema>
    >;
  }

  @GET("/user/:puuid/matches")
  @RequestParam(RiotPlayerLookupRequestParamSchema)
  @ResponseBody(GetRiotPlayerDataDetailedByPuuidResponseBodySchema)
  async getRiotPlayerDataDetailedByPuuid(
    request: Request,
    _response: Response,
  ): Promise<
    ResponseEntity<
      z.infer<typeof GetRiotPlayerDataDetailedByPuuidResponseBodySchema>
    >
  > {
    const { puuid } = request.params as RiotPlayerLookupRequestParam;

    const user = unwrap(await this.userRepository.getUserByPuuid(puuid));
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

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
      throw new Error("Player match is missing but it should not be.");
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

    const payload: RiotPlayerDataDetailedDto = {
      riotTag: user.riotTag,
      puuid: user.puuid,
      name: user.riotTag,
      rank: mostRecentPlayerMatch.tier,
      rankName:
        tierNumberToNameObject[
          (String(mostRecentPlayerMatch.tier) as TierNumber | null) ?? "0"
        ] ?? null,
      matches: finalMatches,
    };

    return ResponseEntity.ok().body({
      success: true,
      message: "User matches received!",
      payload,
    }) satisfies ResponseEntity<
      z.infer<typeof GetRiotPlayerDataDetailedByPuuidResponseBodySchema>
    >;
  }
}
