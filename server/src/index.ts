import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { superjsonMiddleware } from "@/middleware/superjson";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "@/lib/auth";
import { apiRouter } from "@/api";
import path from "path";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "@/lib/redis";
import { sendSuperJson } from "@/lib/superjson-sender";

dotenv.config();
let port = 3050;

export const app = express();

app.set('trust proxy', 1 /* number of proxies between user and server */)

// TODO - Might have to adjust these values, let's see.
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 120, // 100 req/IP per 1 minute (~2 req/s is insane and should not be hit.)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Redis store configuration
    store: new RedisStore({
      // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
      sendCommand: (...args: string[]) => redis.call(...args),
    }),
    handler: (req, res) => {
      return sendSuperJson(req, res, 429, {
        success: false,
        message:
          "You have been rate limited (sending too many requests). Please try again later.",
      });
    },
  })
);

app.use(cookieParser());
app.use(superjsonMiddleware);
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

app.use((req, res, next) => {
  if (req.method === "GET") {
    return next();
  }

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV == "test"
  ) {
    return next();
  }
  const originHeader = req.headers.origin;
  const hostHeader = req.headers.host;

  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return res.status(403).end();
  }
  return next();
});

app.use(async (req, res, next) => {
  const cookie = req.headers.cookie;
  const sessionId = lucia.readSessionCookie(cookie ?? "");

  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }
  if (!session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  res.locals.session = session;
  res.locals.user = user;
  return next();
});

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

const server = app.listen(port);

try {
  const serverMetadata = server.address() as { address: string; port: number };
  console.log(
    `\n\nServer listening on http://${
      serverMetadata.address === "::" ? "127.0.0.1" : serverMetadata.address
    }:${serverMetadata.port}`
  );
} catch (e) {
  console.error(e);
}
