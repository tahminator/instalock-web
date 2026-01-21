import { Controller, Middleware } from "@tahminator/sapling";
import { NextFunction, Request, Response } from "express";
import promBundle from "express-prom-bundle";

@Controller()
export class PrometheusMiddleware {
  private readonly plugin: ReturnType<typeof promBundle>;

  constructor() {
    this.plugin = promBundle({
      includeMethod: true,
      includePath: true,
      metricsPath: "/api/metrics",
      promClient: {
        collectDefaultMetrics: {},
      },
    });
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
