import { Injectable } from "@tahminator/sapling";

import { Redis } from "@/lib/redis/types";

@Injectable()
export class RateLimitRedisClient {
  private instance: Redis | null = null;

  constructor() {
    this.launchInstance();
  }

  private launchInstance(): void {
    if (!process.env.RATE_LIMIT_REDIS_URL) {
      throw new Error("Ratelimiter Redis URL is not set in environment.");
    }

    this.instance = new Redis(process.env.RATE_LIMIT_REDIS_URL, {
      lazyConnect: true,
    });
  }

  get get(): Redis {
    if (this.instance == null) {
      throw new Error("Redis instance failed to be initialized.");
    }
    return this.instance;
  }
}
