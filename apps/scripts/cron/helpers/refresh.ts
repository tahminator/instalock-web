import type { User } from "@instalock/db";
import type { MapUrl } from "@instalock/riot";
import type { RefreshResult } from "cron/helpers/types";

import { TimedAll } from "@instalock/meter";
import { mapUrlToUuidObject, RiotClient } from "@instalock/riot";
import { randomUUID } from "crypto";
import {
  playerMatchRepository,
  riotMatchRepository,
  userListener,
  userRepository,
} from "repository";

@TimedAll()
export class MatchRefresher {
  static async refreshMatchesForEachUser(): Promise<RefreshResult> {
    const users = await userRepository.getUsers();

    const result: RefreshResult = {
      users: users.length,
      matches: 0,
    };

    for (let i = 0; i < users.length; i++) {
      // console.log(`Now running for user #${i + 1}: ${users[i].riotTag}`);
      const matches = await this.refreshMatchForUser(users[i]);
      result.matches += matches;
    }

    return result;
  }

  static registerListeners() {
    this.registerUserCreateListener();
  }

  private static registerUserCreateListener() {
    userListener.listenForUpdateNewUserMatchesChannel(async (puuid) => {
      console.log(`Refreshing matches for new user with puuid of ${puuid}`);
      const user = await userRepository.getUserByPuuid(puuid);
      if (!user) {
        throw new Error(
          `the user with puuid of ${puuid} cannot be found. this is likely a bug from the notifier.`,
        );
      }
      const matches = await this.refreshMatchForUser(user);
      console.log(
        `After refreshing user with puuid of ${puuid}, ${matches} matches were added to account.`,
      );
    });
  }

  private static async refreshMatchForUser(user: User): Promise<number> {
    const matchIds: string[] = [];

    const { riotAuth, riotEntitlement, puuid: riotPuuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !riotPuuid || !riotTag) {
      return 0;
    }

    const riotRes = await RiotClient.getCompetitiveUpdates({
      authToken: riotAuth,
      entitlementToken: riotEntitlement,
      puuid: riotPuuid,
      startIndex: 0,
      endIndex: 20,
    });

    if (!riotRes.ok) {
      return 0;
    }

    const riotMatchInfoJson = await riotRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      return 0;
    }

    riotMatchInfoJson.Matches.forEach((match) => {
      matchIds.push(match.MatchID);
    });

    console.log(`${matchIds.length} matches found for user ${user.riotTag}`);

    for (let j = 0; j < matchIds.length; j++) {
      const riotMatchRes = await RiotClient.getMatchDetails({
        authToken: riotAuth,
        entitlementToken: riotEntitlement,
        matchId: matchIds[j],
      });

      // Use the file to generate types, if needed.
      // if (j === 2) {
      // await writeFile(
      //   `${import.meta.dirname}/test.json`,
      //   JSON.stringify(await riotMatchRes.json())
      // );
      // }

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

      const existingMatch = await riotMatchRepository.getMatchById(matchId);

      const matchData = {
        id: matchId,
        raw: JSON.stringify(json),
        mapId: mapUrlToUuidObject[matchInfo?.mapId as MapUrl] ?? null,
        gameVersion: matchInfo?.gameVersion ?? null,
        gameStart:
          matchInfo?.gameStartMillis ?
            new Date(matchInfo.gameStartMillis)
          : null,
        gameEnd:
          matchInfo?.gameStartMillis && matchInfo?.gameLengthMillis ?
            new Date(
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
            (teams[0].teamId === "Red" && teams[0].won === true ?
              ("Red" as const)
            : ("Blue" as const))) ??
          null,
        teamBlueRoundsWon: teamBlue?.roundsWon ?? null,
        teamRedRoundsWon: teamRed?.roundsWon ?? null,
      };

      if (existingMatch) {
        await riotMatchRepository.updateMatch(matchData);
      } else {
        await riotMatchRepository.createMatch(matchData);
      }

      if (players && players.length > 0) {
        for (const player of players) {
          const playerPuuid = player.subject ?? randomUUID();

          const existingUser = await userRepository.getUserByPuuid(playerPuuid);
          if (!existingUser) {
            await userRepository.createUser({
              puuid: playerPuuid,
              riotAuth: null,
              riotEntitlement: null,
              riotTag: `${player.gameName}#${player.tagLine}`,
            });
          }

          const existingPlayerMatch =
            await playerMatchRepository.getPlayerMatchByPlayerAndMatch(
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
            await playerMatchRepository.updatePlayerMatch(playerMatchData);
          } else {
            await playerMatchRepository.createPlayerMatch(playerMatchData);
          }
        }
      }
    }

    return matchIds.length;
  }
}
