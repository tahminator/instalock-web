import { riotRouterV1 } from "@/api/riot/v1";
import { Router } from "express";

export const riotRouter = Router();

riotRouter.use("/v1", riotRouterV1);
