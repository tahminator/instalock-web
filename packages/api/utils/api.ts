import { Prettify } from "./prettify";

export type SuccessType<T = unknown> = {
  success: true;
  message: string;
  payload: T;
};

export type ErrorType = {
  success: false;
  message: string;
};

/**
 * Default API standard response.
 * If you are in development, simply pass a debug object type.
 */
export type ApiDefault<T> = Prettify<SuccessType<T> | ErrorType>;
