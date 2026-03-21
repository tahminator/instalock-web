import type { ResponseEntity } from "@tahminator/sapling";
import type { Request, Response } from "express";

import type { RiotPlayerDataDetailed } from "../../../dto/RiotPlayerDataDetailed";
import type { RiotPlayerDataShallow } from "../../../dto/RiotPlayerDataShallow";
import type { MetricsDto } from "../../../dto/UserMetricsDto";
import type { ApiDefault } from "../../../utils/api";
import type { IBaseController } from "../../../utils/controller";

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
