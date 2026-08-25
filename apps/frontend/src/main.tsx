import type { Fetcher } from "@instalock/fetcher/types";

import { ApiURL, init } from "@instalock/fetcher";
import { Location } from "@instalock/fetcher/types";
import { App } from "@instalock/ui";

import type { Impl } from "../../../packages/riot/types";

import { changeRiotClientImpl } from "../../../packages/riot";

if (import.meta.env.DEV) {
  changeRiotClientImpl((import.meta.env.RIOT_API ?? "real") as Impl);
}

const fetcher: Fetcher = {
  api: {
    riot: {
      auth: {
        getMe: {
          fetcher: async (_schema) => {
            const { url, method, res } = ApiURL.create("/api/riot/auth", {
              method: "GET",
            });
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        authenticate: {
          fetcher: async (schema) => {
            const { url, method, req, res } = ApiURL.create("/api/riot/auth", {
              method: "POST",
            });
            const response = await fetch(url, {
              method,
              headers: { "Content-Type": "application/json" },
              body: req(schema.requestBody),
            });
            return res(await response.json());
          },
        },
        logout: {
          fetcher: async (_schema) => {
            const { url, method, res } = ApiURL.create("/api/riot/auth", {
              method: "DELETE",
            });
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
      },
      query: {
        getMyRiotPlayerData: {
          fetcher: async (_schema) => {
            const { url, method, res } = ApiURL.create("/api/riot/query/me", {
              method: "GET",
            });
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        getMyRiotMatchesEnriched: {
          fetcher: async (_schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/query/me/match",
              { method: "GET" },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        getRiotPlayerDataByPuuid: {
          fetcher: async (schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/query/{puuid}",
              { method: "GET", params: schema.pathParams },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        getRiotMatchEnrichedByMatchId: {
          fetcher: async (schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/query/me/match/{matchId}",
              { method: "GET", params: schema.pathParams },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
      },
      unauthenticated: {
        getMetrics: {
          fetcher: async (_schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/public/metrics",
              { method: "GET" },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        getUsersShallow: {
          fetcher: async (schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/public/user",
              { method: "GET", queries: schema.queryParams },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
        getRiotPlayerDataDetailedByPuuid: {
          fetcher: async (schema) => {
            const { url, method, res } = ApiURL.create(
              "/api/riot/public/user/{puuid}/matches",
              { method: "GET", params: schema.pathParams },
            );
            const response = await fetch(url, { method });
            return res(await response.json());
          },
        },
      },
    },
  },
};

init(fetcher, Location.WEB);

App.render();
