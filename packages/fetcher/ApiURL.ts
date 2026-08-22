import type { operations, paths } from "../../generated";

type MaybeParams<T> =
  keyof T extends never ? { params?: undefined } : { params: T };

type HttpMethodLower =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";
export type HttpMethodUpper = Uppercase<HttpMethodLower>;

export type PathsKey = keyof paths;
type PathsMethods<TKey extends PathsKey> = paths[TKey];
export type PathsMethodKey<TKey extends PathsKey> = keyof PathsMethods<TKey>;
type PathMethodResult<
  TPathKey extends PathsKey,
  TPathMethodKey extends PathsMethodKey<TPathKey>,
> = PathsMethods<TPathKey>[TPathMethodKey];

type OperationsKey = keyof operations;
type OperationsPath<TKey extends OperationsKey> = operations[TKey];

type OperationFromPathMethodResult<TResult> = {
  [K in OperationsKey]: OperationsPath<K> extends TResult ? K : never;
}[OperationsKey];

type PathParamToOperations<
  TPathKey extends PathsKey,
  TMethod extends PathsMethodKey<TPathKey>,
> = OperationFromPathMethodResult<PathMethodResult<TPathKey, TMethod>>;

type PathOperationsToPathParams<TOperationsKey extends OperationsKey> =
  OperationsPath<TOperationsKey>["parameters"]["path"];

type PathOperationsToPathQueries<TOperationsKey extends OperationsKey> =
  OperationsPath<TOperationsKey>["parameters"]["query"];

type PathOperationsToPathResponseBody<TOperationsKey extends OperationsKey> =
  Extract<
    OperationsPath<TOperationsKey>["responses"],
    { 200: unknown }
  >[200]["content"] extends { "application/json": infer TBody } ?
    TBody
  : never;

type PathOperationsToPathRequestBody<TOperationsKey extends OperationsKey> =
  Extract<
    OperationsPath<TOperationsKey>["requestBody"],
    { content: unknown }
  >["content"]["application/json"];

export type ApiURLOptions<
  TKey extends PathsKey,
  TExtractMethod extends PathsMethodKey<TKey>,
  TMethodField = TExtractMethod,
> = {
  method: TMethodField;
} & MaybeParams<
  PathOperationsToPathParams<PathParamToOperations<TKey, TExtractMethod>>
> & {
    queries?: PathOperationsToPathQueries<
      PathParamToOperations<TKey, TExtractMethod>
    >;
  };

/** The request body shape a given path+method expects (`undefined` if it takes none). */
export type ApiURLRequestBody<
  TKey extends PathsKey,
  TMethod extends PathsMethodKey<TKey>,
> =
  [
    PathOperationsToPathRequestBody<PathParamToOperations<TKey, TMethod>>,
  ] extends [never] ?
    undefined
  : PathOperationsToPathRequestBody<PathParamToOperations<TKey, TMethod>>;

/** The path-param shape a given path+method expects (`undefined` if it takes none). */
export type ApiURLPathParams<
  TKey extends PathsKey,
  TMethod extends PathsMethodKey<TKey>,
> = PathOperationsToPathParams<PathParamToOperations<TKey, TMethod>>;

/** The query-param shape a given path+method expects (`undefined` if it takes none). */
export type ApiURLQueryParams<
  TKey extends PathsKey,
  TMethod extends PathsMethodKey<TKey>,
> = PathOperationsToPathQueries<PathParamToOperations<TKey, TMethod>>;

/** The response payload shape a given path+method returns. */
export type ApiURLResponseBody<
  TKey extends PathsKey,
  TMethod extends PathsMethodKey<TKey>,
> = PathOperationsToPathResponseBody<PathParamToOperations<TKey, TMethod>>;

/**
 * A type-safe URL/method/req/res builder introspected off `generated.ts`
 * (the OpenAPI schema the server publishes). It never performs the fetch
 * itself -- `url` and `method` are plain values you pass into whatever you
 * want (`fetch`, XHR, a mock, an IPC bridge).
 *
 * @example
 * ```ts
 * const { url, method, req, res } = ApiURL.create("/api/riot/auth", { method: "POST" });
 * const response = await fetch(url, {
 *   method,
 *   headers: { "Content-Type": "application/json" },
 *   body: req({ url: riotUrl }),
 * });
 * const json = res(await response.json());
 * ```
 */
export class ApiURL<
  TPathKey extends PathsKey,
  TPathMethod extends PathsMethodKey<TPathKey>,
> {
  private readonly _url: URL;
  private readonly _method: Uppercase<Extract<TPathMethod, string>>;

  static create<
    const TCreatePathKey extends PathsKey,
    const TCreatePathMethod extends HttpMethodUpper &
      Uppercase<Extract<PathsMethodKey<TCreatePathKey>, string>>,
  >(
    path: TCreatePathKey,
    opts: ApiURLOptions<
      TCreatePathKey,
      Lowercase<TCreatePathMethod>,
      TCreatePathMethod
    >,
  ): ApiURL<TCreatePathKey, Lowercase<TCreatePathMethod>> {
    // The spread below is provably correct (only `method` is lowercased,
    // everything else passes through), but TS can't verify a generic
    // conditional-type intersection survives a spread+override -- a known
    // limitation, not a real type hole.
    return new ApiURL(path, {
      ...opts,
      method: opts.method.toLowerCase() as Lowercase<TCreatePathMethod>,
    } as ApiURLOptions<TCreatePathKey, Lowercase<TCreatePathMethod>>);
  }

  private constructor(
    path: TPathKey,
    options: ApiURLOptions<TPathKey, TPathMethod>,
  ) {
    const { method, params, queries } = options;
    this._method = String(method).toUpperCase() as Uppercase<
      Extract<TPathMethod, string>
    >;

    let resolved: string = path;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        resolved = resolved.replace(`{${k}}`, encodeURIComponent(String(v)));
      }

      if (/\{[^}]+\}/.test(resolved)) {
        throw new Error(`Missing path params for: ${path}`);
      }
    }

    const url = new URL(resolved, window.location.origin);
    this._url = url;

    if (!queries) {
      return;
    }

    for (const [k, v] of Object.entries(queries)) {
      if (v !== null && v !== undefined) {
        url.searchParams.set(k, String(v));
      }
    }
  }

  /** The resolved `URL`, with path params substituted and queries applied. */
  get url(): URL {
    return this._url;
  }

  /** The uppercase HTTP method, ready to pass straight into `fetch`. */
  get method(): typeof this._method {
    return this._method;
  }

  /** Validates & serializes a request body against what this endpoint expects. */
  req(
    this: void,
    body: PathOperationsToPathRequestBody<
      PathParamToOperations<TPathKey, TPathMethod>
    >,
  ): string {
    return JSON.stringify(body);
  }

  /**
   * Type-only cast of a parsed response body to what this endpoint returns.
   * No-op at runtime -- just gives you compile-time safety.
   */
  res(
    this: void,
    response: unknown,
  ): PathOperationsToPathResponseBody<
    PathParamToOperations<TPathKey, TPathMethod>
  > {
    return response as PathOperationsToPathResponseBody<
      PathParamToOperations<TPathKey, TPathMethod>
    >;
  }
}
