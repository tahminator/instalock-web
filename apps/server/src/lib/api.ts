import { z } from "zod";

export type Empty = Record<never, never>;

export type SuccessType<T = unknown> = {
  success: true;
  message: string;
  payload: T;
};

export type ErrorType = {
  success: false;
  message: string;
};

export type ApiDefault<T> = SuccessType<T> | ErrorType;

/** The zod counterpart to {@link SuccessType} -- wraps a payload schema in the `{ success, message, payload }` envelope every endpoint responds with. */
export function successResponseBody<TPayload extends z.ZodTypeAny>(
  payload: TPayload,
) {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    payload,
  });
}

/** The zod counterpart to {@link ErrorType} -- the `{ success, message }` envelope error middleware responds with. */
export const errorResponseBody = z.object({
  success: z.literal(false),
  message: z.string(),
});
