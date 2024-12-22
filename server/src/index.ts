import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { superjsonMiddleware } from "@/middleware/superjson";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "@/lib/auth";
import { apiRouter } from "@/api";
import path from "path";

dotenv.config();
let port = 3050;

export const app = express();

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
