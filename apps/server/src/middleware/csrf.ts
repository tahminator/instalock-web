import type { NextFunction, Request, Response } from "express";

import { TimedAll } from "@instalock/meter";
import { Middleware, MiddlewareClass } from "@tahminator/sapling";

import type { passthrough } from "@/lib/express";

@MiddlewareClass()
@TimedAll()
export class CsrfMiddleware {
  private readonly plugin: ReturnType<typeof passthrough>;

  constructor() {
    this.plugin = (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (request.method === "GET") {
        return next();
      }

      // The code below is commented out due to the upcoming desktop client (doesn't play nice
      // with CSRF)

      // if (
      //   process.env.NODE_ENV === "development" ||
      //   process.env.NODE_ENV == "test"
      // ) {
      //   return next();
      // }
      // const originHeader = request.headers.origin;
      // const hostHeader = request.headers.host;
      //
      // if (
      //   !originHeader ||
      //   !hostHeader ||
      //   !verifyRequestOrigin(originHeader, [hostHeader])
      // ) {
      //   return response.status(403).end();
      // }
      return next();
    };
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
