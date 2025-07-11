import { sendSuperJson } from "@/lib/superjson-sender";
import { Router } from "express";

export const desktopRouterV1 = Router();

// TODO - Connect these to a database table so they can be modified at runtime with ease.
desktopRouterV1.get("/version", async (req, res) => {
  return sendSuperJson(req, res, 200, {
    success: true,
    message: "Latest Desktop client version - staging",
    payload: {
      version: "0.0.1b",
    },
  });
});
