import { RiotPlayerData } from "@instalock/api";
import {
  RiotClient,
  TierNumber,
  tierNumberToNameObject,
} from "@instalock/riot";
import { Injectable, Sapling } from "@tahminator/sapling";

import { CachingRedisClient } from "@/lib/redis/cache";
import { Redis } from "@/lib/redis/types";

@Injectable([CachingRedisClient])
export class CachingLookupService {
  private readonly THIRTY_MINUTES = 60 * 30;

  private readonly redis: Redis;
  constructor(redisClient: CachingRedisClient) {
    this.redis = redisClient.get;
  }

  async getPlayer(
    puuid: string,
    authToken: string,
    entitlementToken: string,
  ): Promise<RiotPlayerData> {
    const buffer = await this.redis.get(puuid);

    if (buffer) {
      const playerData = Sapling.deserialize<RiotPlayerData>(buffer);

      if (this.isPlayerDataComplete(playerData)) {
        return playerData;
      }
    }

    const player = await this.ifPlayerNotExists(
      puuid,
      authToken,
      entitlementToken,
    );
    await this.redis.set(
      puuid,
      Sapling.serialize(player),
      "EX",
      this.THIRTY_MINUTES,
    );
    return player;
  }

  private isPlayerDataComplete(playerData: RiotPlayerData) {
    return (
      playerData.riotTag != null &&
      playerData.rank != null &&
      playerData.rr != null &&
      playerData.rankName != null
    );
  }

  private getRiotTag({
    GameName,
    TagLine,
  }: {
    GameName: string;
    TagLine: string;
  }): string {
    return `${GameName}#${TagLine}`;
  }

  private async ifPlayerNotExists(
    puuid: string,
    authToken: string,
    entitlementToken: string,
  ): Promise<RiotPlayerData> {
    const riotUserInfoRes = await RiotClient.getPlayerByPuuid({
      authToken,
      entitlementToken,
      playerPuuids: [puuid],
    });

    let riotTag: string | null = null;

    if (riotUserInfoRes.ok) {
      const riotUserInfoJson = await riotUserInfoRes.json();
      riotTag = this.getRiotTag(riotUserInfoJson[0]);
    }

    const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates({
      authToken,
      entitlementToken,
      puuid,
      startIndex: 0,
      endIndex: 1,
    });

    let rank: number | null = null;
    let rr: number | null = null;
    let rankName: string | null = null;

    if (riotMatchInfoRes.ok) {
      const riotMatchInfoJson = await riotMatchInfoRes.json();

      if (
        riotMatchInfoJson.errorCode === undefined &&
        riotMatchInfoJson.Matches.length > 0
      ) {
        const latestMatch = riotMatchInfoJson.Matches[0];
        rank = latestMatch.TierAfterUpdate;
        rr = latestMatch.RankedRatingAfterUpdate;
        const tierKey = latestMatch.TierAfterUpdate.toString() as TierNumber;
        rankName = tierNumberToNameObject[tierKey];
      }
    }

    return {
      puuid,
      riotTag,
      rank,
      rr,
      rankName,
    };
  }
}
