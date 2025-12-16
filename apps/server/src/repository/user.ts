import { Injectable } from "@tahminator/sapling";
import { DbClient } from "@/lib/db";
import { BaseUserRepository } from "@instalock/db";

@Injectable([DbClient])
export class UserRepository extends BaseUserRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
