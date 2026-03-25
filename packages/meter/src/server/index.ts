import { createServer } from "http";
import { register, collectDefaultMetrics } from "prom-client";

export async function createStandaloneMetricServer({
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
      res.end("Not Found");
      return;
    }

    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
        res.writeHead(401);
        res.end("Authentication required");
        return;
      }

      const base64Credentials = authHeader.split(" ")[1];
      if (!base64Credentials) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
        res.writeHead(401);
        res.end("Invalid credentials");
        return;
      }

      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii",
      );
      const parts = credentials.split(":");

      if (parts.length !== 2 || !parts[0] || !parts[1]) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
        res.writeHead(401);
        res.end("Invalid credentials");
        return;
      }

      const [u, p] = parts;
      if (u !== username || p !== password) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Prometheus"');
        res.writeHead(401);
        res.end("Invalid credentials");
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
