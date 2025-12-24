import { BaseSessionRepository } from "@instalock/db";
import { Injectable } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";

@Injectable([DbClient])
export class SessionRepository extends BaseSessionRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
