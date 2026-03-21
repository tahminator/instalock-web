import type { ResponseEntity } from "@tahminator/sapling";
import type { Request, Response } from "express";

import type { RiotMatchEnriched } from "../../../dto/RiotMatchEnriched";
import type { RiotPlayerData } from "../../../dto/RiotPlayerData";
import type { ApiDefault } from "../../../utils/api";
import type { IBaseController } from "../../../utils/controller";

export interface IRiotQueryController extends IBaseController {
  getMyRiotPlayerData(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerData>>>;

  getMyRiotMatchesEnriched(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotMatchEnriched[]>>>;

  getRiotMatchEnrichedByMatchId(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotMatchEnriched>>>;

  getRiotPlayerDataByPuuid(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerData>>>;
}
