import z from "zod";
import { RouteObject } from "../../../utils/route";
import { checkIdSchema } from "../../../zod";
import { IRiotQueryController } from "./controller";
import { UnwrapResponseEntity } from "../../../utils";

export const RiotQueryRouteObject = {
  getMyRiotPlayerData: {
    path: "/api/riot/query/me" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getMyRiotPlayerData"]>
      >,
  },
  getMyRiotMatchesEnriched: {
    path: "/api/riot/query/me/match" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getMyRiotMatchesEnriched"]>
      >,
  },
  getRiotPlayerDataByPuuid: {
    path: (puuid: string) => `/api/riot/query/${puuid}` as const,
    method: "GET",
    schema: {
      pathParams: checkIdSchema,
      queryParams: z.undefined(),
      requestBody: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getRiotPlayerDataByPuuid"]>
      >,
  },
  getRiotMatchEnrichedByMatchId: {
    path: (matchId: string) => `/api/riot/query/me/match/${matchId}` as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: checkIdSchema,
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getRiotMatchEnrichedByMatchId"]>
      >,
  },
} satisfies RouteObject<IRiotQueryController>;
