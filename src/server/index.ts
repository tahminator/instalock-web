import { type User, type Session, verifyRequestOrigin } from "lucia";
import express from "express";
import dotenv from "dotenv";
import { lucia } from "@/lib/server/auth";
import { apiRouter } from "@/server/api/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const originHeader = req.headers.origin ?? null;
  const hostHeader = req.headers.host ?? null;
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
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
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

const port = 3000;

const server = app.listen(port);

const serverMetadata = server.address() as { address: string; port: number };
console.log(
  `\n\nServer listening on http://${
    serverMetadata.address === "::" ? "127.0.0.1" : serverMetadata.address
  }:${port}`
);

declare global {
  // Gotta make it happy somehow
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }
  }
}
