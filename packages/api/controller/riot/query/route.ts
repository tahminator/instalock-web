import { RouteObject } from "../../../utils/route";
import { checkIdSchema } from "../../../zod";
import { IRiotQueryController } from "./controller";

export const RiotQueryRouteObject = {
  getMyRiotDataShallow: {
    path: "/api/riot/query/me" as const,
    method: "GET",
  },
  getMyMatchesShallow: {
    path: "/api/riot/query/me/match" as const,
    method: "GET",
  },
  getPlayerData: {
    path: (puuid: string) => `/api/riot/query/${puuid}` as const,
    method: "GET",
    schema: {
      pathParams: checkIdSchema,
    },
  },
  getMatchShallow: {
    path: (matchId: string) => `/api/riot/query/me/match/${matchId}` as const,
    method: "GET",
    schema: {
      pathParams: checkIdSchema,
    },
  },
} satisfies RouteObject<IRiotQueryController>;
