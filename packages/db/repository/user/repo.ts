import type { ResultAsync } from "neverthrow";

import { err, fromPromise, ok } from "neverthrow";

import type { Db } from "../..";
import type { User } from "../../models";

import { DbError } from "../..";

export class BaseUserRepository {
  constructor(private readonly db: Db) {}

  private logError(this: void, e: Error) {
    console.error(`[Error] ${e}`);
  }

  public createUser(
    user: Pick<User, "puuid"> &
      Partial<Pick<User, "riotEntitlement" | "riotAuth" | "riotTag">>,
  ): ResultAsync<User, DbError> {
    return fromPromise(
      this.db<User[]>`
        INSERT INTO "User"
          (puuid, "riotEntitlement", "riotAuth", "riotTag")
        VALUES
          (${user.puuid}, ${user.riotEntitlement ?? null}, ${user.riotAuth ?? null}, ${user.riotTag ?? null})
        RETURNING *
      `,
      (e) => new DbError(`Failed to create user: ${String(e)}`),
    )
      .andThen(([result]) =>
        result ?
          ok(result)
        : err(new DbError("Failed to create user, received null back")),
      )
      .orTee(this.logError);
  }

  public getUserByPuuid(puuid: string): ResultAsync<User | null, DbError> {
    return fromPromise(
      this.db<User[]>`
        SELECT
          *
        FROM
          "User"
        WHERE
          puuid = ${puuid}
      `,
      (e) => new DbError(`Failed to get user by puuid ${puuid}: ${String(e)}`),
    )
      .map(([user]) => user ?? null)
      .orTee(this.logError);
  }

  public getUsers(): ResultAsync<User[], DbError> {
    return fromPromise(
      this.db<User[]>`
        SELECT
          *
        FROM
          "User"
      `,
      (e) => new DbError(`Failed to get users: ${String(e)}`),
    ).orTee(this.logError);
  }

  public getUsersCount(): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "User"
      `,
      (e) => new DbError(`Failed to get users count: ${String(e)}`),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getRegisteredUsersCount(): ResultAsync<number, DbError> {
    return fromPromise(
      this.db<{ count: number }[]>`
        SELECT
          COUNT(*) as count
        FROM
          "User"
        WHERE
          "newUser" = false
      `,
      (e) => new DbError(`Failed to get registered users count: ${String(e)}`),
    )
      .map(([result]) => Number(result?.count ?? 0))
      .orTee(this.logError);
  }

  public getUsersWithRiotTagWithQuery(
    query: string,
  ): ResultAsync<User[], DbError> {
    return fromPromise(
      this.db<User[]>`
        SELECT
          *
        FROM
          "User"
        WHERE
          "riotTag" ILIKE ${"%" + query + "%"}
      `,
      (e) =>
        new DbError(
          `Failed to get users by riot tag query ${query}: ${String(e)}`,
        ),
    ).orTee(this.logError);
  }

  public updateUser(user: User): ResultAsync<User, DbError> {
    return fromPromise(
      this.db<User[]>`
        UPDATE
          "User"
        SET
          "riotEntitlement" = ${user.riotEntitlement},
          "riotAuth" = ${user.riotAuth},
          "riotTag" = ${user.riotTag},
          "newUser" = ${user.newUser}
        WHERE
          puuid = ${user.puuid}
        RETURNING *
      `,
      (e) => new DbError(`Failed to update user: ${String(e)}`),
    )
      .andThen(([result]) =>
        result ?
          ok(result)
        : err(new DbError("Failed to update user, received null back")),
      )
      .orTee(this.logError);
  }

  public deleteUserByPuuid(puuid: string): ResultAsync<boolean, DbError> {
    return fromPromise(
      this.db`
        DELETE FROM
          "User"
        WHERE
          puuid = ${puuid}
      `,
      (e) => new DbError(`Failed to delete user: ${String(e)}`),
    )
      .map((_) => true)
      .orTee(this.logError);
  }
}
