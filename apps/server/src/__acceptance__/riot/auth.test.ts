import type { ApiDefault } from "@instalock/api";
import type { Session, User } from "@instalock/db";
import type TestAgent from "supertest/lib/agent";

import SJ from "superjson";
import supertest from "supertest";

import {
  primeApp,
  reseedSession,
  reseedUserRiotCredentials,
  waitUntilAppReady,
} from "@/__acceptance__/utils";

import { app } from "../../index";
import {
  AUTHED_PUUID,
  AUTHED_RIOT_TAG,
  AUTHED_SESSION_COOKIE,
  AUTHED_SESSION_ID,
  LOGOUT_PUUID,
  LOGOUT_SESSION_COOKIE,
  LOGOUT_SESSION_ID,
  SESSION_COOKIE,
} from "../const";

describe("auth controller", () => {
  let testApp: TestAgent;

  beforeAll(async () => {
    await primeApp(app);
    testApp = supertest(app);
    await waitUntilAppReady(testApp);
  });

  describe("GET /api/riot/auth", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.get(`/api/riot/auth`);

      expect(res.status).toBe(401);
    });

    it("returns 401 when the user has no riot credentials stored", async () => {
      const res = await testApp
        .get(`/api/riot/auth`)
        .set("Cookie", SESSION_COOKIE);

      expect(res.status).toBe(401);
    });

    it("returns the authenticated user and session for a user with riot credentials", async () => {
      const res = await testApp
        .get(`/api/riot/auth`)
        .set("Cookie", AUTHED_SESSION_COOKIE);

      expect(res.status).toBe(200);

      const body: ApiDefault<{ user: User; session: Session }> = SJ.parse(
        res.text,
      );

      expect(body.success).toBe(true);

      if (body.success) {
        expect(body.payload.user.puuid).toBe(AUTHED_PUUID);
        expect(body.payload.user.riotTag).toBe(AUTHED_RIOT_TAG);
        expect(body.payload.user.riotAuth).not.toBeNull();
        expect(body.payload.user.riotEntitlement).not.toBeNull();
        expect(body.payload.session.id).toBe(AUTHED_SESSION_ID);
        expect(body.payload.session.userId).toBe(AUTHED_PUUID);
      }
    });
  });

  describe("POST /api/riot/auth", () => {
    it("returns 400 when the url does not start with the playvalorant.com origin", async () => {
      const res = await testApp
        .post(`/api/riot/auth`)
        .set("Content-Type", "application/json")
        .send(SJ.stringify({ url: "https://example.com/redirect" }));

      expect(res.status).toBe(400);
    });

    it("returns 400 when the url has no access_token in the fragment", async () => {
      const res = await testApp
        .post(`/api/riot/auth`)
        .set("Content-Type", "application/json")
        .send(SJ.stringify({ url: "https://playvalorant.com/opt_in#" }));

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /api/riot/auth", () => {
    it("returns 401 when no session cookie is sent", async () => {
      const res = await testApp.delete(`/api/riot/auth`);

      expect(res.status).toBe(401);
    });

    it("clears the riot credentials, invalidates the session, and emits a blank cookie", async () => {
      // logout is destructive — re-seed credentials + session so this test is idempotent
      await reseedUserRiotCredentials(LOGOUT_PUUID);
      await reseedSession(LOGOUT_SESSION_ID, LOGOUT_PUUID);

      const res = await testApp
        .delete(`/api/riot/auth`)
        .set("Cookie", LOGOUT_SESSION_COOKIE);

      expect(res.status).toBe(200);

      const setCookie = res.headers["set-cookie"];
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      expect(
        cookies.some(
          (c) => typeof c === "string" && c.includes("auth_session="),
        ),
      ).toBe(true);

      const followup = await testApp
        .get(`/api/riot/auth`)
        .set("Cookie", LOGOUT_SESSION_COOKIE);

      expect(followup.status).toBe(401);
    });
  });
});
