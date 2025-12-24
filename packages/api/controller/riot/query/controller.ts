import { ResponseEntity } from "@tahminator/sapling";
import { Request, Response } from "express";

import { RiotMatchEnriched } from "../../../dto/RiotMatchEnriched";
import { RiotPlayerData } from "../../../dto/RiotPlayerData";
import { ApiDefault } from "../../../utils/api";
import { IBaseController } from "../../../utils/controller";

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
