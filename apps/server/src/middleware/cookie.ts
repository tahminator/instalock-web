import type { NextFunction, Request, Response } from "express";

import { TimedAll } from "@instalock/meter";
import { Middleware, MiddlewareClass } from "@tahminator/sapling";
import cookieParser from "cookie-parser";

@MiddlewareClass()
@TimedAll()
export class CookieParserMiddleware {
  private readonly plugin: ReturnType<typeof cookieParser>;

  constructor() {
    this.plugin = cookieParser();
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
