import type { NextFunction, Request, Response } from "express";

import { Controller, Middleware } from "@tahminator/sapling";
import cookieParser from "cookie-parser";

@Controller()
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
