import { findUserById } from "@/lib/db/function/user";
import { sendSuperJson } from "@/lib/superjson-sender";
import { attempt } from "@instalock/attempt";
import { Router } from "express";

export const riotRouterV1 = Router();

riotRouterV1.get("/@me", async (req, res) => {
  if (!res.locals.user || !res.locals.session) {
    return sendSuperJson(req, res, 401, {
      success: false,
      message: "You are not logged in.",
    });
  }

  const [userError, user] = await attempt(
    findUserById({ id: res.locals.user.id })
  );

  if (userError || !user) {
    return sendSuperJson(
      req,
      res,
      500,
      {
        success: false,
        message: "Internal server error.",
      },
      {
        message: "This should not be happening. Check data object.",
        data: { error: userError, user },
      }
    );
  }

  const { riotAuth, riotEntitlement } = user;

  if (!riotAuth || !riotEntitlement) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated.",
    });
  }

  const riotRes = await fetch("https://auth.riotgames.com/userinfo", {
    headers: {
      Authorization: `Bearer ${riotAuth}`,
      "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
      "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",
    },
  });

  if (!riotRes.ok) {
    return sendSuperJson(req, res, 400, {
      success: false,
      message: "Not authenticated.",
    });
  }

  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Authenticated.",
    data: { authToken: riotAuth, entitlement: riotEntitlement },
  });
});
