import { Controller, Middleware } from "@tahminator/sapling";
import { NextFunction, Request, Response } from "express";
import promBundle from "express-prom-bundle";

const originalNormalize = promBundle.normalizePath;

const fileExtensions = [
  "html",
  "js",
  "json",
  "csv",
  "css",
  "png",
  "svg",
  "eot",
  "ttf",
  "woff",
  "appcache",
  "jpg",
  "jpeg",
  "gif",
  "ico",
  "txt",
  "webp",
];

@Controller()
export class PrometheusMiddleware {
  private readonly plugin: ReturnType<typeof promBundle>;

  constructor() {
    this.plugin = promBundle({
      includeMethod: true,
      includePath: true,
      metricsPath: "/api/metrics",
      normalizePath: (req, opts) => {
        const path = originalNormalize(req, opts);

        if (path.startsWith("/assets/")) {
          return "/assets/#val";
        }

        // hacky, but better to group them then fill up my metrics with garbage
        if (fileExtensions.find((ext) => path.includes(ext))) {
          return "/assets/static/#val";
        }

        return path;
      },
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
