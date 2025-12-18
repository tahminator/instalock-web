import express from "express";
import { Class, Sapling } from "@tahminator/sapling";
import { RiotAuthController } from "@/controller/riot/auth/controller";
import { ErrorMiddleware } from "@/middleware/static/error";
import { AuthMiddleware } from "@/middleware/auth";
import { RateLimiterMiddleware } from "@/middleware/limit";
import { SpaMiddleware } from "@/middleware/spa";
import { RiotUnauthenticatedController } from "@/controller/riot/unauthenticated/controller";
import { RiotQueryController } from "@/controller/riot/query/controller";
import { CorsMiddleware } from "@/middleware/cors";
import { CookieParserMiddleware } from "@/middleware/cookie";
import { CsrfMiddleware } from "@/middleware/csrf";
import SJ from "superjson";

const port = 3050;

export const app = express();

app.set("trust proxy", 1 /* number of proxies between user and server */);

Sapling.setSerializeFn(SJ.stringify);
Sapling.setDeserializeFn(SJ.parse);
Sapling.registerApp(app);

const middlewares: Class<any>[] = [
  CookieParserMiddleware,
  CorsMiddleware,
  CsrfMiddleware,
  RateLimiterMiddleware,
  AuthMiddleware,
  SpaMiddleware,
];
middlewares.map(Sapling.resolve).forEach((r) => app.use(r));

const controllers: Class<any>[] = [
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
