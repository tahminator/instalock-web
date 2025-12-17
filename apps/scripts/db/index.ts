import { Db } from "@instalock/db";
import postgres from "postgres";

export class DbClient {
  private instance: Db | null = null;

  constructor() {
    this.launchInstance();
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

export const db = new DbClient().get;
