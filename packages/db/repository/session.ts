import { Db, Session } from "..";

export class BaseSessionRepository {
  constructor(private readonly db: Db) {}

  public async getSessionById(id: string): Promise<Session | null> {
    const session = await this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        id = ${id}
    `;

    return session[0] ?? null;
  }

  public async getSessionsByUserPuuid(userPuuid: string): Promise<Session[]> {
    const sessions = await this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        "userId" = ${userPuuid}
      ORDER BY "expiresAt" DESC
    `;

    return sessions;
  }

  public async getActiveSessionById(id: string): Promise<Session | null> {
    const session = await this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        id = ${id}
        AND "expiresAt" > NOW()
    `;

    return session[0] ?? null;
  }

  public async getActiveSessionsByUserPuuid(
    userPuuid: string,
  ): Promise<Session[]> {
    const sessions = await this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        "userId" = ${userPuuid}
        AND "expiresAt" > NOW()
      ORDER BY "expiresAt" DESC
    `;

    return sessions;
  }

  public async updateSession(session: Session): Promise<boolean> {
    try {
      await this.db`
        UPDATE 
          "Session"
        SET
          "userId" = ${session.userId},
          "expiresAt" = ${session.expiresAt}
        WHERE
          id = ${session.id}
      `;
      return true;
    } catch (e) {
      console.error("Failed to update session:", e);
      return false;
    }
  }

  public async deleteSession(id: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "Session"
        WHERE
          id = ${id}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete session:", e);
      return false;
    }
  }

  public async deleteUserSessions(userPuuid: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "Session"
        WHERE
          "userId" = ${userPuuid}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete user sessions:", e);
      return false;
    }
  }

  public async createSession(
    id: string,
    userId: string,
    expiresAt: Date,
  ): Promise<Session | null> {
    try {
      const result = await this.db<Session[]>`
        INSERT INTO "Session" (id, "userId", "expiresAt")
        VALUES (${id}, ${userId}, ${expiresAt})
        RETURNING *
      `;
      return result[0] ?? null;
    } catch (e) {
      console.error("Failed to create session:", e);
      return null;
    }
  }

  public async updateSessionExpiration(
    id: string,
    expiresAt: Date,
  ): Promise<boolean> {
    try {
      await this.db`
        UPDATE "Session"
        SET "expiresAt" = ${expiresAt}
        WHERE id = ${id}
      `;
      return true;
    } catch (e) {
      console.error("Failed to update session expiration:", e);
      return false;
    }
  }

  public async deleteExpiredSessions(): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM "Session"
        WHERE "expiresAt" < NOW()
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete expired sessions:", e);
      return false;
    }
  }
}
