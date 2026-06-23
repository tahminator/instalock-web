import type {
  ApiDefault,
  RiotMatchEnriched,
  RiotPlayerData,
} from "@instalock/api";
import type TestAgent from "supertest/lib/agent";

import SJ from "superjson";
import supertest from "supertest";

import { primeApp, waitUntilAppReady } from "@/__acceptance__/utils";

import { app } from "../../index";
import {
  AUTHED_PUUID,
  AUTHED_RIOT_TAG,
  AUTHED_SESSION_COOKIE,
  SEEDED_MATCH_ID,
  SEEDED_PUUID,
  SEEDED_RIOT_TAG,
  SESSION_COOKIE,
} from "../const";

describe("query controller", () => {
  let testApp: TestAgent;

  beforeAll(async () => {
    await primeApp(app);
    testApp = supertest(app);
    await waitUntilAppReady(testApp);
  });

  describe("GET /api/riot/query/me", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.get(`/api/riot/query/me`);

      expect(res.status).toBe(401);
    });

    it("returns 400 when the user has no riot credentials stored", async () => {
      const res = await testApp
        .get(`/api/riot/query/me`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(400);
    });

    it("returns rank/rr/rankName from the latest competitive update", async () => {
      const res = await testApp
        .get(`/api/riot/query/me`)
        .set("Cookie", AUTHED_SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotPlayerData> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload.puuid).toBe(AUTHED_PUUID);
        expect(body.payload.riotTag).toBe(AUTHED_RIOT_TAG);
        expect(body.payload.rank).toBe(21);
        expect(body.payload.rr).toBe(42);
        expect(typeof body.payload.rankName).toBe("string");
      }
    });
  });

  describe("GET /api/riot/query/me/match", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.get(`/api/riot/query/me/match`);

      expect(res.status).toBe(401);
    });

    it("returns enriched matches for the authenticated seeded user", async () => {
      const res = await testApp
        .get(`/api/riot/query/me/match`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotMatchEnriched[]> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(Array.isArray(body.payload)).toBe(true);
        expect(body.payload.length).toBeGreaterThan(0);
        expect(
          body.payload.every(
            (m) =>
              m.playerData === null || m.playerData.playerId === SEEDED_PUUID,
          ),
        ).toBe(true);
      }
    });

    it("returns an empty array for a user with no player matches", async () => {
      const res = await testApp
        .get(`/api/riot/query/me/match`)
        .set("Cookie", AUTHED_SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotMatchEnriched[]> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload).toEqual([]);
      }
    });
  });

  describe("GET /api/riot/query/me/match/:matchId", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.get(
        `/api/riot/query/me/match/${SEEDED_MATCH_ID}`,
      );

      expect(res.status).toBe(401);
    });

    it("returns 400 when the matchId is not a valid uuid", async () => {
      const res = await testApp
        .get(`/api/riot/query/me/match/not-a-uuid`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(400);
    });

    it("returns 404 when no match exists for that valid uuid", async () => {
      const bogusMatchId = "00000000-0000-0000-0000-000000000000";
      const res = await testApp
        .get(`/api/riot/query/me/match/${bogusMatchId}`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(404);
    });

    it("returns enriched match data for a known seeded match", async () => {
      const res = await testApp
        .get(`/api/riot/query/me/match/${SEEDED_MATCH_ID}`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotMatchEnriched> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload.matchData.id).toBe(SEEDED_MATCH_ID);
        expect(body.payload.playerData?.playerId).toBe(SEEDED_PUUID);
        expect(Array.isArray(body.payload.players)).toBe(true);
        expect(
          body.payload.players?.some((p) => p.playerId === SEEDED_PUUID),
        ).toBe(true);
      }
    });
  });

  describe("GET /api/riot/query/:puuid", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.get(`/api/riot/query/${SEEDED_PUUID}`);

      expect(res.status).toBe(401);
    });

    it("returns 400 when the authenticated user has no riot credentials stored", async () => {
      const res = await testApp
        .get(`/api/riot/query/${SEEDED_PUUID}`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(400);
    });

    it("returns riot player data for a target puuid when authenticated", async () => {
      const res = await testApp
        .get(`/api/riot/query/${SEEDED_PUUID}`)
        .set("Cookie", AUTHED_SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotPlayerData> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload.puuid).toBe(SEEDED_PUUID);
        expect(body.payload.riotTag).toBe(SEEDED_RIOT_TAG);
      }
    });
  });
});
