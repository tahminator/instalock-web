import { Controller, Middleware } from "@tahminator/sapling";
import { NextFunction, Request, Response } from "express";
import cors from "cors";

@Controller()
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
