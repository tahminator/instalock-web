import { authRouterV1 } from "@/api/auth/v1";
import express from "express";

export const authRouter = express.Router();

authRouter.use("/v1", authRouterV1);
