import { Controller, Middleware } from "@tahminator/sapling";
import { NextFunction, Request, Response } from "express";
import promBundle from "express-prom-bundle";
import os from "node:os";
import * as promClient from "prom-client";

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
  private readonly cpuUsageGauge: promClient.Gauge<string>;
  private readonly memoryUsageGauge: promClient.Gauge<string>;
  private readonly memoryPercentageGauge: promClient.Gauge<string>;

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

    this.cpuUsageGauge = new promClient.Gauge({
      name: "node_cpu_usage_seconds_total",
      help: "Total user and system CPU time spent in seconds.",
      labelNames: ["type"],
    });

    this.memoryUsageGauge = new promClient.Gauge({
      name: "node_memory_usage_mb",
      help: "Node.js memory usage in MB.",
      labelNames: ["type"],
    });

    this.memoryPercentageGauge = new promClient.Gauge({
      name: "node_memory_usage_percentage",
      help: "Node.js memory usage as a percentage of total system memory or heap.",
      labelNames: ["type"],
    });

    this.startTracking();
  }

  private startTracking() {
    setInterval(() => {
      const cpuUsage = process.cpuUsage();
      this.cpuUsageGauge.set({ type: "user" }, cpuUsage.user / 1000000);
      this.cpuUsageGauge.set({ type: "system" }, cpuUsage.system / 1000000);

      const memUsage = process.memoryUsage();
      const totalMem = os.totalmem();

      this.memoryUsageGauge.set(
        { type: "rss" },
        Math.round(memUsage.rss / 1024 / 1024),
      );
      this.memoryUsageGauge.set(
        { type: "heapTotal" },
        Math.round(memUsage.heapTotal / 1024 / 1024),
      );
      this.memoryUsageGauge.set(
        { type: "heapUsed" },
        Math.round(memUsage.heapUsed / 1024 / 1024),
      );
      this.memoryUsageGauge.set(
        { type: "external" },
        Math.round(memUsage.external / 1024 / 1024),
      );

      this.memoryPercentageGauge.set(
        { type: "system_rss" },
        (memUsage.rss / totalMem) * 100,
      );
      this.memoryPercentageGauge.set(
        { type: "heap_used" },
        (memUsage.heapUsed / memUsage.heapTotal) * 100,
      );
    }, 10000);
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
