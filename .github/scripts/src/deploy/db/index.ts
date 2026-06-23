import { $ } from "bun";

export async function migrateDb({
  dbUsername,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
  migrationsDir = "packages/db/migrations",
  migrationTableOverride,
}: {
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  migrationsDir?: string;
  migrationTableOverride?: string;
}): Promise<void> {
  await $.env({
    ...process.env,
  })`migrate -source=file://${migrationsDir} -database="pgx5://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}${migrationTableOverride ? `?x-migrations-table=${migrationTableOverride}` : ""}" -verbose=true up`;
}
