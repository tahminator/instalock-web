import type { Result } from "neverthrow";

import { err, fromPromise, ok } from "neverthrow";

import type { Db, PlayerMatch, RiotMatchTeamColor } from "..";

export class BasePlayerMatchRepository {
  constructor(private readonly db: Db) {}

  private logError(e: Error) {
    console.error(`[Error] ${e}`);
  }

  public async createPlayerMatch(
    playerMatch: PlayerMatch,
  ): Promise<Result<PlayerMatch | null, Error>> {
    return fromPromise(
      this.db<PlayerMatch[]>`
        INSERT INTO "PlayerMatch" ${this.db(playerMatch)}
        RETURNING *
      `,
      (e) => new Error(`Failed to create player match: ${e}`),
    )
      .andThen(([pm]) =>
        !pm ?
          err(new Error("Failed to create player match, received null back"))
        : ok(pm),
      )
      .orTee(this.logError);
  }

  public async getPlayerMatchById(
    id: string,
  ): Promise<Result<PlayerMatch | null, Error>> {
    return fromPromise(
      this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        id = ${id}
    `,
      (e) => new Error(`Failed to get player match by ID of ${id}: ${e}`),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  public async getPlayerMatchesByPlayerId(
    playerId: string,
    limit = 100,
    offset = 0,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches by player ID of ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchesByMatchId(
    matchId: string,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches by match id of match id ${matchId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchByPlayerAndMatch(
    playerId: string,
    matchId: string,
  ): Promise<Result<PlayerMatch | null, Error>> {
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
        new Error(
          `Failed to get player match by playerId ${playerId} and matchId ${matchId}: ${e}`,
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
  public async getMostRecentUsefulPlayerMatchByPlayerPuuid(
    playerId: string,
  ): Promise<Result<PlayerMatch | null, Error>> {
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
        new Error(
          `Failed to get most recent useful player match by player puuid: ${playerId}: ${e}`,
        ),
    )
      .andThen(([pm]) =>
        !pm ?
          err(
            new Error(
              "Failed to get most recent useful player match by player puuid, received null back",
            ),
          )
        : ok(pm),
      )
      .orTee(this.logError);
  }

  public async getBulkPlayerMatchesByPlayerAndMatches(
    records: { playerId: string; matchId: string }[],
  ): Promise<Result<PlayerMatch[], Error>> {
    if (records.length === 0) return ok([]);

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
        new Error(
          `Failed to get bulk player mtches by player and matches by player ID: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchesByCharacterId(
    playerId: string,
    characterId: string,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches by character ID ${characterId} for player ID ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchesByTeamColor(
    playerId: string,
    teamColor: RiotMatchTeamColor,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches by team color ${teamColor} for player ID ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getWonPlayerMatches(
    playerId: string,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get won player matches for player ID ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getLostPlayerMatches(
    playerId: string,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get lost player matches for player ID ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchesWithMinKills(
    playerId: string,
    minKills: number,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches with minimum kills ${minKills} for player ID ${playerId}: ${e}`,
        ),
    ).orTee(this.logError);
  }

  public async getPlayerMatchesByKDA(
    playerId: string,
    limit = 100,
  ): Promise<Result<PlayerMatch[], Error>> {
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
        new Error(
          `Failed to get player matches by KDA for player ID ${playerId}: ${e}`,
        ),
    );
  }

  public async getPlayerMatchesCount(
    playerId: string,
  ): Promise<Result<number, Error>> {
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
        new Error(
          `Failed to get player matches count by playerId ${playerId}: ${e}`,
        ),
    )
      .map((c) => c.count)
      .map(Number)
      .orTee(this.logError);
  }

  public async getPlayerWinRate(
    playerId: string,
  ): Promise<Result<number, Error>> {
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
        new Error(
          `Failed to get player win rate by playerId ${playerId}: ${e}`,
        ),
    )
      .map(([result]) => Number(result?.win_rate ?? 0))
      .orTee(this.logError);
  }

  public async getPlayerAverageKDA(playerId: string): Promise<
    Result<
      {
        avg_kills: number;
        avg_deaths: number;
        avg_assists: number;
      },
      Error
    >
  > {
    return fromPromise(
      this.db<{ avg_kills: number; avg_deaths: number; avg_assists: number }[]>`
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
        new Error(
          `Failed to get player average KDA by playerId ${playerId}: ${e}`,
        ),
    )
      .map(
        ([result]) => result ?? { avg_kills: 0, avg_deaths: 0, avg_assists: 0 },
      )
      .orTee(this.logError);
  }

  public async getMostRecentPlayerMatchByUserPuuid(
    puuid: string,
  ): Promise<Result<PlayerMatch | null, Error>> {
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
        new Error(
          `Failed to get most recent player match by user puuid of ${puuid}: ${e}`,
        ),
    )
      .map(([pm]) => pm ?? null)
      .orTee(this.logError);
  }

  public async updatePlayerMatch(
    playerMatch: PlayerMatch,
  ): Promise<Result<PlayerMatch, Error>> {
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
        new Error(
          `Failed to update player match by playerMatch.id ${playerMatch.id}: ${e}`,
        ),
    )
      .andThen(([p]) =>
        !p ?
          err(
            new Error(
              `Failed to update player match, returned match null for playerMatch.id ${playerMatch.id}`,
            ),
          )
        : ok(p),
      )
      .orTee(this.logError);
  }

  public async deletePlayerMatchById(
    id: string,
  ): Promise<Result<boolean, Error>> {
    return fromPromise(
      this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          id = ${id}
      `,
      (e) => new Error(`Failed to delete player match: ${e}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public async deletePlayerMatchesByPlayerId(
    playerId: string,
  ): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          "playerId" = ${playerId}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete player matches:", e);
      return false;
    }
  }

  public async deletePlayerMatchesByMatchId(matchId: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          "matchId" = ${matchId}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete player matches by match id:", e);
      return false;
    }
  }

  public async playerMatchExists(
    playerId: string,
    matchId: string,
  ): Promise<boolean> {
    const result = await this.db<{ exists: boolean }[]>`
      SELECT
        EXISTS(
          SELECT 1 
          FROM "PlayerMatch" 
          WHERE "playerId" = ${playerId} 
            AND "matchId" = ${matchId}
        ) as exists
    `;

    return result[0]?.exists ?? false;
  }

  public async bulkCreatePlayerMatches(
    playerMatches: PlayerMatch[],
  ): Promise<Result<boolean, Error>> {
    if (playerMatches.length === 0) return ok(true);

    return fromPromise(
      this.db`
        INSERT INTO "PlayerMatch" ${this.db(playerMatches)}
        ON CONFLICT ("playerId", "matchId") DO NOTHING
      `,
      (e) => new Error(`Failed to bulk create player matches: ${e}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }
}
