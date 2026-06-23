// this must be first
import "@instalock/log";

import type { Impl } from "@instalock/riot/types";
import type { Class } from "@tahminator/sapling";

import { changeRiotClientImpl } from "@instalock/riot";

export { changeRiotClientImpl };
import { DefaultHealthMiddleware, Sapling } from "@tahminator/sapling";
import express from "express";
import SJ from "superjson";

import { getControllers } from "@/bootstrap";
import { AuthMiddleware } from "@/middleware/auth";
import { CookieParserMiddleware } from "@/middleware/cookie";
import { CorsMiddleware } from "@/middleware/cors";
import { CsrfMiddleware } from "@/middleware/csrf";
import { BaseErrorMiddleware } from "@/middleware/error/base";
import { ParserErrorMiddleware } from "@/middleware/error/parser";
import { ResponseStatusErrorMiddleware } from "@/middleware/error/responsestatus";
import { RateLimiterMiddleware } from "@/middleware/limit";
import { PrometheusMiddleware } from "@/middleware/prom";
import { MetricsRegistrarMiddleware } from "@/middleware/prom/metric";
import { SpaMiddleware } from "@/middleware/spa";

const port = 3050;

Sapling.setSerializeFn(SJ.stringify);
Sapling.setDeserializeFn(SJ.parse);
export const app = Sapling.registerApp(express());

if (process.env.NODE_ENV === "development") {
  changeRiotClientImpl((process.env.RIOT_API ?? "real") as Impl);
}

app.set("trust proxy", 1 /* number of proxies between user and server */);

const middlewares: Class<unknown>[] = [
  CookieParserMiddleware,
  CorsMiddleware,
  CsrfMiddleware,
  DefaultHealthMiddleware,
  PrometheusMiddleware,
  MetricsRegistrarMiddleware,
  RateLimiterMiddleware,
  AuthMiddleware,
  SpaMiddleware,
];
middlewares.map(Sapling.resolve).forEach((r) => app.use(r));

const controllers = getControllers();
console.log(`${controllers.length} controllers resolved`);
controllers.map(Sapling.resolve).forEach((r) => app.use(r));

const errorMiddlewares: Class<unknown>[] = [
  ParserErrorMiddleware,
  ResponseStatusErrorMiddleware,
  BaseErrorMiddleware,
];
errorMiddlewares.map(Sapling.resolve).forEach((r) => app.use(r));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log("Server is ready.");
  });
}
