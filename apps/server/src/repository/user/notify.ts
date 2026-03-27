import { BaseUserNotifier } from "@instalock/db";
import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";

@Injectable([DbClient])
@TimedAll()
export class UserNotifier extends BaseUserNotifier {
  constructor(private readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
