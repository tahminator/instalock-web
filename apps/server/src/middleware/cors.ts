import type { NextFunction, Request, Response } from "express";

import { TimedAll } from "@instalock/meter";
import { Middleware, MiddlewareClass } from "@tahminator/sapling";
import cors from "cors";

@MiddlewareClass()
@TimedAll()
export class CorsMiddleware {
  private readonly plugin: ReturnType<typeof cors>;

  constructor() {
    this.plugin = cors();
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
