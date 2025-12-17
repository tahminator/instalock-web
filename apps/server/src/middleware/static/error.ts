import SJ from "superjson";
import { ResponseStatusError } from "@tahminator/sapling";
import { Request, Response, NextFunction } from "express";

export type ErrorResponse = {
  success: boolean;
  message: string;
};

export class ErrorMiddleware {
  static responseStatusErrorMiddleware(
    err: ResponseStatusError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    res
      .status(err.status)
      .contentType("application/json")
      .send(
        SJ.stringify({
          success: false,
          message: err.message,
        }),
      );
  }

  static anyErrorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    console.error("[Error]", err);

    const status =
      typeof err === "object" && err !== null && "status" in err
        ? (err as any).status
        : 500;
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    res
      .status(status)
      .contentType("application/json")
      .send(
        SJ.stringify({
          success: false,
          message,
        }),
      );
  }
}
