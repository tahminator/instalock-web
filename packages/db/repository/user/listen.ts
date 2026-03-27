import type { Db } from "../..";

export class BaseUserListener {
  constructor(private readonly db: Db) {}

  listenForUpdateNewUserMatchesChannel(
    onCreate: (puuid: string) => void | Promise<void>,
  ) {
    this.db.listen("updateNewUserMatchesChannel", async (id) => {
      console.log(`createUserChannel triggered for user ID ${id}`);
      onCreate(id);
    });
  }
}
