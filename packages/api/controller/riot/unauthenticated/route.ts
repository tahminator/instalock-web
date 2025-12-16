import { RouteObject } from "../../../utils/route";
import { IRiotUnauthenticatedController } from "./controller";
import { checkIdSchema, queryByRiotNameSchema } from "../../../zod";
import z from "zod";
import { UnwrapResponseEntity } from "../../../utils";

export const RiotUnauthenticatedRouteObject = {
  getUserMatchesByPuuid: {
    path: (puuid: string) => `/api/riot/public/user/${puuid}/matches` as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: checkIdSchema,
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotUnauthenticatedController["getUserMatchesByPuuid"]>
      >,
  },
  getMetrics: {
    path: "/api/riot/public/metrics" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotUnauthenticatedController["getMetrics"]>
      >,
  },
  getUsersListsSearchable: {
    path: "/api/riot/public/user" as const,
    method: "GET",
    schema: {
      queryParams: queryByRiotNameSchema,
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotUnauthenticatedController["getUsersListsSearchable"]>
      >,
  },
} as const satisfies RouteObject<IRiotUnauthenticatedController>;
