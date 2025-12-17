import { Injectable } from "@tahminator/sapling";
import { DbClient } from "@/lib/db";
import { BaseRiotMatchRepository } from "@instalock/db";

@Injectable([DbClient])
export class RiotMatchRepository extends BaseRiotMatchRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
