import {
  IRiotUnauthenticatedController,
  RiotMatchEnriched,
  RiotPlayerDataShallow,
  RiotUnauthenticatedRouteObject,
} from "@instalock/api";
import { RiotPlayerDataDetailed } from "@instalock/api/dto/RiotPlayerDataDetailed";
import {
  getGameModeName,
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

import { ZodParserError } from "@/error/parser";
import { PlayerMatchRepository } from "@/repository/playerMatch";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user";

@Controller({
  deps: [UserRepository, RiotMatchRepository, PlayerMatchRepository],
})
export class RiotUnauthenticatedController
  implements IRiotUnauthenticatedController
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
    private readonly playerMatchRepository: PlayerMatchRepository,
  ) {}

  @_Route({
    ...RiotUnauthenticatedRouteObject.getMetrics,
  })
  async getMetrics(
    _request: Request,
    _response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotUnauthenticatedController["getMetrics"]>>
  > {
    const totalUsers = await this.userRepository.getUsersCount();
    const registeredUsers = await this.userRepository.getRegisteredUsersCount();
    const totalMatches = await this.riotMatchRepository.getMatchesCount();

    return ResponseEntity.ok().body({
      success: true,
      message: "Metrics received!",
      payload: {
        registeredUsers,
        totalMatches,
        totalUsers,
      },
    }) satisfies Awaited<
      ReturnType<IRiotUnauthenticatedController["getMetrics"]>
    >;
  }

  @_Route({
    ...RiotUnauthenticatedRouteObject.getUsersShallow,
  })
  async getUsersShallow(
    request: Request,
    _response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotUnauthenticatedController["getUsersShallow"]>>
  > {
    const parser =
      await RiotUnauthenticatedRouteObject.getUsersShallow.schema.queryParams.safeParseAsync(
        request.query,
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const { query } = parser.data;

    const users = await this.userRepository.getUsersWithRiotTagWithQuery(query);
    const playerData: RiotPlayerDataShallow[] = users.map(
      ({ riotTag, puuid }) => ({
        riotTag,
        puuid,
      }),
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "List of users retrieved!",
      payload: playerData,
    }) satisfies Awaited<
      ReturnType<IRiotUnauthenticatedController["getUsersShallow"]>
    >;
  }

  @_Route({
    method:
      RiotUnauthenticatedRouteObject.getRiotPlayerDataDetailedByPuuid.method,
    path: RiotUnauthenticatedRouteObject.getRiotPlayerDataDetailedByPuuid.path(
      ":puuid",
    ),
  })
  async getRiotPlayerDataDetailedByPuuid(
    request: Request,
    _response: Response,
  ): Promise<
    Awaited<
      ReturnType<
        IRiotUnauthenticatedController["getRiotPlayerDataDetailedByPuuid"]
      >
    >
  > {
    const parser =
      await RiotUnauthenticatedRouteObject.getRiotPlayerDataDetailedByPuuid.schema.pathParams.safeParseAsync(
        request.params["puuid"],
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const puuid = parser.data;

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

    const finalMatches: RiotMatchEnriched[] = matchesWithoutRawField.map(
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

    const payload: RiotPlayerDataDetailed = {
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
    }) satisfies Awaited<
      ReturnType<
        IRiotUnauthenticatedController["getRiotPlayerDataDetailedByPuuid"]
      >
    >;
  }
}
