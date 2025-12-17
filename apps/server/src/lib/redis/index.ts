import RC from "ioredis";
import { Injectable } from "@tahminator/sapling";

export type Redis = RC;

@Injectable()
export class RedisClient {
  private instance: Redis | null = null;

  constructor() {
    this.launchInstance();
  }

  private launchInstance(): void {
    if (!process.env.REDIS_URL) {
      throw new Error("Redis URL is not set in environment.");
    }

    this.instance = new RC(process.env.REDIS_URL, {
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
