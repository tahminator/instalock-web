import type {
  ApiURLPathParams,
  ApiURLQueryParams,
  ApiURLRequestBody,
  ApiURLResponseBody,
  PathsKey,
  PathsMethodKey,
} from "./ApiURL";

export enum Location {
  WEB,
  DESKTOP,
}

type EndpointSchema<
  TPath extends PathsKey,
  TMethod extends PathsMethodKey<TPath>,
> = {
  queryParams: ApiURLQueryParams<TPath, TMethod>;
  pathParams: ApiURLPathParams<TPath, TMethod>;
  requestBody: ApiURLRequestBody<TPath, TMethod>;
};

/** Marks a key optional when its value can only ever be `undefined`, so callers don't have to spell out `key: undefined` for params an endpoint doesn't take. */
type OptionalizeUndefinedKeys<T> = {
  [K in keyof T as [T[K]] extends [undefined] ? K : never]?: T[K];
} & {
  [K in keyof T as [T[K]] extends [undefined] ? never : K]: T[K];
};

type EndpointFetcher<
  TPath extends PathsKey,
  TMethod extends PathsMethodKey<TPath>,
  TSchema = OptionalizeUndefinedKeys<EndpointSchema<TPath, TMethod>>,
> = {
  // The schema arg itself drops out entirely when every field on it is optional.
  fetcher: (
    ...args: {} extends TSchema ? [schema?: TSchema] : [schema: TSchema]
  ) => Promise<ApiURLResponseBody<TPath, TMethod>>;
};

export type Fetcher = {
  api: {
    riot: {
      auth: {
        getMe: EndpointFetcher<"/api/riot/auth", "get">;
        authenticate: EndpointFetcher<"/api/riot/auth", "post">;
        logout: EndpointFetcher<"/api/riot/auth", "delete">;
      };
      query: {
        getMyRiotPlayerData: EndpointFetcher<"/api/riot/query/me", "get">;
        getMyRiotMatchesEnriched: EndpointFetcher<
          "/api/riot/query/me/match",
          "get"
        >;
        getRiotPlayerDataByPuuid: EndpointFetcher<
          "/api/riot/query/{puuid}",
          "get"
        >;
        getRiotMatchEnrichedByMatchId: EndpointFetcher<
          "/api/riot/query/me/match/{matchId}",
          "get"
        >;
      };
      unauthenticated: {
        getMetrics: EndpointFetcher<"/api/riot/public/metrics", "get">;
        getUsersShallow: EndpointFetcher<"/api/riot/public/user", "get">;
        getRiotPlayerDataDetailedByPuuid: EndpointFetcher<
          "/api/riot/public/user/{puuid}/matches",
          "get"
        >;
      };
    };
  };
};
