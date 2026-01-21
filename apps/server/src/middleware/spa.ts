import { Controller, GET, HttpStatus, Middleware } from "@tahminator/sapling";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

import { passthrough } from "@/lib/express";

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

  @GET(/^(?!\/api(?:\/|$))(?!.*\.[a-zA-Z0-9]+$).*$/)
  async loadSpa(_req: Request, res: Response) {
    const html = await fs.readFile(
      path.join(process.cwd(), "dist", "index.html"),
      "utf8",
    );
    res.status(HttpStatus.OK).send(html);
  }
}
