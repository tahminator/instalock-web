import { SJ } from "@instalock/sj";
import { ErrorType, SuccessType } from "@instalock/types";
import { Request, Response } from "express";

type Success = Omit<SuccessType, "_debug">;

type Fail = Omit<ErrorType, "_debug">;

/**
 * A helper function that automatically stringifies via superjson,
 * as well as attaching a helpful _debug method in dev & test mode.
 */
export const sendSuperJson = (
  _req: Request,
  res: Response,
  statusCode: number = 200,
  object: Success | Fail,
  devTools?: Record<string, unknown> & { message: string },
) => {
  return res
    .status(statusCode)
    .contentType("application/json")
    .send(
      SJ.stringify(
        ["development", "test"].includes(process.env.NODE_ENV)
          ? { ...object, _debug: { ...devTools, date: new Date() } }
          : object,
      ),
    );
};
