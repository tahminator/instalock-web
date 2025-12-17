import {
  IRiotAuthController,
  IRiotQueryController,
  IRiotUnauthenticatedController,
  RiotAuthRouteObject,
  RiotQueryRouteObject,
  RiotUnauthenticatedRouteObject,
} from "@instalock/api";
import {
  InferSchemaTypes,
  UnwrapResponseEntity,
} from "@instalock/api/utils/unwrap";

export type Fetcher = {
  api: {
    riot: {
      auth: {
        [K in keyof typeof RiotAuthRouteObject]: K extends keyof IRiotAuthController
          ? {
              fetcher: (
                route: (typeof RiotAuthRouteObject)[K],
              ) => (
                schema: InferSchemaTypes<
                  (typeof RiotAuthRouteObject)[K]["schema"]
                >,
              ) => Promise<
                UnwrapResponseEntity<ReturnType<IRiotAuthController[K]>>
              >;
            }
          : never;
      };
      query: {
        [K in keyof typeof RiotQueryRouteObject]: K extends keyof IRiotQueryController
          ? {
              fetcher: (
                route: (typeof RiotQueryRouteObject)[K],
              ) => (
                schema: InferSchemaTypes<
                  (typeof RiotQueryRouteObject)[K]["schema"]
                >,
              ) => Promise<
                UnwrapResponseEntity<ReturnType<IRiotQueryController[K]>>
              >;
            }
          : never;
      };
      unauthenticated: {
        [K in keyof typeof RiotUnauthenticatedRouteObject]: K extends keyof IRiotUnauthenticatedController
          ? {
              fetcher: (
                route: (typeof RiotUnauthenticatedRouteObject)[K],
              ) => (
                schema: InferSchemaTypes<
                  (typeof RiotUnauthenticatedRouteObject)[K]["schema"]
                >,
              ) => Promise<
                UnwrapResponseEntity<
                  ReturnType<IRiotUnauthenticatedController[K]>
                >
              >;
            }
          : never;
      };
    };
  };
};
