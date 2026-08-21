import type { ResultAsync } from "neverthrow";

import { err, fromPromise, ok, okAsync } from "neverthrow";

import type { Db, PlayerMatch, RiotMatchTeamColor } from "..";
import type { PlayerAvgKda } from "../models/PlayerAvgKda";

import { DbError } from "..";

export class BasePlayerMatchRepository {
  constructor(private readonly db: Db) {}

  private logError(this: void, e: Error) {
    console.error(`[Error] ${e}`);
  }

  public createPlayerMatch(
    playerMatch: PlayerMatch,
  ): ResultAsync<PlayerMatch, DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
        INSERT INTO "PlayerMatch" ${this.db(playerMatch)}
        RETURNING *
      `,
      (e) => new DbError(`Failed to create player match: ${String(e)}`),
    )
      .andThen(([pm]) =>
        pm ?
          ok(pm)
        : err(new DbError("Failed to create player match, received null back")),
      )
      .orTee(this.logError);
  }

  public getPlayerMatchById(
    id: string,
  ): ResultAsync<PlayerMatch | null, DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        id = ${id}
    `,
      (e) =>
        new DbError(`Failed to get player match by ID of ${id}: ${String(e)}`),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  public getPlayerMatchesByPlayerId(
    playerId: string,
    limit = 100,
    offset = 0,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
      ORDER BY id DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches by player ID of ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesByMatchId(
    matchId: string,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "matchId" = ${matchId}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches by match id of match id ${matchId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchByPlayerAndMatch(
    playerId: string,
    matchId: string,
  ): ResultAsync<PlayerMatch | null, DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "matchId" = ${matchId}
    `,
      (e) =>
        new DbError(
          `Failed to get player match by playerId ${playerId} and matchId ${matchId}: ${String(e)}`,
        ),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  /**
   * Will look for the most recent non-0 tiered player match.
   *
   * Useful when attempting to display rank without having to go so far back.
   */
  public getMostRecentUsefulPlayerMatchByPlayerPuuid(
    playerId: string,
  ): ResultAsync<PlayerMatch | null, DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        pm.*
      FROM
        "PlayerMatch" pm
      JOIN
        "RiotMatch" rm
      ON
        rm.id = pm."matchId"
      WHERE
        "playerId" = ${playerId}
      AND
        pm.tier != 0
      ORDER BY rm."gameEnd"
      LIMIT 1
    `,
      (e) =>
        new DbError(
          `Failed to get most recent useful player match by player puuid: ${playerId}: ${String(e)}`,
        ),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  public getBulkPlayerMatchesByPlayerAndMatches(
    records: { playerId: string; matchId: string }[],
  ): ResultAsync<PlayerMatch[], DbError> {
    if (records.length === 0) return okAsync([]);

    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        pm.*
      FROM
        "PlayerMatch" pm
      INNER JOIN
        (VALUES ${this.db(records.map((r) => [r.playerId, r.matchId]))}) AS v("playerId", "matchId")
      ON
        pm."playerId" = v."playerId"
        AND pm."matchId" = v."matchId"
    `,
      (e) =>
        new DbError(
          `Failed to get bulk player mtches by player and matches by player ID: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesByCharacterId(
    playerId: string,
    characterId: string,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "characterId" = ${characterId}
      ORDER BY id DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches by character ID ${characterId} for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesByTeamColor(
    playerId: string,
    teamColor: RiotMatchTeamColor,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamColor" = ${teamColor}
      ORDER BY id DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches by team color ${teamColor} for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getWonPlayerMatches(
    playerId: string,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamWon" = true
      ORDER BY id DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get won player matches for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getLostPlayerMatches(
    playerId: string,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamWon" = false
      ORDER BY id DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get lost player matches for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesWithMinKills(
    playerId: string,
    minKills: number,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND kills >= ${minKills}
      ORDER BY kills DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches with minimum kills ${minKills} for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesByKDA(
    playerId: string,
    limit = 100,
  ): ResultAsync<PlayerMatch[], DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *,
        CASE
          WHEN deaths = 0 THEN kills + assists
          ELSE (kills + assists)::float / deaths
        END as kda
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
      ORDER BY kda DESC
      LIMIT ${limit}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches by KDA for player ID ${playerId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getPlayerMatchesCount(playerId: string): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: string }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `,
      (e) =>
        new DbError(
          `Failed to get player matches count by playerId ${playerId}: ${String(e)}`,
        ),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getPlayerWinRate(playerId: string): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ win_rate: number }[]>`
      SELECT
        CASE
          WHEN COUNT(*) = 0 THEN 0
          ELSE (COUNT(*) FILTER (WHERE "teamWon" = true)::float / COUNT(*)) * 100
        END as win_rate
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `,
      (e) =>
        new DbError(
          `Failed to get player win rate by playerId ${playerId}: ${String(e)}`,
        ),
    )
      .map(([result]) => result?.win_rate ?? 0)
      .orTee(this.logError);
  }

  public getPlayerAverageKDA(
    playerId: string,
  ): ResultAsync<PlayerAvgKda, DbError> {
    return fromPromise(
      this.db<PlayerAvgKda[]>`
      SELECT
        AVG(kills)::float as avg_kills,
        AVG(deaths)::float as avg_deaths,
        AVG(assists)::float as avg_assists
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `,
      (e) =>
        new DbError(
          `Failed to get player average KDA by playerId ${playerId}: ${String(e)}`,
        ),
    )
      .map(
        ([result]) => result ?? { avg_kills: 0, avg_deaths: 0, avg_assists: 0 },
      )
      .orTee(this.logError);
  }

  public getMostRecentPlayerMatchByUserPuuid(
    puuid: string,
  ): ResultAsync<PlayerMatch | null, DbError> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        pm.*
      FROM
        "PlayerMatch" pm
      INNER JOIN
        "RiotMatch" rm ON pm."matchId" = rm.id
      WHERE
        pm."playerId" = ${puuid}
      ORDER BY rm."gameStart" DESC
      LIMIT 1
    `,
      (e) =>
        new DbError(
          `Failed to get most recent player match by user puuid of ${puuid}: ${String(e)}`,
        ),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  public updatePlayerMatch(
    playerMatch: PlayerMatch,
  ): ResultAsync<PlayerMatch, DbError> {
    const rows = this.db(
      playerMatch,
      "id",
      "teamId",
      "characterId",
      "kills",
      "deaths",
      "assists",
      "tier",
      "playerCard",
      "playerTitle",
      "teamColor",
      "teamWon",
      "teamRoundsWon",
    );

    return fromPromise(
      this.db<PlayerMatch[]>`
        UPDATE
          "PlayerMatch"
        SET
          ${rows}
        WHERE
          id = ${playerMatch.id}
        RETURNING *
      `,
      (e) =>
        new DbError(
          `Failed to update player match by playerMatch.id ${playerMatch.id}: ${String(e)}`,
        ),
    )
      .andThen(([p]) =>
        p ?
          ok(p)
        : err(
            new DbError(
              `Failed to update player match, returned match null for playerMatch.id ${playerMatch.id}`,
            ),
          ),
      )
      .orTee(this.logError);
  }

  public deletePlayerMatchById(id: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          id = ${id}
      `,
      (e) => new DbError(`Failed to delete player match: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public deletePlayerMatchesByPlayerId(
    playerId: string,
  ): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          "playerId" = ${playerId}
      `,
      (e) =>
        new DbError(
          `Failed to delete player matches by playerId ${playerId}: ${String(e)}`,
        ),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public deletePlayerMatchesByMatchId(
    matchId: string,
  ): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          "matchId" = ${matchId}
      `,
      (e) =>
        new DbError(
          `Failed to delete player matches by match id of ${matchId}: ${String(e)}`,
        ),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public playerMatchExists(
    playerId: string,
    matchId: string,
  ): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db<{ exists: boolean }[]>`
      SELECT
        EXISTS(
          SELECT 1
          FROM "PlayerMatch"
          WHERE "playerId" = ${playerId}
            AND "matchId" = ${matchId}
        ) as exists
    `,
      (e) =>
        new DbError(
          `Failed to check if player match exists for playerId ${playerId} & matchId ${matchId}: ${String(e)}`,
        ),
    )
      .map(([r]) => r?.exists ?? false)
      .orTee(this.logError);
  }

  public bulkCreatePlayerMatches(
    playerMatches: PlayerMatch[],
  ): ResultAsync<boolean, DbError> {
    if (playerMatches.length === 0) return okAsync(true);

    return fromPromise(
      this.db`
        INSERT INTO "PlayerMatch" ${this.db(playerMatches)}
        ON CONFLICT ("playerId", "matchId") DO NOTHING
      `,
      (e) => new DbError(`Failed to bulk create player matches: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }
}
