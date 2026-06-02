import type { Db } from "@instalock/db";

import { HealthRegistrar, Injectable } from "@tahminator/sapling";
import postgres from "postgres";

@Injectable([HealthRegistrar])
export class DbClient {
  private instance: Db | null = null;

  constructor(healthRegistrar: HealthRegistrar) {
    this.launchInstance();
    healthRegistrar.add(async () => {
      try {
        const db = this.get;
        await db`SELECT 1`;
        return true;
      } catch (e) {
        console.error("db health check failed\n", e);
        return false;
      }
    });
  }

  private launchInstance(): void {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST is not defined in the environment");
    }
    if (!process.env.DB_PORT) {
      throw new Error("DB_PORT is not defined in the environment");
    }
    if (!process.env.DB_NAME) {
      throw new Error("DB_NAME is not defined in the environment");
    }
    if (!process.env.DB_USERNAME) {
      throw new Error("DB_USERNAME is not defined in the environment");
    }
    if (!process.env.DB_PASSWORD) {
      throw new Error("DB_PASSWORD is not defined in the environment");
    }

    this.instance = postgres({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    });
  }

  get get(): Db {
    if (this.instance == null) {
      throw new Error("Db instance failed to be initialized.");
    }
    return this.instance;
  }
}
