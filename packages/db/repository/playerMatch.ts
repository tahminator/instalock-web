import type { Result } from "neverthrow";

import { err, fromPromise, ok } from "neverthrow";

import type { Db, PlayerMatch, RiotMatchTeamColor } from "..";

export class BasePlayerMatchRepository {
  constructor(private readonly db: Db) {}

  public async createPlayerMatch(
    playerMatch: PlayerMatch,
  ): Promise<Result<PlayerMatch | null, Error>> {
    return fromPromise(
      this.db<PlayerMatch[]>`
        INSERT INTO "PlayerMatch" ${this.db(playerMatch)}
        RETURNING *
      `,
      (e) => new Error(`Failed to create player match: ${e}`),
    ).andThen(([pm]) =>
      !pm ?
        err(new Error("Failed to create player match, received null back"))
      : ok(pm),
    );
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
    ).map(([pm]) => pm ?? null);
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
    );
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
    );
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
    ).map(([pm]) => pm ?? null);
  }

  /**
   * Will look for the most recent non-0 tiered player match.
   *
   * Useful when attempting to display rank without having to go so far back.
   */
  public async getMostRecentUsefulPlayerMatchByPlayerPuuid(
    playerId: string,
  ): Promise<PlayerMatch | null> {
    const playerMatch = await this.db<PlayerMatch[]>`
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
    `;

    return playerMatch[0] ?? null;
  }

  public async getBulkPlayerMatchesByPlayerAndMatches(
    records: { playerId: string; matchId: string }[],
  ): Promise<PlayerMatch[]> {
    if (records.length === 0) return [];

    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        pm.*
      FROM
        "PlayerMatch" pm
      INNER JOIN
        (VALUES ${this.db(records.map((r) => [r.playerId, r.matchId]))}) AS v("playerId", "matchId")
      ON
        pm."playerId" = v."playerId"
        AND pm."matchId" = v."matchId"
    `;

    return playerMatches;
  }

  public async getPlayerMatchesByCharacterId(
    playerId: string,
    characterId: string,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "characterId" = ${characterId}
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return playerMatches;
  }

  public async getPlayerMatchesByTeamColor(
    playerId: string,
    teamColor: RiotMatchTeamColor,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamColor" = ${teamColor}
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return playerMatches;
  }

  public async getWonPlayerMatches(
    playerId: string,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamWon" = true
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return playerMatches;
  }

  public async getLostPlayerMatches(
    playerId: string,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND "teamWon" = false
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return playerMatches;
  }

  public async getPlayerMatchesWithMinKills(
    playerId: string,
    minKills: number,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
      SELECT
        *
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
        AND kills >= ${minKills}
      ORDER BY kills DESC
      LIMIT ${limit}
    `;

    return playerMatches;
  }

  public async getPlayerMatchesByKDA(
    playerId: string,
    limit = 100,
  ): Promise<PlayerMatch[]> {
    const playerMatches = await this.db<PlayerMatch[]>`
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
    `;

    return playerMatches;
  }

  public async getPlayerMatchesCount(playerId: string): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `;

    return Number(result[0]?.count ?? 0);
  }

  public async getPlayerWinRate(playerId: string): Promise<number> {
    const result = await this.db<{ win_rate: number }[]>`
      SELECT
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE (COUNT(*) FILTER (WHERE "teamWon" = true)::float / COUNT(*)) * 100
        END as win_rate
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `;

    return Number(result[0]?.win_rate ?? 0);
  }

  public async getPlayerAverageKDA(playerId: string): Promise<{
    avg_kills: number;
    avg_deaths: number;
    avg_assists: number;
  }> {
    const result = await this.db<
      { avg_kills: number; avg_deaths: number; avg_assists: number }[]
    >`
      SELECT
        AVG(kills)::float as avg_kills,
        AVG(deaths)::float as avg_deaths,
        AVG(assists)::float as avg_assists
      FROM
        "PlayerMatch"
      WHERE
        "playerId" = ${playerId}
    `;

    return result[0] ?? { avg_kills: 0, avg_deaths: 0, avg_assists: 0 };
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
        AND pm.tier != 0
      ORDER BY rm."gameStart" DESC
      LIMIT 1
    `,
      (e) =>
        new Error(
          `Failed to get most recent player match by user puuid of ${puuid}: ${e}`,
        ),
    ).map(([pm]) => pm ?? null);
  }

  public async updatePlayerMatch(
    playerMatch: PlayerMatch,
  ): Promise<Result<PlayerMatch, Error>> {
    return ok(
      this.db(
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
      ),
    )
      .asyncAndThen((r) =>
        fromPromise(
          this.db<PlayerMatch[]>`
        UPDATE
          "PlayerMatch"
        SET
          ${r}
        WHERE
          id = ${playerMatch.id}
        RETURNING *
      `,
          (e) =>
            new Error(
              `Failed to update player match by playerMatch.id ${playerMatch.id}: ${e}`,
            ),
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
      );
  }

  public async deletePlayerMatchById(id: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "PlayerMatch"
        WHERE
          id = ${id}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete player match:", e);
      return false;
    }
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
  ): Promise<boolean> {
    if (playerMatches.length === 0) return true;

    try {
      await this.db`
        INSERT INTO "PlayerMatch" ${this.db(playerMatches)}
        ON CONFLICT ("playerId", "matchId") DO NOTHING
      `;
      return true;
    } catch (e) {
      console.error("Failed to bulk create player matches:", e);
      return false;
    }
  }
}
