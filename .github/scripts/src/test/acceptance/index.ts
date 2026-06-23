import { LocalPostgresClient, LocalRedisClient } from "@tahminator/pipeline";
import { $ } from "bun";

import { migrateDb } from "@/deploy/db";

export async function main() {
  await using pgClient = await LocalPostgresClient.create({
    database: "instalock-server-acceptance",
  });
  await using redisClient = await LocalRedisClient.create();

  const { database, host, port, password, user } = pgClient.state;
  const {
    port: redisPort,
    password: redisPassword,
    host: redisHost,
  } = redisClient.state;

  await migrateDb({
    dbHost: host,
    dbName: database,
    dbPort: String(port),
    dbPassword: password,
    dbUsername: user,
  });
  await migrateDb({
    dbHost: host,
    dbName: database,
    dbPort: String(port),
    dbPassword: password,
    dbUsername: user,
    migrationsDir: "packages/db/migrations/acceptance",
    migrationTableOverride: "schema_migrations_acceptance",
  });

  await $.env({
    ...process.env,
    DB_HOST: host,
    DB_PORT: String(port),
    DB_NAME: database,
    DB_USERNAME: user,
    DB_PASSWORD: password,
    RATE_LIMIT_REDIS_URL: `redis://:${redisPassword}@${redisHost}:${redisPort}/0`,
    CACHING_REDIS_URL: `redis://:${redisPassword}@${redisHost}:${redisPort}/1`,
  })`cd apps/server && pnpm run acceptance`;
}

void main();
