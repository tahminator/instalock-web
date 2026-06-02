import type { ApiDefault, Empty } from "@instalock/api";
import type { NextFunction, Request, Response } from "express";

import {
  Middleware,
  MiddlewareClass,
  ResponseEntity,
  ResponseStatusError,
} from "@tahminator/sapling";

@MiddlewareClass()
export class ResponseStatusErrorMiddleware {
  @Middleware()
  resolve(
    error: unknown,
    _request: Request,
    _response: Response,
    next: NextFunction,
  ) {
    if (error instanceof ResponseStatusError) {
      return ResponseEntity.status(error.status).body({
        success: false,
        message: error.message,
      } satisfies ApiDefault<Empty>);
    }

    next(error);
  }
}
