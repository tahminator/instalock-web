import { NextFunction, Request, Response } from "express";

export function passthrough() {
  return function ($1: Request, $2: Response, $3: NextFunction) {
    $3();
  };
}
