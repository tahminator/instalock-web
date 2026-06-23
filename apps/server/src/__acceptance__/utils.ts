import type e from "express";
import type TestAgent from "supertest/lib/agent";

import { _resolve } from "@tahminator/sapling";

import { DbClient } from "@/lib/db";
import { waitUntil } from "@/lib/wait";

export async function waitUntilAppReady(testApp: TestAgent) {
  await waitUntil(async () => {
    const res = await testApp.get(`/livez`);
    return res.ok;
  }, 50);
}

// hack to trigger Sapling proxy in order to get ready/liveness probe to return true
export async function primeApp(app: e.Express) {
  await new Promise<void>((resolve, reject) => {
    const server = app.listen(0, "127.0.0.1", () => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });
}

export function getDb() {
  return _resolve(DbClient).get;
}

export async function reseedSession(
  sessionId: string,
  userPuuid: string,
): Promise<void> {
  const db = getDb();
  await db`
    INSERT INTO public."Session" ("id", "userId", "expiresAt", "tainted")
    VALUES (${sessionId}, ${userPuuid}, '9999-12-31 23:59:59', false)
    ON CONFLICT ("id")
    DO UPDATE SET "expiresAt" = EXCLUDED."expiresAt", "tainted" = false
  `;
}

export async function reseedUserRiotCredentials(puuid: string): Promise<void> {
  const db = getDb();
  await db`
    UPDATE public."User"
    SET "riotAuth" = 'acceptance-auth-token',
        "riotEntitlement" = 'acceptance-entitlement-token'
    WHERE puuid = ${puuid}
  `;
}
