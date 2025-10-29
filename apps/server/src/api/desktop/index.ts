import { desktopRouterV1 } from "@/api/desktop/v1";
import { Router } from "express";

export const desktopRouter = Router();

desktopRouter.use("/v1", desktopRouterV1);
