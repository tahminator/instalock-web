import type { ResultAsync } from "neverthrow";

import { err, fromPromise, ok, okAsync } from "neverthrow";

import type { Db, RiotMatch, RiotMatchTeamColor } from "..";

import { DbError } from "..";

export class BaseRiotMatchRepository {
  constructor(private readonly db: Db) {}

  private logError(this: void, e: Error) {
    console.error(`[Error] ${e}`);
  }

  public createMatch(match: RiotMatch): ResultAsync<RiotMatch, DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        INSERT INTO "RiotMatch" ${this.db(match)}
        RETURNING *
      `,
      (e) => new DbError(`Failed to create riot match: ${String(e)}`),
    )
      .andThen(([m]) =>
        m ?
          ok(m)
        : err(new DbError("Failed to create riot match, received null back")),
      )
      .orTee(this.logError);
  }

  public getMatchById(id: string): ResultAsync<RiotMatch | null, DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          id = ${id}
      `,
      (e) =>
        new DbError(`Failed to get riot match by ID of ${id}: ${String(e)}`),
    )
      .map(([match]) => match ?? null)
      .orTee(this.logError);
  }

  public getMatches(
    limit = 1000,
    offset = 0,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      (e) => new DbError(`Failed to get riot matches: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getMatchesByMapId(
    mapId: string,
    limit = 1000,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "mapId" = ${mapId}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches by map ID ${mapId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getMatchesByQueueId(
    queueId: string,
    limit = 1000,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "queueId" = ${queueId}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches by queue ID ${queueId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getRankedMatches(
    limit = 1000,
    offset = 0,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "isRanked" = true
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      (e) => new DbError(`Failed to get ranked riot matches: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getCompletedMatches(
    limit = 1000,
    offset = 0,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "isCompleted" = true
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      (e) => new DbError(`Failed to get completed riot matches: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getMatchesBySeasonId(
    seasonId: string,
    limit = 100,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "seasonId" = ${seasonId}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches by season ID ${seasonId}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getMatchesByDateRange(
    startDate: Date,
    endDate: Date,
    limit = 100,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "gameStart" >= ${startDate}
          AND "gameStart" <= ${endDate}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(`Failed to get riot matches by date range: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getRecentMatches(limit = 100): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "gameStart" IS NOT NULL
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) => new DbError(`Failed to get recent riot matches: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getMatchesByPlayerPuuid(
    playerPuuid: string,
    limit = 1000,
    offset = 0,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          rm.*
        FROM
          "RiotMatch" rm
        INNER JOIN
          "PlayerMatch" pm ON rm.id = pm."matchId"
        WHERE
          pm."playerId" = ${playerPuuid}
        ORDER BY rm."gameStart" DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches by player puuid ${playerPuuid}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getRankedMatchesByPlayerPuuid(
    playerPuuid: string,
    limit = 1000,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          rm.*
        FROM
          "RiotMatch" rm
        INNER JOIN
          "PlayerMatch" pm ON rm.id = pm."matchId"
        WHERE
          pm."playerId" = ${playerPuuid}
          AND rm."isRanked" = true
        ORDER BY rm."gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get ranked riot matches by player puuid ${playerPuuid}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getMatchesCount(): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "RiotMatch"
      `,
      (e) => new DbError(`Failed to get riot matches count: ${String(e)}`),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getRankedMatchesCount(): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "RiotMatch"
        WHERE
          "isRanked" = true
      `,
      (e) =>
        new DbError(`Failed to get ranked riot matches count: ${String(e)}`),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getMatchesCountByMapId(mapId: string): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "RiotMatch"
        WHERE
          "mapId" = ${mapId}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches count by map ID ${mapId}: ${String(e)}`,
        ),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getMatchesCountByPlayerPuuid(
    playerPuuid: string,
  ): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "RiotMatch" rm
        INNER JOIN
          "PlayerMatch" pm ON rm.id = pm."matchId"
        WHERE
          pm."playerId" = ${playerPuuid}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches count by player puuid ${playerPuuid}: ${String(e)}`,
        ),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public updateMatch(match: RiotMatch): ResultAsync<RiotMatch, DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        UPDATE
          "RiotMatch"
        SET
          "mapId" = ${match.mapId},
          "gameVersion" = ${match.gameVersion},
          "gameStart" = ${match.gameStart},
          "gameEnd" = ${match.gameEnd},
          "isCompleted" = ${match.isCompleted},
          "queueId" = ${match.queueId},
          "isRanked" = ${match.isRanked},
          "seasonId" = ${match.seasonId},
          "roundsPlayed" = ${match.roundsPlayed},
          "teamWon" = ${match.teamWon},
          "teamRedRoundsWon" = ${match.teamRedRoundsWon},
          "teamBlueRoundsWon" = ${match.teamBlueRoundsWon},
          raw = ${match.raw}
        WHERE
          id = ${match.id}
        RETURNING *
      `,
      (e) => new DbError(`Failed to update riot match: ${String(e)}`),
    )
      .andThen(([m]) =>
        m ?
          ok(m)
        : err(new DbError("Failed to update riot match, received null back")),
      )
      .orTee(this.logError);
  }

  public deleteMatchById(id: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "RiotMatch"
        WHERE
          id = ${id}
      `,
      (e) => new DbError(`Failed to delete riot match: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public matchExists(id: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db<{ exists: boolean }[]>`
        SELECT
          EXISTS(SELECT 1 FROM "RiotMatch" WHERE id = ${id}) as exists
      `,
      (e) =>
        new DbError(
          `Failed to check if riot match exists for ID ${id}: ${String(e)}`,
        ),
    )
      .map(([result]) => result?.exists ?? false)
      .orTee(this.logError);
  }

  public getMatchesByTeamWon(
    teamColor: RiotMatchTeamColor,
    limit = 1000,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "teamWon" = ${teamColor}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches by winning team ${teamColor}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getMatchesWithMinRounds(
    minRounds: number,
    limit = 1000,
  ): ResultAsync<RiotMatch[], DbError> {
    return fromPromise(
      this.db<RiotMatch[]>`
        SELECT
          *
        FROM
          "RiotMatch"
        WHERE
          "roundsPlayed" >= ${minRounds}
        ORDER BY "gameStart" DESC
        LIMIT ${limit}
      `,
      (e) =>
        new DbError(
          `Failed to get riot matches with minimum rounds ${minRounds}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public bulkCreateMatches(
    matches: RiotMatch[],
  ): ResultAsync<boolean, DbError> {
    if (matches.length === 0) return okAsync(true);

    return fromPromise(
      this.db`
        INSERT INTO "RiotMatch" ${this.db(matches)}
        ON CONFLICT (id) DO NOTHING
      `,
      (e) => new DbError(`Failed to bulk create riot matches: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }
}
