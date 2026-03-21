import { z } from "zod";

import type { RouteObject } from "../../../utils/route";
import type { UnwrapResponseEntity } from "../../../utils/unwrap";
import type { IRiotAuthController } from "./controller";

import { authModalSchema } from "../../../zod";

export const RiotAuthRouteObject = {
  getMe: {
    path: "/api/riot/auth" as const,
    method: "GET",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<ReturnType<IRiotAuthController["getMe"]>>,
  },
  authenticate: {
    path: "/api/riot/auth" as const,
    method: "POST",
    schema: {
      requestBody: authModalSchema,
      queryParams: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<
        ReturnType<IRiotAuthController["authenticate"]>
      >,
  },
  logout: {
    path: "/api/riot/auth" as const,
    method: "DELETE",
    schema: {
      queryParams: z.undefined(),
      requestBody: z.undefined(),
      pathParams: z.undefined(),
    },
    fe: (input) =>
      input as UnwrapResponseEntity<ReturnType<IRiotAuthController["logout"]>>,
  },
} as const satisfies RouteObject<IRiotAuthController>;
