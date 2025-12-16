import { RiotPlayerData } from "../../../dto/RiotPlayerData";
import { RiotMatchDetailed } from "../../../dto/RiotMatchShallow";
import { ApiDefault } from "../../../utils/api";
import { IBaseController } from "../../../utils/controller";
import { Request, Response } from "express";
import { ResponseEntity } from "@tahminator/sapling";

export interface IRiotQueryController extends IBaseController {
  getMyRiotDataShallow(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerData>>>;

  getMyMatchesShallow(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotMatchDetailed[]>>>;

  getMatchShallow(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotMatchDetailed>>>;

  getPlayerData(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<RiotPlayerData>>>;
}
