import { z } from "zod";
import { IBaseController } from "./controller";
import { UnwrapResponseEntity } from "./unwrap";

export type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
export type Url = string;

export type Route<TController, K extends keyof TController> = {
  path: string | ((...params: any[]) => string);
  method: Method;
  queryParams?: Record<string, string>;
  schema: {
    queryParams: z.ZodTypeAny;
    pathParams?: z.ZodTypeAny;
    requestBody?: z.ZodTypeAny;
  };
  fe: (
    input: unknown,
  ) => TController[K] extends (...args: any[]) => any
    ? UnwrapResponseEntity<ReturnType<TController[K]>>
    : never;
};

export type RouteObject<TController extends IBaseController> = {
  [K in keyof TController]: Route<TController, K>;
};
