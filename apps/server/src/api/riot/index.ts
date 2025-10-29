import { riotRouterV1 } from "@/api/riot/v1";
import { riotRouterV2 } from "@/api/riot/v2";
import { Router } from "express";

export const riotRouter = Router();

riotRouter.use("/v1", riotRouterV1);
riotRouter.use("/v2", riotRouterV2);
