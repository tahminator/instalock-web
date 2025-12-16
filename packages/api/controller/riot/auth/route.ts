import { RouteObject } from "../../../utils/route";
import { authModalSchema } from "../../../zod";
import { IRiotAuthController } from "./controller";

export const RiotAuthRouteObject = {
  getMe: {
    path: "/api/riot/auth" as const,
    method: "GET",
  },
  authenticate: {
    path: "/api/riot/auth" as const,
    method: "POST",
    schema: {
      requestBody: authModalSchema,
    },
  },
  logout: {
    path: "/api/riot/auth" as const,
    method: "DELETE",
  },
} as const satisfies RouteObject<IRiotAuthController>;
