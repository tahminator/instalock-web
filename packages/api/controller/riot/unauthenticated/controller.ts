import { Request, Response } from "express";
import { IBaseController } from "../../../utils/controller";
import { MetricsDto } from "../../../dto/UserMetricsDto";
import { ApiDefault } from "../../../utils/api";
import { RiotPlayerDataShallow } from "../../../dto/RiotPlayerDataShallow";
import { ResponseEntity } from "@tahminator/sapling";
import { RiotPlayerDataDetailed } from "../../../dto/RiotPlayerDataDetailed";

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
