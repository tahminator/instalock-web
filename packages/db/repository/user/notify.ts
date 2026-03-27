import type { Db } from "../..";

export class BaseUserNotifier {
  constructor(private readonly db: Db) {}

  async triggerUpdateNewUserMatches(puuid: string): Promise<void> {
    await this.db`SELECT "updateNewUserMatches"(${puuid})`;
  }
}
