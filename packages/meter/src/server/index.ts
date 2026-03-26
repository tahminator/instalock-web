import { createServer } from "http";
import { register, collectDefaultMetrics } from "prom-client";

import { MetricsUtils } from "./utils";

/**
 * Server-Side Metrics
 */
export class SSM {
  static Utils = MetricsUtils;

  /**
   * Create a basic server using the `http` lib that will have the following:
   *
   * - `/` returns body of `ok` once server is healthy and alive.
   * - `/api/metrics` returns prometheus metrics. This route is protected with Basic Auth.
   */
  static async createStandaloneMetricServer({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    collectDefaultMetrics();

    return createServer(async (req, res) => {
      if (req.url === "/") {
        res.writeHead(200);
        res.end("ok");
        return;
      }

      if (req.url !== "/api/metrics") {
        res.writeHead(404);
        res.end("not found");
        return;
      }

      try {
        const authHeader = req.headers.authorization;
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');

        if (!authHeader || !authHeader.startsWith("Basic ")) {
          res.writeHead(401);
          res.end("authentication required");
          return;
        }

        const base64Credentials = authHeader.split(" ")[1];
        if (!base64Credentials) {
          res.writeHead(401);
          res.end("invalid credentials");
          return;
        }

        const credentials = Buffer.from(base64Credentials, "base64").toString(
          "ascii",
        );
        const parts = credentials.split(":");

        if (parts.length !== 2 || !parts[0] || !parts[1]) {
          res.writeHead(401);
          res.end("invalid credentials");
          return;
        }

        const [u, p] = parts;
        if (u !== username || p !== password) {
          res.writeHead(401);
          res.end("invalid credentials");
          return;
        }

        res.setHeader("Content-Type", register.contentType);

        const metrics = await register.metrics();

        res.writeHead(200);
        res.end(metrics);
        return;
      } catch (err) {
        res.writeHead(500);
        res.end((err as Error).message);
      }
    });
  }
}
