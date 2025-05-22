import { SJ } from "@instalock/sj";
import { ErrorType, SuccessType } from "@instalock/types";
import { Request, Response } from "express";

type Success = Omit<SuccessType, "_debug">;

type Fail = Omit<ErrorType, "_debug">;

/**
 * A helper function that automatically stringifies via superjson,
 * as well as attaching a helpful _debug method in dev & test mode.
 *
 * @param _req - The Express.js request method
 * @param res - The Express.js response method
 * @param statusCode - The response code
 * @param object - The payload of the response. It must be of type {UnknownApiResponse}
 * @param _debug - The _debug object. You may send anything in this object, but a message key is required. A date key is automatically attached to _debug which is a string of when the response was sent.
 */
export const sendSuperJson = (
  _req: Request,
  res: Response,
  statusCode: number = 200,
  object: Success | Fail,
  _debug?: Record<string, unknown> & { message: string },
) => {
  return res
    .status(statusCode)
    .contentType("application/json")
    .send(
      SJ.stringify(
        ["development", "test"].includes(process.env.NODE_ENV)
          ? { ...object, _debug: { ..._debug, date: new Date().toJSON() } }
          : object,
      ),
    );
};
