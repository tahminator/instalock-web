import { HealthRegistrar, Injectable } from "@tahminator/sapling";

import { Redis } from "@/lib/redis/types";

@Injectable([HealthRegistrar])
export class CachingRedisClient {
  private instance: Redis | null = null;

  constructor(healthRegistrar: HealthRegistrar) {
    this.launchInstance();
    healthRegistrar.add(async () => {
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
    });
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
