import z from "zod";

import { UnwrapResponseEntity } from "../../../utils";
import { RouteObject } from "../../../utils/route";
import { checkIdSchema, queryByRiotNameSchema } from "../../../zod";
import { IRiotUnauthenticatedController } from "./controller";

export const RiotUnauthenticatedRouteObject = {
  getRiotPlayerDataDetailedByPuuid: {
    path: (puuid: string) => `/api/riot/public/user/${puuid}/matches` as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: checkIdSchema,
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<
          IRiotUnauthenticatedController["getRiotPlayerDataDetailedByPuuid"]
        >
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
  getUsersShallow: {
    path: "/api/riot/public/user" as const,
    method: "GET",
    schema: {
      /**
       * @apiNote q is required.
       */
      queryParams: queryByRiotNameSchema,
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotUnauthenticatedController["getUsersShallow"]>
      >,
  },
} as const satisfies RouteObject<IRiotUnauthenticatedController>;
