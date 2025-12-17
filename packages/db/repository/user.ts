import { Db } from "..";
import { User } from "../models";

export class BaseUserRepository {
  constructor(private readonly db: Db) {}

  public async createUser(
    user: Pick<User, "puuid"> &
      Partial<Pick<User, "riotEntitlement" | "riotAuth" | "riotTag">>,
  ): Promise<User | null> {
    try {
      const result = await this.db<User[]>`
        INSERT INTO "User"
          (puuid, "riotEntitlement", "riotAuth", "riotTag")
        VALUES
          (${user.puuid}, ${user.riotEntitlement ?? null}, ${user.riotAuth ?? null}, ${user.riotTag ?? null})
        RETURNING *
      `;
      return result[0] ?? null;
    } catch (e) {
      console.error("Failed to create user:", e);
      return null;
    }
  }

  public async getUserByPuuid(puuid: string): Promise<User | null> {
    const user = await this.db<User[]>`
      SELECT
        *
      FROM
        "User"
      WHERE
        puuid = ${puuid}
    `;

    return user[0] ?? null;
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.db<User[]>`
      SELECT
        *
      FROM
        "User"
    `;

    return users;
  }

  public async getUsersCount(): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "User"
    `;

    return result[0]?.count ?? 0;
  }

  public async getRegisteredUsersCount(): Promise<number> {
    const result = await this.db<{ count: number }[]>`
      SELECT
        COUNT(*) as count
      FROM
        "User"
      WHERE
        "newUser" = false
    `;

    return result[0]?.count ?? 0;
  }

  public async getUsersWithRiotTagWithQuery(query: string): Promise<User[]> {
    const users = await this.db<User[]>`
      SELECT
        *
      FROM
        "User"
      WHERE
        "riotTag" ILIKE ${"%" + query + "%"}
    `;

    return users;
  }

  public async updateUser(user: User): Promise<User | null> {
    try {
      const result = await this.db<User[]>`
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
      `;
      return result[0] ?? null;
    } catch (e) {
      console.error("Failed to update user:", e);
      return null;
    }
  }

  public async deleteUserByPuuid(puuid: string): Promise<boolean> {
    try {
      await this.db`
        DELETE FROM
          "User"
        WHERE
          puuid = ${puuid}
      `;
      return true;
    } catch (e) {
      console.error("Failed to delete user:", e);
      return false;
    }
  }
}
