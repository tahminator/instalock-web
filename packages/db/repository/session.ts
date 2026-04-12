import type { ResultAsync } from "neverthrow";

import { err, fromPromise, ok } from "neverthrow";

import type { Db, Session } from "..";

import { DbError } from "..";

export class BaseSessionRepository {
  constructor(private readonly db: Db) {}

  private logError(this: void, e: Error) {
    console.error(`[Error] ${e}`);
  }

  public getSessionById(id: string): ResultAsync<Session | null, DbError> {
    return fromPromise(
      this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        id = ${id}
      AND
        tainted = false
    `,
      (e) => new DbError(`Failed to get session by ID of ${id}: ${String(e)}`),
    )
      .map(([s]) => s ?? null)
      .orTee(this.logError);
  }

  public getSessionsByUserPuuid(
    userPuuid: string,
  ): ResultAsync<Session[], DbError> {
    return fromPromise(
      this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        "userId" = ${userPuuid}
      AND
        tainted = false
      ORDER BY "expiresAt" DESC
    `,
      (e) =>
        new DbError(
          `Failed to get sessions by user puuid of ${userPuuid}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public getActiveSessionById(
    id: string,
  ): ResultAsync<Session | null, DbError> {
    return fromPromise(
      this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        id = ${id}
      AND
        "expiresAt" > NOW()
      AND
        tainted = false
    `,
      (e) =>
        new DbError(
          `Failed to get active session by id of ${id}: ${String(e)}`,
        ),
    )
      .map(([s]) => s ?? null)
      .orTee(this.logError);
  }

  public getActiveSessionsByUserPuuid(
    userPuuid: string,
  ): ResultAsync<Session[], DbError> {
    return fromPromise(
      this.db<Session[]>`
      SELECT
        *
      FROM
        "Session"
      WHERE
        "userId" = ${userPuuid}
      AND
        "expiresAt" > NOW()
      AND
        tainted = false
      ORDER BY "expiresAt" DESC
    `,
      (e) =>
        new DbError(
          `Failed to get active sessions by user puuid of ${userPuuid}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public updateSession(session: Session): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        UPDATE
          "Session"
        SET
          "userId" = ${session.userId},
          "expiresAt" = ${session.expiresAt},
          tainted = ${session.tainted}
        WHERE
          id = ${session.id}
      `,
      (e) =>
        new DbError(
          `Failed to update session with id of ${session.id}: ${String(e)}`,
        ),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public taintSession(id: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        UPDATE
          "Session"
        SET
          "tainted" = true
        WHERE
          id = ${id}
      `,
      (e) =>
        new DbError(`Failed to taint session with id of ${id}: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public deleteUserSessions(userPuuid: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "Session"
        WHERE
          "userId" = ${userPuuid}
      `,
      (e) =>
        new DbError(
          `Failed to delete user sessions for ${userPuuid}: ${String(e)}`,
        ),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public createSession(
    id: string,
    userId: string,
    expiresAt: Date,
  ): ResultAsync<Session, DbError> {
    return fromPromise(
      this.db<Session[]>`
        INSERT INTO "Session" (id, "userId", "expiresAt")
        VALUES (${id}, ${userId}, ${expiresAt})
        RETURNING *
      `,
      (e) => new DbError(`Failed to create session: ${String(e)}`),
    )
      .andThen(([session]) =>
        session ?
          ok(session)
        : err(new DbError("Failed to create session, received null back")),
      )
      .orTee(this.logError);
  }

  public updateSessionExpiration(
    id: string,
    expiresAt: Date,
  ): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        UPDATE "Session"
        SET "expiresAt" = ${expiresAt}
        WHERE id = ${id}
      `,
      (e) =>
        new DbError(
          `Failed to update session expiration for ${id}: ${String(e)}`,
        ),
    )
      .map((_) => true)
      .orTee(this.logError);
  }

  public deleteExpiredSessions(): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM "Session"
        WHERE "expiresAt" < NOW()
      `,
      (e) => new DbError(`Failed to delete expired sessions: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }
}
