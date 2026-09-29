import type { User } from "@instalock/db";
import type { MapUrl } from "@instalock/riot";
import type { _Response } from "@instalock/riot/types";
import type { RefreshResult } from "cron/helpers/types";

import { TimedAll } from "@instalock/meter";
import { mapUrlToUuidObject, RiotClient, TeamID } from "@instalock/riot";
import { unwrap } from "cron/helpers/result";
import { randomUUID } from "crypto";
import {
  playerMatchRepository,
  riotMatchRepository,
  userListener,
  userRepository,
} from "repository";

const DEFAULT_RETRY_AFTER_MS = 5_000;
const MAX_RETRY_AFTER_MS = 5 * 60 * 1_000;

@TimedAll()
export class MatchRefresher {
  static async refreshMatchesForEachUser(): Promise<RefreshResult> {
    const users = unwrap(await userRepository.getUsers());

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
      const user = unwrap(await userRepository.getUserByPuuid(puuid));
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

  private static rateLimitedUntil = 0;

  private static async waitOutRateLimit(): Promise<void> {
    const remainingMs = this.rateLimitedUntil - Date.now();

    if (remainingMs <= 0) {
      return;
    }

    console.log(
      `Waiting ${remainingMs}ms for the Riot/Cloudflare rate limit to clear`,
    );

    const { promise, resolve } = Promise.withResolvers<void>();
    setTimeout(resolve, remainingMs);
    await promise;
  }

  private static applyRetryAfter(retryAfterHeader: string | null): number {
    const seconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
    const requestedMs =
      Number.isFinite(seconds) && seconds > 0 ?
        seconds * 1000
      : DEFAULT_RETRY_AFTER_MS;
    const waitMs = Math.min(requestedMs, MAX_RETRY_AFTER_MS);

    this.rateLimitedUntil = Math.max(
      this.rateLimitedUntil,
      Date.now() + waitMs,
    );

    return waitMs;
  }

  private static async requestWithRateLimitHandling<T>(
    label: string,
    userId: string,
    fn: () => Promise<_Response<T>>,
  ): Promise<_Response<T>> {
    let attempt = 0;

    while (true) {
      await this.waitOutRateLimit();

      const res = await fn();

      if (res.status !== 429) {
        return res;
      }

      attempt++;
      const waitMs = this.applyRetryAfter(res.headers.get("retry-after"));
      console.error({
        userId,
        reason: `${label} rate limited by Riot/Cloudflare, backing off`,
        attempt,
        retryAfterMs: waitMs,
      });
    }
  }

  private static async refreshMatchForUser(user: User): Promise<number> {
    const matchIds: string[] = [];

    const { riotAuth, riotEntitlement, puuid: riotPuuid, riotTag } = user;

    if (!riotAuth || !riotEntitlement || !riotPuuid || !riotTag) {
      console.error({
        userId: user.puuid,
        reason: "missing riotAuth, riotEntitlement, puuid, or riotTag",
        riotAuth: !!riotAuth,
        riotEntitlement: !!riotEntitlement,
        riotPuuid: !!riotPuuid,
        riotTag: !!riotTag,
      });
      return 0;
    }

    const riotRes = await this.requestWithRateLimitHandling(
      "getCompetitiveUpdates",
      user.puuid,
      () =>
        RiotClient.getCompetitiveUpdates({
          authToken: riotAuth,
          entitlementToken: riotEntitlement,
          puuid: riotPuuid,
          startIndex: 0,
          endIndex: 20,
        }),
    );

    if (!riotRes.ok) {
      console.error({
        userId: user.puuid,
        reason: "getCompetitiveUpdates request failed",
        status: riotRes.status,
        statusText: riotRes.statusText,
        headers: Object.fromEntries(riotRes.headers.entries()),
      });
      return 0;
    }

    const riotMatchInfoJson = await riotRes.json();

    if (riotMatchInfoJson.errorCode !== undefined) {
      console.error({
        userId: user.puuid,
        reason: "getCompetitiveUpdates returned an errorCode",
        errorCode: riotMatchInfoJson.errorCode,
        message: riotMatchInfoJson.message,
      });
      return 0;
    }

    riotMatchInfoJson.Matches.forEach((match) => {
      matchIds.push(match.MatchID);
    });

    console.log(`${matchIds.length} matches found for user ${user.riotTag}`);

    for (let j = 0; j < matchIds.length; j++) {
      const riotMatchRes = await this.requestWithRateLimitHandling(
        "getMatchDetails",
        user.puuid,
        () =>
          RiotClient.getMatchDetails({
            authToken: riotAuth,
            entitlementToken: riotEntitlement,
            matchId: matchIds[j],
            reqPuuid: riotPuuid,
          }),
      );

      // Use the file to generate types, if needed.
      // if (j === 2) {
      // await writeFile(
      //   `${import.meta.dirname}/test.json`,
      //   JSON.stringify(await riotMatchRes.json())
      // );
      // }
      if (!riotMatchRes.ok) {
        console.error({
          userId: user.puuid,
          reason: "getMatchDetails request failed",
          matchId: matchIds[j],
          status: riotMatchRes.status,
          statusText: riotMatchRes.statusText,
          headers: Object.fromEntries(riotMatchRes.headers.entries()),
        });
        continue;
      }

      const json = await riotMatchRes.json();

      const { matchInfo, players, teams } = json;

      const teamBlue =
        teams && teams[0].teamId === TeamID.Blue ? teams[0] : teams && teams[1];
      const teamRed =
        teams && teams[0].teamId === TeamID.Red ? teams[0] : teams && teams[1];

      const matchId = matchInfo?.matchId ?? randomUUID();

      const existingMatch = unwrap(
        await riotMatchRepository.getMatchById(matchId),
      );

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
            (teams[0].teamId === TeamID.Red && teams[0].won === true ?
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

          const existingUser = unwrap(
            await userRepository.getUserByPuuid(playerPuuid),
          );
          if (!existingUser) {
            await userRepository.createUser({
              puuid: playerPuuid,
              riotAuth: null,
              riotEntitlement: null,
              riotTag: `${player.gameName}#${player.tagLine}`,
            });
          }

          const existingPlayerMatch = unwrap(
            await playerMatchRepository.getPlayerMatchByPlayerAndMatch(
              playerPuuid,
              matchId,
            ),
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
              player.teamId === TeamID.Blue ?
                ("Blue" as const)
              : ("Red" as const),
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
