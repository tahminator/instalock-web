import z from "zod";
import { RouteObject } from "../../../utils/route";
import { checkIdSchema } from "../../../zod";
import { IRiotQueryController } from "./controller";
import { UnwrapResponseEntity } from "../../../utils";

export const RiotQueryRouteObject = {
  getMyRiotDataShallow: {
    path: "/api/riot/query/me" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getMyRiotDataShallow"]>
      >,
  },
  getMyMatchesShallow: {
    path: "/api/riot/query/me/match" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getMyMatchesShallow"]>
      >,
  },
  getPlayerData: {
    path: (puuid: string) => `/api/riot/query/${puuid}` as const,
    method: "GET",
    schema: {
      pathParams: checkIdSchema,
      queryParams: z.undefined(),
      requestBody: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getPlayerData"]>
      >,
  },
  getMatch: {
    path: (matchId: string) => `/api/riot/query/me/match/${matchId}` as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: checkIdSchema,
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotQueryController["getMatch"]>
      >,
  },
} satisfies RouteObject<IRiotQueryController>;
