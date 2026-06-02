import type { ApiDefault, Empty } from "@instalock/api";
import type { NextFunction, Request, Response } from "express";

import {
  Middleware,
  MiddlewareClass,
  ParserError,
  ResponseEntity,
} from "@tahminator/sapling";

import { ZodParserError } from "@/error/parser";

@MiddlewareClass()
export class ParserErrorMiddleware {
  @Middleware()
  resolve(
    error: unknown,
    _request: Request,
    _response: Response,
    next: NextFunction,
  ) {
    if (error instanceof ZodParserError || error instanceof ParserError) {
      return ResponseEntity.status(error.status).body({
        success: false,
        message: error.message,
      } satisfies ApiDefault<Empty>);
    }

    next(error);
  }
}
