import { $ } from "bun";

import { ServerClient } from "@/server/client";

const env = {
  DB_HOST: "localhost",
  DB_PORT: "5432",
  DB_NAME: "codegen",
  DB_USERNAME: "codegen",
  DB_PASSWORD: "codegen",
  RATE_LIMIT_REDIS_URL: "redis://:codegen@localhost:6379/0",
  CACHING_REDIS_URL: "redis://:codegen@localhost:6379/1",
  PROMETHEUS_USERNAME: "codegen",
  PROMETHEUS_PASSWORD: "codegen",
};

export async function main() {
  await using _serverClient = await ServerClient.start(env);

  await $`pnpm run codegen`;
}

void main();
