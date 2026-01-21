import type { NextFunction, Request, Response } from "express";

import { Controller, Middleware } from "@tahminator/sapling";

import { passthrough } from "@/lib/express";

const username = process.env.PROMETHEUS_USERNAME;
const password = process.env.PROMETHEUS_PASSWORD;

if (!username || !password) {
  throw new Error("PROMETHEUS_USERNAME and/or PROMETHEUS_PASSWORD is not set");
}

@Controller()
export class PrometheusAuthMiddleware {
  private readonly plugin: ReturnType<typeof passthrough>;

  constructor() {
    this.plugin = this.loadPlugin();
  }

  private loadPlugin(): ReturnType<typeof passthrough> {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.path !== "/api/metrics") {
        return next();
      }

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
        return res.status(401).send("Authentication required");
      }

      const base64Credentials = authHeader.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii",
      );
      const [u, p] = credentials.split(":");

      if (u === username && p === password) {
        return next();
      }

      res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
      return res.status(401).send("Invalid credentials");
    };
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
