import { Injectable } from "@tahminator/sapling";

import { Redis } from "@/lib/redis/types";

@Injectable()
export class CachingRedisClient {
  private instance: Redis | null = null;

  constructor() {
    this.launchInstance();
  }

  private launchInstance(): void {
    if (!process.env.CACHING_REDIS_URL) {
      throw new Error("Caching Redis URL is not set in environment.");
    }

    this.instance = new Redis(process.env.CACHING_REDIS_URL, {
      lazyConnect: true,
    });
  }

  get get(): Redis {
    if (this.instance == null) {
      throw new Error("Caching Redis instance failed to be initialized.");
    }
    return this.instance;
  }
}
