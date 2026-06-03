import { HealthRegistrar, Injectable } from "@tahminator/sapling";

import { Redis } from "@/lib/redis/types";

@Injectable([HealthRegistrar])
export class RateLimitRedisClient {
  private instance: Redis | null = null;

  constructor(healthRegistrar: HealthRegistrar) {
    this.launchInstance();
    healthRegistrar.add(this.getHealthCheck.bind(this));
  }

  private async getHealthCheck() {
    try {
      const client = this.get;
      const res = await client.ping();

      if (res !== "PONG") {
        console.error(`redis returned ${res as string} during health check`);
        return false;
      }

      return true;
    } catch (e) {
      console.error("redis health check failed\n", e);
      return false;
    }
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
