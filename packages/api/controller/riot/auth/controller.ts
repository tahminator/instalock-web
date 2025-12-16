import { Request, Response } from "express";
import { AuthenticationObjectDto } from "../../../dto/AuthenticationObjectDto";
import { ApiDefault } from "../../../utils/api";
import { IBaseController } from "../../../utils/controller";
import { Empty } from "../../../utils/empty";
import { ResponseEntity } from "@tahminator/sapling";

export interface IRiotAuthController extends IBaseController {
  getMe(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<AuthenticationObjectDto>>>;

  authenticate(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<Empty>>>;

  logout(
    request: Request,
    response: Response,
  ): Promise<ResponseEntity<ApiDefault<Empty>>>;
}
