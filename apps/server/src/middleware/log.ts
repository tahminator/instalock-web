import type { NextFunction, Request, Response } from "express";

import { Middleware, MiddlewareClass } from "@tahminator/sapling";
import morgan from "morgan";

import { passthrough } from "@/lib/express";

@MiddlewareClass()
export class LoggerMiddleware {
  private readonly plugin:
    | ReturnType<typeof morgan>
    | ReturnType<typeof passthrough>;

  constructor() {
    this.plugin =
      process.env.NODE_ENV !== "test" ? morgan("tiny") : passthrough();
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
