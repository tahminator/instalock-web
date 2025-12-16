import { Db, RiotMatch, RiotMatchTeamColor } from "..";

export class BaseRiotMatchRepository {
  constructor(private readonly db: Db) {}

  public async createMatch(match: RiotMatch): Promise<RiotMatch | null> {
    try {
      const result = await this.db<RiotMatch[]>`
        INSERT INTO "RiotMatch" ${this.db(match)}
        RETURNING *
      `;
      return result[0] ?? null;
    } catch (e) {
      console.error("Failed to create riot match:", e);
      return null;
    }
  }

  public async getMatchById(id: string): Promise<RiotMatch | null> {
    const match = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        id = ${id}
    `;

    return match[0] ?? null;
  }

  public async getMatches(limit = 1000, offset = 0): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return matches;
  }

  public async getMatchesByMapId(
    mapId: string,
    limit = 1000,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "mapId" = ${mapId}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getMatchesByQueueId(
    queueId: string,
    limit = 1000,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "queueId" = ${queueId}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getRankedMatches(
    limit = 1000,
    offset = 0,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "isRanked" = true
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return matches;
  }

  public async getCompletedMatches(
    limit = 1000,
    offset = 0,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "isCompleted" = true
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return matches;
  }

  public async getMatchesBySeasonId(
    seasonId: string,
    limit = 100,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "seasonId" = ${seasonId}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getMatchesByDateRange(
    startDate: Date,
    endDate: Date,
    limit = 100,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "gameStart" >= ${startDate}
        AND "gameStart" <= ${endDate}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getRecentMatches(limit = 100): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "gameStart" IS NOT NULL
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getMatchesByPlayerPuuid(
    playerPuuid: string,
    limit = 1000,
    offset = 0,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
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
    `;

    return matches;
  }

  public async getRankedMatchesByPlayerPuuid(
    playerPuuid: string,
    limit = 1000,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
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
    `;

    return matches;
  }

  public async getMatchesCount(): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "RiotMatch"
    `;

    return result[0]?.count ?? 0;
  }

  public async getRankedMatchesCount(): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "RiotMatch"
      WHERE
        "isRanked" = true
    `;

    return result[0]?.count ?? 0;
  }

  public async getMatchesCountByMapId(mapId: string): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "RiotMatch"
      WHERE
        "mapId" = ${mapId}
    `;

    return result[0]?.count ?? 0;
  }

  public async getMatchesCountByPlayerPuuid(
    playerPuuid: string,
  ): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "RiotMatch" rm
      INNER JOIN
        "PlayerMatch" pm ON rm.id = pm."matchId"
      WHERE
        pm."playerId" = ${playerPuuid}
    `;

    return result[0]?.count ?? 0;
  }

  public async updateMatch(match: RiotMatch): Promise<RiotMatch | null> {
    try {
      const result = await this.db<RiotMatch[]>`
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
      `;
      return result[0] ?? null;
    } catch (e) {
      console.error("Failed to update riot match:", e);
      return null;
    }
  }

  public async deleteMatchById(id: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "RiotMatch"
        WHERE
          id = ${id}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete riot match:", e);
      return false;
    }
  }

  public async matchExists(id: string): Promise<boolean> {
    const result = await this.db<{ exists: boolean }[]>`
      SELECT
        EXISTS(SELECT 1 FROM "RiotMatch" WHERE id = ${id}) as exists
    `;

    return result[0]?.exists ?? false;
  }

  public async getMatchesByTeamWon(
    teamColor: RiotMatchTeamColor,
    limit = 1000,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "teamWon" = ${teamColor}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async getMatchesWithMinRounds(
    minRounds: number,
    limit = 1000,
  ): Promise<RiotMatch[]> {
    const matches = await this.db<RiotMatch[]>`
      SELECT
        *
      FROM
        "RiotMatch"
      WHERE
        "roundsPlayed" >= ${minRounds}
      ORDER BY "gameStart" DESC
      LIMIT ${limit}
    `;

    return matches;
  }

  public async bulkCreateMatches(matches: RiotMatch[]): Promise<boolean> {
    if (matches.length === 0) return true;

    try {
      await this.db`
        INSERT INTO "RiotMatch" ${this.db(matches)}
        ON CONFLICT (id) DO NOTHING
      `;
      return true;
    } catch (e) {
      console.error("Failed to bulk create riot matches:", e);
      return false;
    }
  }
}
