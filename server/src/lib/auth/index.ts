import { db } from "@/lib/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "d"),
  sessionCookie: {
    attributes: {
      path: "/",
      // sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? ".parentlink.tahmid.io"
          : undefined,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      discordName: attributes.discordName,
      id: attributes.id,
    };
  },
});
