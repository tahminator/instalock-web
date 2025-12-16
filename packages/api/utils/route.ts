import { z } from "zod";

export type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
export type Url = string;

export type Route = {
  path: string | ((...params: any[]) => string);
  method: Method;
  queryParams?: Record<string, string>;
  schema?: {
    queryParams?: z.ZodTypeAny;
    pathParams?: z.ZodTypeAny;
    requestBody?: z.ZodTypeAny;
  };
};

export type RouteObject<TController> = {
  [k in keyof TController]: Route;
};
