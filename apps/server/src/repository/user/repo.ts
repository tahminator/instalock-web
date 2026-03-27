import { BaseUserRepository } from "@instalock/db";
import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";

@Injectable([DbClient])
@TimedAll()
export class UserRepository extends BaseUserRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
