import type { RiotMatch } from "@instalock/db";
import type { RefreshResult } from "cron/helpers/types";

import { TeamID, type AutoGenMatchMeta } from "@instalock/riot";
import { randomUUID } from "crypto";
import {
  playerMatchRepository,
  riotMatchRepository,
  userRepository,
} from "repository";

const MATCH_FETCH_LIMIT = 999999;

export class MatchTraverser {
  static async traverseMatchesForEachUser() {
    const usersCount = await userRepository.getUsersCount();
    const matches = await riotMatchRepository.getMatches(MATCH_FETCH_LIMIT, 0);

    const result: RefreshResult = {
      users: usersCount,
      matches: 0,
    };

    for (let i = 0; i < matches.length; i++) {
      const newMatches = await this.traverseMatch(matches[i]);
      result.matches += newMatches;
    }

    return result;
  }

  static async traverseMatch(match: RiotMatch): Promise<number> {
    let matches = 0;

    if (!match.raw) {
      console.error("A match is missing raw, that is VERY bad.");
      return 0;
    }

    const data = JSON.parse(match.raw) as AutoGenMatchMeta;

    if (!data.players || !data.players.length) {
      console.error("A match is missing raw player data, that is VERY bad.");
      return 0;
    }

    await Promise.all(
      data.players.map(async (p) => {
        if (!p.subject) {
          console.error(
            "Player match is missing a player subject, this is likely a schema issue",
          );
          return 0;
        }

        const pm = await playerMatchRepository.getPlayerMatchByPlayerAndMatch(
          p.subject,
          match.id,
        );

        if (!pm) {
          await playerMatchRepository.createPlayerMatch({
            id: randomUUID(),
            playerId: p.subject,
            matchId: match.id,
            riotTag: `${p.gameName}#${p.tagLine}`,
            teamId: p.teamId ?? null,
            characterId: p.characterId ?? null,
            kills: p.stats?.kills ?? 0,
            deaths: p.stats?.deaths ?? 0,
            assists: p.stats?.assists ?? 0,
            tier: p.competitiveTier ?? null,
            playerCard: p.playerCard ?? null,
            playerTitle: p.playerTitle ?? null,
            teamColor:
              p.teamId === TeamID.Blue ? ("Blue" as const) : ("Red" as const),
            teamWon:
              data.teams?.find((team) => team.teamId === p.teamId)?.won ?? null,
            teamRoundsWon:
              data.teams?.find((team) => team.teamId === p.teamId)
                ?.roundsPlayed ?? null,
          });
          matches++;
        }
      }),
    );

    return matches;
  }
}
