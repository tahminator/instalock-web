import { passthrough } from "@/lib/express";
import { Controller, GET, Middleware } from "@tahminator/sapling";
import express, { NextFunction, Request, Response } from "express";
import path from "path";

@Controller()
export class SpaMiddleware {
  private readonly plugin: ReturnType<typeof passthrough>;

  constructor() {
    this.plugin =
      process.env.NODE_ENV === "production"
        ? express.static(path.join(process.cwd(), "dist"))
        : passthrough();
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }

  @GET("'/{*any}'")
  loadSpa(_req: Request, res: Response) {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
  }
}
