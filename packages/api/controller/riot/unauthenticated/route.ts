import { RouteObject } from "../../../utils/route";
import { IUnauthenticatedRiotController } from "./controller";
import { checkIdSchema, queryByRiotNameSchema } from "../../../zod";

export const UnauthenticatedRiotRouteObject = {
  getUserMatchesByPuuid: {
    path: (puuid: string) => `/api/riot/public/user/${puuid}/matches` as const,
    method: "GET",
    schema: {
      pathParams: checkIdSchema,
    },
  },
  getMetrics: {
    path: "/api/riot/public/metrics" as const,
    method: "GET",
  },
  getUsersListsSearchable: {
    path: "/api/riot/public/user" as const,
    method: "GET",
    schema: {
      queryParams: queryByRiotNameSchema,
    },
  },
} as const satisfies RouteObject<IUnauthenticatedRiotController>;
