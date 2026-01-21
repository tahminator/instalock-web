import { Class, Sapling } from "@tahminator/sapling";
import express from "express";
import SJ from "superjson";

import { RiotAuthController } from "@/controller/riot/auth/controller";
import { RiotQueryController } from "@/controller/riot/query/controller";
import { RiotUnauthenticatedController } from "@/controller/riot/unauthenticated/controller";
import { AuthMiddleware } from "@/middleware/auth";
import { CookieParserMiddleware } from "@/middleware/cookie";
import { CorsMiddleware } from "@/middleware/cors";
import { CsrfMiddleware } from "@/middleware/csrf";
import { RateLimiterMiddleware } from "@/middleware/limit";
import { SpaMiddleware } from "@/middleware/spa";
import { ErrorMiddleware } from "@/middleware/static/error";
import { PrometheusMiddleware } from "@/middleware/prom";
import { PrometheusAuthMiddleware } from "@/middleware/prom/auth";

const port = 3050;

export const app = express();

app.set("trust proxy", 1 /* number of proxies between user and server */);

Sapling.setSerializeFn(SJ.stringify);
Sapling.setDeserializeFn(SJ.parse);
Sapling.registerApp(app);

const middlewares: Class<unknown>[] = [
  CookieParserMiddleware,
  CorsMiddleware,
  CsrfMiddleware,
  PrometheusAuthMiddleware,
  PrometheusMiddleware,
  RateLimiterMiddleware,
  AuthMiddleware,
  SpaMiddleware,
];
middlewares.map(Sapling.resolve).forEach((r) => app.use(r));

const controllers: Class<unknown>[] = [
  RiotAuthController,
  RiotUnauthenticatedController,
  RiotQueryController,
];
controllers.map(Sapling.resolve).forEach((r) => app.use(r));

Sapling.loadResponseStatusErrorMiddleware(
  app,
  ErrorMiddleware.responseStatusErrorMiddleware,
);
app.use(ErrorMiddleware.anyErrorMiddleware);

app.listen(port, "0.0.0.0");
