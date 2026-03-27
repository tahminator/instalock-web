import { $ } from "bun";

export async function migrateDb({
  dbUsername,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
}: {
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
}): Promise<void> {
  await $.env({
    ...process.env,
  })`migrate -source=file://packages/db/migrations -database="pgx5://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}" -verbose=true up`;
}
