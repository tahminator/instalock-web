import { discord, lucia } from "@/lib/server/auth";
import { generateState } from "arctic";
import { parseCookies, serializeCookie } from "oslo/cookie";
import express from "express";
import { OAuth } from "@/lib/server/types/discord/oauth";
import { db } from "@/lib/server/db/init";
import { generateId } from "lucia";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const authRouter = express.Router();

authRouter.get("/discord", async (_, res) => {
  const state = generateState();
  const url = await discord.createAuthorizationURL(state, {
    scopes: ["identify"],
  });

  res
    .appendHeader(
      "Set-Cookie",
      serializeCookie("discord_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      })
    )
    .redirect(url.toString());
});

authRouter.get("/discord/callback", async (req, res) => {
  const code = req.query.code?.toString() ?? null;
  const state = req.query.state?.toString() ?? null;
  const storedState =
    parseCookies(req.headers.cookie ?? "").get("discord_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    console.log(code, state, storedState);
    res.status(400).end();
    return;
  }
  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user: OAuth = await response.json();

    const existingUser = await db.user.findFirst({
      where: {
        discordId: user.id,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      return res
        .appendHeader(
          "Set-Cookie",
          lucia.createSessionCookie(session.id).serialize()
        )
        .json({
          success: true,
          message: "You have been successfully logged in",
        });
    }

    const userId = generateId(15);
    await db.user.create({
      data: {
        id: userId,
        discordId: user.id,
        username: user.username,
        avatar: user.avatar,
      },
    });

    const session = await lucia.createSession(userId, {});
    return res
      .appendHeader(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      )
      .redirect("/");
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
      // invalid code
      return res.status(400).json({
        success: false,
        message: "Failed to log in",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to log in",
    });
  }
});
