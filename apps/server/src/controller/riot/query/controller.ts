import { ZodParserError } from "@/error/parser";
import { PlayerMatchRepository } from "@/repository/playerMatch";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user";
import { CachingLookupService } from "@/service/lookup";
import {
  IRiotQueryController,
  RiotMatchEnriched,
  RiotQueryRouteObject,
} from "@instalock/api";
import {
  getGameModeName,
  MapUrl,
  mapUrlToUuidObject,
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
import { randomUUID } from "crypto";
import { Request, Response } from "express";

@Controller({
  deps: [
    UserRepository,
    RiotMatchRepository,
    PlayerMatchRepository,
    CachingLookupService,
  ],
})
export class RiotQueryController implements IRiotQueryController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
    private readonly playerMatchRepository: PlayerMatchRepository,
    private readonly cachingLookupService: CachingLookupService,
  ) {}

  @_Route({
    ...RiotQueryRouteObject.getMyRiotPlayerData,
  })
  async getMyRiotPlayerData(
    _request: Request,
    response: Response,
  ): Promise<Awaited<ReturnType<IRiotQueryController["getMyRiotPlayerData"]>>> {
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
    }) satisfies Awaited<
      ReturnType<IRiotQueryController["getMyRiotPlayerData"]>
    >;
  }

  @_Route({
    ...RiotQueryRouteObject.getMyRiotMatchesEnriched,
  })
  async getMyRiotMatchesEnriched(
    _request: Request,
    response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotQueryController["getMyRiotMatchesEnriched"]>>
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const puuid = response.locals.user.id;

    let user = await this.userRepository.getUserByPuuid(puuid);
    if (!user) {
      throw new ResponseStatusError(
        HttpStatus.NOT_FOUND,
        "The user with the given PUUID was not found.",
      );
    }

    if (user.newUser) {
      await this.loadMatchesForNewUser(user.puuid);
      user = await this.userRepository.updateUser({ ...user, newUser: false });
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

    return ResponseEntity.ok().body({
      success: true,
      message: "User matches received!",
      payload: finalMatches,
    }) satisfies Awaited<
      ReturnType<IRiotQueryController["getMyRiotMatchesEnriched"]>
    >;
  }

  @_Route({
    method: RiotQueryRouteObject.getRiotMatchEnrichedByMatchId.method,
    path: RiotQueryRouteObject.getRiotMatchEnrichedByMatchId.path(":matchId"),
  })
  async getRiotMatchEnrichedByMatchId(
    request: Request,
    response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotQueryController["getRiotMatchEnrichedByMatchId"]>>
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const parser =
      await RiotQueryRouteObject.getRiotMatchEnrichedByMatchId.schema.pathParams.safeParseAsync(
        request.params["matchId"],
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

    const allPlayers =
      await this.playerMatchRepository.getPlayerMatchesByMatchId(
        playerMatch.matchId,
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
    }) satisfies Awaited<
      ReturnType<IRiotQueryController["getRiotMatchEnrichedByMatchId"]>
    >;
  }

  @_Route({
    method: RiotQueryRouteObject.getRiotPlayerDataByPuuid.method,
    path: RiotQueryRouteObject.getRiotPlayerDataByPuuid.path(":puuid"),
  })
  async getRiotPlayerDataByPuuid(
    request: Request,
    response: Response,
  ): Promise<
    Awaited<ReturnType<IRiotQueryController["getRiotPlayerDataByPuuid"]>>
  > {
    if (!response.locals.user || !response.locals.session) {
      throw new ResponseStatusError(
        HttpStatus.UNAUTHORIZED,
        "You are not logged in.",
      );
    }

    const parser =
      await RiotQueryRouteObject.getRiotPlayerDataByPuuid.schema.pathParams.safeParseAsync(
        request.params["puuid"],
      );

    if (!parser.success) {
      throw new ZodParserError(parser.error);
    }

    const puuid = parser.data;

    const authenticatedUser = await this.userRepository.getUserByPuuid(
      response.locals.user.id,
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
    );

    return ResponseEntity.ok().body({
      success: true,
      message: "Your riot data has been successfully retrieved!",
      payload: playerData,
    }) satisfies Awaited<
      ReturnType<IRiotQueryController["getRiotPlayerDataByPuuid"]>
    >;
  }

  private async loadMatchesForNewUser(userId: string) {
    const matchIds: string[] = [];

    const user = await this.userRepository.getUserByPuuid(userId);

    if (!user) {
      throw new Error("Expected user to exist but did not.");
    }

    const { riotAuth, riotEntitlement, puuid: riotPuuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !riotPuuid || !riotTag) {
      return;
    }

    const riotRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid: riotPuuid,
      startIndex: 0,
      endIndex: 20,
    });

    if (!riotRes.ok) {
      return;
    }

    const riotMatchInfoJson = await riotRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      return;
    }

    riotMatchInfoJson.Matches.forEach((match) => {
      matchIds.push(match.MatchID);
    });

    for (let j = 0; j < matchIds.length; j++) {
      const riotMatchRes = await RiotClient.getMatchDetails({
        authToken: riotAuth,
        entitlementToken: riotEntitlement,
        matchId: matchIds[j],
      });

      if (!riotMatchRes.ok) {
        continue;
      }

      const json = await riotMatchRes.json();

      const { matchInfo, players, teams } = json;

      const teamBlue =
        teams && teams[0].teamId === "Blue" ? teams[0] : teams && teams[1];
      const teamRed =
        teams && teams[0].teamId === "Red" ? teams[0] : teams && teams[1];

      const matchId = matchInfo?.matchId ?? randomUUID();

      const existingMatch =
        await this.riotMatchRepository.getMatchById(matchId);

      const matchData = {
        id: matchId,
        raw: JSON.stringify(json),
        mapId: mapUrlToUuidObject[matchInfo?.mapId as MapUrl] ?? null,
        gameVersion: matchInfo?.gameVersion ?? null,
        gameStart: matchInfo?.gameStartMillis
          ? new Date(matchInfo.gameStartMillis)
          : null,
        gameEnd:
          matchInfo?.gameStartMillis && matchInfo?.gameLengthMillis
            ? new Date(
                Number(matchInfo.gameStartMillis) +
                  Number(matchInfo.gameLengthMillis),
              )
            : null,
        isCompleted: matchInfo?.isCompleted ?? false,
        queueId: matchInfo?.queueID ?? null,
        isRanked: matchInfo?.isRanked ?? null,
        seasonId: matchInfo?.seasonId ?? null,
        roundsPlayed: teams?.[0]?.roundsPlayed ?? null,
        teamWon:
          (teams &&
            (teams[0].teamId === "Red" && teams[0].won === true
              ? ("Red" as const)
              : ("Blue" as const))) ??
          null,
        teamBlueRoundsWon: teamBlue?.roundsWon ?? null,
        teamRedRoundsWon: teamRed?.roundsWon ?? null,
      };

      if (existingMatch) {
        await this.riotMatchRepository.updateMatch(matchData);
      } else {
        await this.riotMatchRepository.createMatch(matchData);
      }

      if (players && players.length > 0) {
        for (const player of players) {
          const playerPuuid = player.subject ?? randomUUID();

          const existingUser =
            await this.userRepository.getUserByPuuid(playerPuuid);
          if (!existingUser) {
            await this.userRepository.createUser({
              puuid: playerPuuid,
              riotAuth: null,
              riotEntitlement: null,
              riotTag: `${player.gameName}#${player.tagLine}`,
            });
          }

          const existingPlayerMatch =
            await this.playerMatchRepository.getPlayerMatchByPlayerAndMatch(
              playerPuuid,
              matchId,
            );

          const playerMatchData = {
            id: existingPlayerMatch?.id ?? randomUUID(),
            playerId: playerPuuid,
            matchId: matchId,
            riotTag: `${player.gameName}#${player.tagLine}`,
            teamId: player.teamId ?? null,
            characterId: player.characterId ?? null,
            kills: player.stats?.kills ?? 0,
            deaths: player.stats?.deaths ?? 0,
            assists: player.stats?.assists ?? 0,
            tier: player.competitiveTier ?? null,
            playerCard: player.playerCard ?? null,
            playerTitle: player.playerTitle ?? null,
            teamColor:
              player.teamId === "Blue" ? ("Blue" as const) : ("Red" as const),
            teamWon:
              teams?.find((team) => team.teamId === player.teamId)?.won ?? null,
            teamRoundsWon:
              teams?.find((team) => team.teamId === player.teamId)
                ?.roundsPlayed ?? null,
          };

          if (existingPlayerMatch) {
            await this.playerMatchRepository.updatePlayerMatch(playerMatchData);
          } else {
            await this.playerMatchRepository.createPlayerMatch(playerMatchData);
          }
        }
      }
    }
  }
}
