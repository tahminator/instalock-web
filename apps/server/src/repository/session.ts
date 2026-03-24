import { BaseSessionRepository } from "@instalock/db";
import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";

@Injectable([DbClient])
@TimedAll()
export class SessionRepository extends BaseSessionRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
