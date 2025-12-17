import { Injectable } from "@tahminator/sapling";
import { DbClient } from "@/lib/db";
import { BasePlayerMatchRepository } from "@instalock/db";

@Injectable([DbClient])
export class PlayerMatchRepository extends BasePlayerMatchRepository {
  constructor(readonly dbClient: DbClient) {
    super(dbClient.get);
  }
}
