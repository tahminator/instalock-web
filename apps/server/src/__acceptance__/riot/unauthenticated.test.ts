import type {
  ApiDefault,
  MetricsDto,
  RiotPlayerDataShallow,
} from "@instalock/api";
import type { RiotPlayerDataDetailed } from "@instalock/api/dto/RiotPlayerDataDetailed";
import type TestAgent from "supertest/lib/agent";

import SJ from "superjson";
import supertest from "supertest";

import { primeApp, waitUntilAppReady } from "@/__acceptance__/utils";

import { app } from "../../index";
import { SEEDED_PUUID, SEEDED_RIOT_TAG } from "../const";

describe("unauthenticated controller", () => {
  let testApp: TestAgent;

  beforeAll(async () => {
    await primeApp(app);
    testApp = supertest(app);
    await waitUntilAppReady(testApp);
  });

  describe("GET /api/riot/public/user", () => {
    it("returns a list of users matching the query", async () => {
      const res = await testApp.get(`/api/riot/public/user?query=1ef`);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotPlayerDataShallow[]> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(Array.isArray(body.payload)).toBe(true);
        expect(body.payload.length).toBe(1);
        expect(
          body.payload.find((u) => u.riotTag === SEEDED_RIOT_TAG),
        ).toBeTruthy();
      }
    });

    it("returns an empty list when no user matches the query", async () => {
      const res = await testApp.get(`/api/riot/public/user?query=zzznomatchxx`);

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotPlayerDataShallow[]> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(Array.isArray(body.payload)).toBe(true);
        expect(body.payload.length).toBe(0);
      }
    });

    it("returns 400 when the query parameter is missing", async () => {
      const res = await testApp.get(`/api/riot/public/user`);

      expect(res.status).toBe(400);
    });

    it("returns 400 when the query parameter exceeds the max length", async () => {
      const tooLong = "a".repeat(25);
      const res = await testApp.get(`/api/riot/public/user?query=${tooLong}`);

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/riot/public/metrics", () => {
    it("returns counts of users, registered users, and matches", async () => {
      const res = await testApp.get(`/api/riot/public/metrics`);

      expect(res.status).toBe(200);

      const body: ApiDefault<MetricsDto> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(typeof body.payload.totalUsers).toBe("number");
        expect(typeof body.payload.registeredUsers).toBe("number");
        expect(typeof body.payload.totalMatches).toBe("number");
        expect(body.payload.totalUsers).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe("GET /api/riot/public/user/:puuid/matches", () => {
    it("returns enriched player data for the seeded user", async () => {
      const res = await testApp.get(
        `/api/riot/public/user/${SEEDED_PUUID}/matches`,
      );

      expect(res.status).toBe(200);

      const body: ApiDefault<RiotPlayerDataDetailed> = SJ.parse(res.text);

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload.puuid).toBe(SEEDED_PUUID);
        expect(body.payload.riotTag).toBe(SEEDED_RIOT_TAG);
        expect(Array.isArray(body.payload.matches)).toBe(true);
      }
    });

    it("returns 404 for a puuid that does not exist", async () => {
      const bogusPuuid = "00000000-0000-0000-0000-000000000000";
      const res = await testApp.get(
        `/api/riot/public/user/${bogusPuuid}/matches`,
      );

      expect(res.status).toBe(404);
    });

    it("returns 400 when the puuid is not a valid uuid", async () => {
      const res = await testApp.get(`/api/riot/public/user/not-a-uuid/matches`);

      expect(res.status).toBe(400);
    });
  });
});
