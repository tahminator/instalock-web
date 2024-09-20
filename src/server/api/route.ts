import { authRouter } from "@/server/api/auth/v1/route";
import express from "express";

export const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  return res.status(200).json({ status: true, message: "Hello, world!" });
});

apiRouter.use("/auth", authRouter);
