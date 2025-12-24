import { z } from "zod";

import { RouteObject } from "../../../utils/route";
import { UnwrapResponseEntity } from "../../../utils/unwrap";
import { authModalSchema } from "../../../zod";
import { IRiotAuthController } from "./controller";

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
