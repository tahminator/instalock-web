import type { ApiDefault, Empty } from "@instalock/api";
import type { NextFunction, Request, Response } from "express";

import {
  HttpStatus,
  Middleware,
  MiddlewareClass,
  ResponseEntity,
} from "@tahminator/sapling";

@MiddlewareClass()
export class BaseErrorMiddleware {
  @Middleware()
  resolve(
    error: unknown,
    _request: Request,
    _response: Response,
    _next: NextFunction,
  ) {
    console.error("internal server error", error);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body({
      success: false,
      message: "internal server error",
    } satisfies ApiDefault<Empty>);
  }
}
