import { ResponseEntity } from "@tahminator/sapling";
import { Request, Response } from "express";

import { RiotPlayerDataDetailed } from "../../../dto/RiotPlayerDataDetailed";
import { RiotPlayerDataShallow } from "../../../dto/RiotPlayerDataShallow";
import { MetricsDto } from "../../../dto/UserMetricsDto";
import { ApiDefault } from "../../../utils/api";
import { IBaseController } from "../../../utils/controller";

export interface IRiotUnauthenticatedController extends IBaseController {
  getMetrics(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<MetricsDto>>>;

  getUsersShallow(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerDataShallow[]>>>;

  getRiotPlayerDataDetailedByPuuid(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerDataDetailed>>>;
}
