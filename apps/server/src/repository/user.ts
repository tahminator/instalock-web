import { BaseUserRepository } from "@instalock/db";
import { Injectable } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";

@Injectable([DbClient])
export class UserRepository extends BaseUserRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
