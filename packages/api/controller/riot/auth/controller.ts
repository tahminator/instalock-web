import type { ResponseEntity } from "@tahminator/sapling";
import type { Request, Response } from "express";

import type { AuthenticationObjectDto } from "../../../dto/AuthenticationObjectDto";
import type { ApiDefault } from "../../../utils/api";
import type { IBaseController } from "../../../utils/controller";
import type { Empty } from "../../../utils/empty";

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
