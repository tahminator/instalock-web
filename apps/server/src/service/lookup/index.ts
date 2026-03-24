import type { RiotPlayerData } from "@instalock/api";
import type { TierNumber } from "@instalock/riot";
import type { Histogram } from "prom-client";

import { TimedAll } from "@instalock/meter";
import { RiotClient, tierNumberToNameObject } from "@instalock/riot";
import { Injectable, Sapling } from "@tahminator/sapling";

import type { Redis } from "@/lib/redis/types";

import { CachingRedisClient } from "@/lib/redis/cache";
import { PrometheusMetricTypeProvider } from "@/middleware/prom/metric/provider";

@TimedAll()
@Injectable([CachingRedisClient, PrometheusMetricTypeProvider])
export class CachingLookupService {
  private readonly THIRTY_MINUTES = 60 * 30;
  private readonly riotClientHistogram: Histogram;

  private readonly redis: Redis;
  constructor(
    redisClient: CachingRedisClient,
    readonly prometheusMetricTypeProvider: PrometheusMetricTypeProvider,
  ) {
    this.redis = redisClient.get;
    this.riotClientHistogram =
      this.prometheusMetricTypeProvider.histograms.riotClientExecutionHistogram;
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
    const riotUserInfoRes = await RiotClient.getPlayerByPuuid(
      {
        authToken,
        entitlementToken,
        playerPuuids: [puuid],
      },
      {
        histogram: this.riotClientHistogram,
      },
    );

    let riotTag: string | null = null;

    if (riotUserInfoRes.ok) {
      const riotUserInfoJson = await riotUserInfoRes.json();
      riotTag = this.getRiotTag(riotUserInfoJson[0]);
    }

    const riotMatchInfoRes = await RiotClient.getCompetitiveUpdates(
      {
        authToken,
        entitlementToken,
        puuid,
        startIndex: 0,
        endIndex: 1,
      },
      {
        histogram: this.riotClientHistogram,
      },
    );

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
