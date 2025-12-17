import { init } from "@instalock/fetcher";
import { Fetcher } from "@instalock/fetcher/types";
import { App } from "@instalock/ui";
import SJ from "superjson";

const fetcher: Fetcher = {
  api: {
    riot: {
      auth: {
        getMe: {
          fetcher: (route) => {
            return async (_) => {
              const response = await fetch(route.path, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        authenticate: {
          fetcher: (route) => {
            return async (params) => {
              const response = await fetch(route.path, {
                method: route.method,
                body: SJ.stringify(params.requestBody),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        logout: {
          fetcher: (route) => {
            return async (_) => {
              const response = await fetch(route.path, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
      },
      query: {
        getRiotMatchEnrichedByMatchId: {
          fetcher: (route) => {
            return async (params) => {
              const response = await fetch(route.path(params.pathParams), {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        getMyRiotMatchesEnriched: {
          fetcher: (route) => {
            return async (_) => {
              const response = await fetch(route.path, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        getMyRiotPlayerData: {
          fetcher: (route) => {
            return async (_) => {
              const response = await fetch(route.path, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        getRiotPlayerDataByPuuid: {
          fetcher: (route) => {
            return async (params) => {
              const response = await fetch(route.path(params.pathParams), {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
      },
      unauthenticated: {
        getMetrics: {
          fetcher: (route) => {
            return async (_) => {
              const response = await fetch(route.path, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        getRiotPlayerDataDetailedByPuuid: {
          fetcher: (route) => {
            return async (params) => {
              const response = await fetch(route.path(params.pathParams), {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
        getUsersShallow: {
          fetcher: (route) => {
            return async (params) => {
              const url = new URL(route.path, window.location.origin);

              Object.entries(params.queryParams).forEach(([k, v]) => {
                url.searchParams.append(k, v);
              });

              console.log(url.toString());

              const response = await fetch(url, {
                method: route.method,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              return route.fe(SJ.parse(await response.text()));
            };
          },
        },
      },
    },
  },
};

init(fetcher);

App.render();
