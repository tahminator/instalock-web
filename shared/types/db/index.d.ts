
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model RiotMatches
 * 
 */
export type RiotMatches = $Result.DefaultSelection<Prisma.$RiotMatchesPayload>
/**
 * Model RiotMatchRound
 * 
 */
export type RiotMatchRound = $Result.DefaultSelection<Prisma.$RiotMatchRoundPayload>
/**
 * Model RiotMatchPlayers
 * 
 */
export type RiotMatchPlayers = $Result.DefaultSelection<Prisma.$RiotMatchPlayersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RiotMatchTeamColor: {
  Red: 'Red',
  Blue: 'Blue'
};

export type RiotMatchTeamColor = (typeof RiotMatchTeamColor)[keyof typeof RiotMatchTeamColor]

}

export type RiotMatchTeamColor = $Enums.RiotMatchTeamColor

export const RiotMatchTeamColor: typeof $Enums.RiotMatchTeamColor

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.riotMatches`: Exposes CRUD operations for the **RiotMatches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiotMatches
    * const riotMatches = await prisma.riotMatches.findMany()
    * ```
    */
  get riotMatches(): Prisma.RiotMatchesDelegate<ExtArgs>;

  /**
   * `prisma.riotMatchRound`: Exposes CRUD operations for the **RiotMatchRound** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiotMatchRounds
    * const riotMatchRounds = await prisma.riotMatchRound.findMany()
    * ```
    */
  get riotMatchRound(): Prisma.RiotMatchRoundDelegate<ExtArgs>;

  /**
   * `prisma.riotMatchPlayers`: Exposes CRUD operations for the **RiotMatchPlayers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiotMatchPlayers
    * const riotMatchPlayers = await prisma.riotMatchPlayers.findMany()
    * ```
    */
  get riotMatchPlayers(): Prisma.RiotMatchPlayersDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    RiotMatches: 'RiotMatches',
    RiotMatchRound: 'RiotMatchRound',
    RiotMatchPlayers: 'RiotMatchPlayers'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "session" | "riotMatches" | "riotMatchRound" | "riotMatchPlayers"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      RiotMatches: {
        payload: Prisma.$RiotMatchesPayload<ExtArgs>
        fields: Prisma.RiotMatchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiotMatchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiotMatchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          findFirst: {
            args: Prisma.RiotMatchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiotMatchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          findMany: {
            args: Prisma.RiotMatchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>[]
          }
          create: {
            args: Prisma.RiotMatchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          createMany: {
            args: Prisma.RiotMatchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiotMatchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>[]
          }
          delete: {
            args: Prisma.RiotMatchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          update: {
            args: Prisma.RiotMatchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          deleteMany: {
            args: Prisma.RiotMatchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiotMatchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiotMatchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchesPayload>
          }
          aggregate: {
            args: Prisma.RiotMatchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiotMatches>
          }
          groupBy: {
            args: Prisma.RiotMatchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiotMatchesCountArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchesCountAggregateOutputType> | number
          }
        }
      }
      RiotMatchRound: {
        payload: Prisma.$RiotMatchRoundPayload<ExtArgs>
        fields: Prisma.RiotMatchRoundFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiotMatchRoundFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiotMatchRoundFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          findFirst: {
            args: Prisma.RiotMatchRoundFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiotMatchRoundFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          findMany: {
            args: Prisma.RiotMatchRoundFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>[]
          }
          create: {
            args: Prisma.RiotMatchRoundCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          createMany: {
            args: Prisma.RiotMatchRoundCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiotMatchRoundCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>[]
          }
          delete: {
            args: Prisma.RiotMatchRoundDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          update: {
            args: Prisma.RiotMatchRoundUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          deleteMany: {
            args: Prisma.RiotMatchRoundDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiotMatchRoundUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiotMatchRoundUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchRoundPayload>
          }
          aggregate: {
            args: Prisma.RiotMatchRoundAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiotMatchRound>
          }
          groupBy: {
            args: Prisma.RiotMatchRoundGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchRoundGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiotMatchRoundCountArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchRoundCountAggregateOutputType> | number
          }
        }
      }
      RiotMatchPlayers: {
        payload: Prisma.$RiotMatchPlayersPayload<ExtArgs>
        fields: Prisma.RiotMatchPlayersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiotMatchPlayersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiotMatchPlayersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          findFirst: {
            args: Prisma.RiotMatchPlayersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiotMatchPlayersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          findMany: {
            args: Prisma.RiotMatchPlayersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>[]
          }
          create: {
            args: Prisma.RiotMatchPlayersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          createMany: {
            args: Prisma.RiotMatchPlayersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiotMatchPlayersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>[]
          }
          delete: {
            args: Prisma.RiotMatchPlayersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          update: {
            args: Prisma.RiotMatchPlayersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          deleteMany: {
            args: Prisma.RiotMatchPlayersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiotMatchPlayersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiotMatchPlayersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPlayersPayload>
          }
          aggregate: {
            args: Prisma.RiotMatchPlayersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiotMatchPlayers>
          }
          groupBy: {
            args: Prisma.RiotMatchPlayersGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchPlayersGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiotMatchPlayersCountArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchPlayersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Session: number
    riotMatches: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | UserCountOutputTypeCountSessionArgs
    riotMatches?: boolean | UserCountOutputTypeCountRiotMatchesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRiotMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchesWhereInput
  }


  /**
   * Count Type RiotMatchesCountOutputType
   */

  export type RiotMatchesCountOutputType = {
    users: number
    rounds: number
    matchPlayers: number
  }

  export type RiotMatchesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RiotMatchesCountOutputTypeCountUsersArgs
    rounds?: boolean | RiotMatchesCountOutputTypeCountRoundsArgs
    matchPlayers?: boolean | RiotMatchesCountOutputTypeCountMatchPlayersArgs
  }

  // Custom InputTypes
  /**
   * RiotMatchesCountOutputType without action
   */
  export type RiotMatchesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchesCountOutputType
     */
    select?: RiotMatchesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RiotMatchesCountOutputType without action
   */
  export type RiotMatchesCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RiotMatchesCountOutputType without action
   */
  export type RiotMatchesCountOutputTypeCountRoundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchRoundWhereInput
  }

  /**
   * RiotMatchesCountOutputType without action
   */
  export type RiotMatchesCountOutputTypeCountMatchPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchPlayersWhereInput
  }


  /**
   * Count Type RiotMatchPlayersCountOutputType
   */

  export type RiotMatchPlayersCountOutputType = {
    riotMatches: number
  }

  export type RiotMatchPlayersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riotMatches?: boolean | RiotMatchPlayersCountOutputTypeCountRiotMatchesArgs
  }

  // Custom InputTypes
  /**
   * RiotMatchPlayersCountOutputType without action
   */
  export type RiotMatchPlayersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayersCountOutputType
     */
    select?: RiotMatchPlayersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RiotMatchPlayersCountOutputType without action
   */
  export type RiotMatchPlayersCountOutputTypeCountRiotMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    discordId: string | null
    discordName: string | null
    riotEntitlement: string | null
    riotAuth: string | null
    riotPuuid: string | null
    riotTag: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    discordId: string | null
    discordName: string | null
    riotEntitlement: string | null
    riotAuth: string | null
    riotPuuid: string | null
    riotTag: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    discordId: number
    discordName: number
    riotEntitlement: number
    riotAuth: number
    riotPuuid: number
    riotTag: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    discordId?: true
    discordName?: true
    riotEntitlement?: true
    riotAuth?: true
    riotPuuid?: true
    riotTag?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    discordId?: true
    discordName?: true
    riotEntitlement?: true
    riotAuth?: true
    riotPuuid?: true
    riotTag?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    discordId?: true
    discordName?: true
    riotEntitlement?: true
    riotAuth?: true
    riotPuuid?: true
    riotTag?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    discordId: string
    discordName: string
    riotEntitlement: string | null
    riotAuth: string | null
    riotPuuid: string | null
    riotTag: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    discordId?: boolean
    discordName?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotPuuid?: boolean
    riotTag?: boolean
    Session?: boolean | User$SessionArgs<ExtArgs>
    riotMatches?: boolean | User$riotMatchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    discordId?: boolean
    discordName?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotPuuid?: boolean
    riotTag?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    discordId?: boolean
    discordName?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotPuuid?: boolean
    riotTag?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Session?: boolean | User$SessionArgs<ExtArgs>
    riotMatches?: boolean | User$riotMatchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Session: Prisma.$SessionPayload<ExtArgs>[]
      riotMatches: Prisma.$RiotMatchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      discordId: string
      discordName: string
      riotEntitlement: string | null
      riotAuth: string | null
      riotPuuid: string | null
      riotTag: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Session<T extends User$SessionArgs<ExtArgs> = {}>(args?: Subset<T, User$SessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    riotMatches<T extends User$riotMatchesArgs<ExtArgs> = {}>(args?: Subset<T, User$riotMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly discordId: FieldRef<"User", 'String'>
    readonly discordName: FieldRef<"User", 'String'>
    readonly riotEntitlement: FieldRef<"User", 'String'>
    readonly riotAuth: FieldRef<"User", 'String'>
    readonly riotPuuid: FieldRef<"User", 'String'>
    readonly riotTag: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.Session
   */
  export type User$SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.riotMatches
   */
  export type User$riotMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    where?: RiotMatchesWhereInput
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    cursor?: RiotMatchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiotMatchesScalarFieldEnum | RiotMatchesScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    expiresAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    expiresAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model RiotMatches
   */

  export type AggregateRiotMatches = {
    _count: RiotMatchesCountAggregateOutputType | null
    _avg: RiotMatchesAvgAggregateOutputType | null
    _sum: RiotMatchesSumAggregateOutputType | null
    _min: RiotMatchesMinAggregateOutputType | null
    _max: RiotMatchesMaxAggregateOutputType | null
  }

  export type RiotMatchesAvgAggregateOutputType = {
    roundsPlayed: number | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
  }

  export type RiotMatchesSumAggregateOutputType = {
    roundsPlayed: number | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
  }

  export type RiotMatchesMinAggregateOutputType = {
    id: string | null
    mapId: string | null
    gameVersion: string | null
    gameStart: Date | null
    gameEnd: Date | null
    isCompleted: boolean | null
    queueId: string | null
    isRanked: boolean | null
    seasonId: string | null
    roundsPlayed: number | null
    teamWon: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
    riotMatchPlayersId: string | null
  }

  export type RiotMatchesMaxAggregateOutputType = {
    id: string | null
    mapId: string | null
    gameVersion: string | null
    gameStart: Date | null
    gameEnd: Date | null
    isCompleted: boolean | null
    queueId: string | null
    isRanked: boolean | null
    seasonId: string | null
    roundsPlayed: number | null
    teamWon: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
    riotMatchPlayersId: string | null
  }

  export type RiotMatchesCountAggregateOutputType = {
    id: number
    mapId: number
    gameVersion: number
    gameStart: number
    gameEnd: number
    isCompleted: number
    queueId: number
    isRanked: number
    seasonId: number
    roundsPlayed: number
    teamWon: number
    teamRedRoundsWon: number
    teamBlueRoundsWon: number
    riotMatchPlayersId: number
    _all: number
  }


  export type RiotMatchesAvgAggregateInputType = {
    roundsPlayed?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
  }

  export type RiotMatchesSumAggregateInputType = {
    roundsPlayed?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
  }

  export type RiotMatchesMinAggregateInputType = {
    id?: true
    mapId?: true
    gameVersion?: true
    gameStart?: true
    gameEnd?: true
    isCompleted?: true
    queueId?: true
    isRanked?: true
    seasonId?: true
    roundsPlayed?: true
    teamWon?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
    riotMatchPlayersId?: true
  }

  export type RiotMatchesMaxAggregateInputType = {
    id?: true
    mapId?: true
    gameVersion?: true
    gameStart?: true
    gameEnd?: true
    isCompleted?: true
    queueId?: true
    isRanked?: true
    seasonId?: true
    roundsPlayed?: true
    teamWon?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
    riotMatchPlayersId?: true
  }

  export type RiotMatchesCountAggregateInputType = {
    id?: true
    mapId?: true
    gameVersion?: true
    gameStart?: true
    gameEnd?: true
    isCompleted?: true
    queueId?: true
    isRanked?: true
    seasonId?: true
    roundsPlayed?: true
    teamWon?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
    riotMatchPlayersId?: true
    _all?: true
  }

  export type RiotMatchesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatches to aggregate.
     */
    where?: RiotMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiotMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiotMatches
    **/
    _count?: true | RiotMatchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiotMatchesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiotMatchesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiotMatchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiotMatchesMaxAggregateInputType
  }

  export type GetRiotMatchesAggregateType<T extends RiotMatchesAggregateArgs> = {
        [P in keyof T & keyof AggregateRiotMatches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiotMatches[P]>
      : GetScalarType<T[P], AggregateRiotMatches[P]>
  }




  export type RiotMatchesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchesWhereInput
    orderBy?: RiotMatchesOrderByWithAggregationInput | RiotMatchesOrderByWithAggregationInput[]
    by: RiotMatchesScalarFieldEnum[] | RiotMatchesScalarFieldEnum
    having?: RiotMatchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiotMatchesCountAggregateInputType | true
    _avg?: RiotMatchesAvgAggregateInputType
    _sum?: RiotMatchesSumAggregateInputType
    _min?: RiotMatchesMinAggregateInputType
    _max?: RiotMatchesMaxAggregateInputType
  }

  export type RiotMatchesGroupByOutputType = {
    id: string
    mapId: string | null
    gameVersion: string | null
    gameStart: Date | null
    gameEnd: Date | null
    isCompleted: boolean | null
    queueId: string | null
    isRanked: boolean | null
    seasonId: string | null
    roundsPlayed: number | null
    teamWon: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
    riotMatchPlayersId: string | null
    _count: RiotMatchesCountAggregateOutputType | null
    _avg: RiotMatchesAvgAggregateOutputType | null
    _sum: RiotMatchesSumAggregateOutputType | null
    _min: RiotMatchesMinAggregateOutputType | null
    _max: RiotMatchesMaxAggregateOutputType | null
  }

  type GetRiotMatchesGroupByPayload<T extends RiotMatchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiotMatchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiotMatchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiotMatchesGroupByOutputType[P]>
            : GetScalarType<T[P], RiotMatchesGroupByOutputType[P]>
        }
      >
    >


  export type RiotMatchesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    gameVersion?: boolean
    gameStart?: boolean
    gameEnd?: boolean
    isCompleted?: boolean
    queueId?: boolean
    isRanked?: boolean
    seasonId?: boolean
    roundsPlayed?: boolean
    teamWon?: boolean
    teamRedRoundsWon?: boolean
    teamBlueRoundsWon?: boolean
    riotMatchPlayersId?: boolean
    users?: boolean | RiotMatches$usersArgs<ExtArgs>
    rounds?: boolean | RiotMatches$roundsArgs<ExtArgs>
    matchPlayers?: boolean | RiotMatches$matchPlayersArgs<ExtArgs>
    _count?: boolean | RiotMatchesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riotMatches"]>

  export type RiotMatchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    gameVersion?: boolean
    gameStart?: boolean
    gameEnd?: boolean
    isCompleted?: boolean
    queueId?: boolean
    isRanked?: boolean
    seasonId?: boolean
    roundsPlayed?: boolean
    teamWon?: boolean
    teamRedRoundsWon?: boolean
    teamBlueRoundsWon?: boolean
    riotMatchPlayersId?: boolean
  }, ExtArgs["result"]["riotMatches"]>

  export type RiotMatchesSelectScalar = {
    id?: boolean
    mapId?: boolean
    gameVersion?: boolean
    gameStart?: boolean
    gameEnd?: boolean
    isCompleted?: boolean
    queueId?: boolean
    isRanked?: boolean
    seasonId?: boolean
    roundsPlayed?: boolean
    teamWon?: boolean
    teamRedRoundsWon?: boolean
    teamBlueRoundsWon?: boolean
    riotMatchPlayersId?: boolean
  }

  export type RiotMatchesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RiotMatches$usersArgs<ExtArgs>
    rounds?: boolean | RiotMatches$roundsArgs<ExtArgs>
    matchPlayers?: boolean | RiotMatches$matchPlayersArgs<ExtArgs>
    _count?: boolean | RiotMatchesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RiotMatchesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RiotMatchesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiotMatches"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      rounds: Prisma.$RiotMatchRoundPayload<ExtArgs>[]
      matchPlayers: Prisma.$RiotMatchPlayersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mapId: string | null
      gameVersion: string | null
      gameStart: Date | null
      gameEnd: Date | null
      isCompleted: boolean | null
      queueId: string | null
      isRanked: boolean | null
      seasonId: string | null
      roundsPlayed: number | null
      teamWon: $Enums.RiotMatchTeamColor | null
      teamRedRoundsWon: number | null
      teamBlueRoundsWon: number | null
      riotMatchPlayersId: string | null
    }, ExtArgs["result"]["riotMatches"]>
    composites: {}
  }

  type RiotMatchesGetPayload<S extends boolean | null | undefined | RiotMatchesDefaultArgs> = $Result.GetResult<Prisma.$RiotMatchesPayload, S>

  type RiotMatchesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiotMatchesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiotMatchesCountAggregateInputType | true
    }

  export interface RiotMatchesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiotMatches'], meta: { name: 'RiotMatches' } }
    /**
     * Find zero or one RiotMatches that matches the filter.
     * @param {RiotMatchesFindUniqueArgs} args - Arguments to find a RiotMatches
     * @example
     * // Get one RiotMatches
     * const riotMatches = await prisma.riotMatches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiotMatchesFindUniqueArgs>(args: SelectSubset<T, RiotMatchesFindUniqueArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiotMatches that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiotMatchesFindUniqueOrThrowArgs} args - Arguments to find a RiotMatches
     * @example
     * // Get one RiotMatches
     * const riotMatches = await prisma.riotMatches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiotMatchesFindUniqueOrThrowArgs>(args: SelectSubset<T, RiotMatchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiotMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesFindFirstArgs} args - Arguments to find a RiotMatches
     * @example
     * // Get one RiotMatches
     * const riotMatches = await prisma.riotMatches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiotMatchesFindFirstArgs>(args?: SelectSubset<T, RiotMatchesFindFirstArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiotMatches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesFindFirstOrThrowArgs} args - Arguments to find a RiotMatches
     * @example
     * // Get one RiotMatches
     * const riotMatches = await prisma.riotMatches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiotMatchesFindFirstOrThrowArgs>(args?: SelectSubset<T, RiotMatchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiotMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiotMatches
     * const riotMatches = await prisma.riotMatches.findMany()
     * 
     * // Get first 10 RiotMatches
     * const riotMatches = await prisma.riotMatches.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riotMatchesWithIdOnly = await prisma.riotMatches.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiotMatchesFindManyArgs>(args?: SelectSubset<T, RiotMatchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiotMatches.
     * @param {RiotMatchesCreateArgs} args - Arguments to create a RiotMatches.
     * @example
     * // Create one RiotMatches
     * const RiotMatches = await prisma.riotMatches.create({
     *   data: {
     *     // ... data to create a RiotMatches
     *   }
     * })
     * 
     */
    create<T extends RiotMatchesCreateArgs>(args: SelectSubset<T, RiotMatchesCreateArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiotMatches.
     * @param {RiotMatchesCreateManyArgs} args - Arguments to create many RiotMatches.
     * @example
     * // Create many RiotMatches
     * const riotMatches = await prisma.riotMatches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiotMatchesCreateManyArgs>(args?: SelectSubset<T, RiotMatchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiotMatches and returns the data saved in the database.
     * @param {RiotMatchesCreateManyAndReturnArgs} args - Arguments to create many RiotMatches.
     * @example
     * // Create many RiotMatches
     * const riotMatches = await prisma.riotMatches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiotMatches and only return the `id`
     * const riotMatchesWithIdOnly = await prisma.riotMatches.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiotMatchesCreateManyAndReturnArgs>(args?: SelectSubset<T, RiotMatchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiotMatches.
     * @param {RiotMatchesDeleteArgs} args - Arguments to delete one RiotMatches.
     * @example
     * // Delete one RiotMatches
     * const RiotMatches = await prisma.riotMatches.delete({
     *   where: {
     *     // ... filter to delete one RiotMatches
     *   }
     * })
     * 
     */
    delete<T extends RiotMatchesDeleteArgs>(args: SelectSubset<T, RiotMatchesDeleteArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiotMatches.
     * @param {RiotMatchesUpdateArgs} args - Arguments to update one RiotMatches.
     * @example
     * // Update one RiotMatches
     * const riotMatches = await prisma.riotMatches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiotMatchesUpdateArgs>(args: SelectSubset<T, RiotMatchesUpdateArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiotMatches.
     * @param {RiotMatchesDeleteManyArgs} args - Arguments to filter RiotMatches to delete.
     * @example
     * // Delete a few RiotMatches
     * const { count } = await prisma.riotMatches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiotMatchesDeleteManyArgs>(args?: SelectSubset<T, RiotMatchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiotMatches
     * const riotMatches = await prisma.riotMatches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiotMatchesUpdateManyArgs>(args: SelectSubset<T, RiotMatchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiotMatches.
     * @param {RiotMatchesUpsertArgs} args - Arguments to update or create a RiotMatches.
     * @example
     * // Update or create a RiotMatches
     * const riotMatches = await prisma.riotMatches.upsert({
     *   create: {
     *     // ... data to create a RiotMatches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiotMatches we want to update
     *   }
     * })
     */
    upsert<T extends RiotMatchesUpsertArgs>(args: SelectSubset<T, RiotMatchesUpsertArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesCountArgs} args - Arguments to filter RiotMatches to count.
     * @example
     * // Count the number of RiotMatches
     * const count = await prisma.riotMatches.count({
     *   where: {
     *     // ... the filter for the RiotMatches we want to count
     *   }
     * })
    **/
    count<T extends RiotMatchesCountArgs>(
      args?: Subset<T, RiotMatchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiotMatchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RiotMatchesAggregateArgs>(args: Subset<T, RiotMatchesAggregateArgs>): Prisma.PrismaPromise<GetRiotMatchesAggregateType<T>>

    /**
     * Group by RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RiotMatchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiotMatchesGroupByArgs['orderBy'] }
        : { orderBy?: RiotMatchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RiotMatchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiotMatchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiotMatches model
   */
  readonly fields: RiotMatchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiotMatches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiotMatchesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends RiotMatches$usersArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatches$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    rounds<T extends RiotMatches$roundsArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatches$roundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findMany"> | Null>
    matchPlayers<T extends RiotMatches$matchPlayersArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatches$matchPlayersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RiotMatches model
   */ 
  interface RiotMatchesFieldRefs {
    readonly id: FieldRef<"RiotMatches", 'String'>
    readonly mapId: FieldRef<"RiotMatches", 'String'>
    readonly gameVersion: FieldRef<"RiotMatches", 'String'>
    readonly gameStart: FieldRef<"RiotMatches", 'DateTime'>
    readonly gameEnd: FieldRef<"RiotMatches", 'DateTime'>
    readonly isCompleted: FieldRef<"RiotMatches", 'Boolean'>
    readonly queueId: FieldRef<"RiotMatches", 'String'>
    readonly isRanked: FieldRef<"RiotMatches", 'Boolean'>
    readonly seasonId: FieldRef<"RiotMatches", 'String'>
    readonly roundsPlayed: FieldRef<"RiotMatches", 'Int'>
    readonly teamWon: FieldRef<"RiotMatches", 'RiotMatchTeamColor'>
    readonly teamRedRoundsWon: FieldRef<"RiotMatches", 'Int'>
    readonly teamBlueRoundsWon: FieldRef<"RiotMatches", 'Int'>
    readonly riotMatchPlayersId: FieldRef<"RiotMatches", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RiotMatches findUnique
   */
  export type RiotMatchesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where: RiotMatchesWhereUniqueInput
  }

  /**
   * RiotMatches findUniqueOrThrow
   */
  export type RiotMatchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where: RiotMatchesWhereUniqueInput
  }

  /**
   * RiotMatches findFirst
   */
  export type RiotMatchesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where?: RiotMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatches.
     */
    cursor?: RiotMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatches.
     */
    distinct?: RiotMatchesScalarFieldEnum | RiotMatchesScalarFieldEnum[]
  }

  /**
   * RiotMatches findFirstOrThrow
   */
  export type RiotMatchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where?: RiotMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatches.
     */
    cursor?: RiotMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatches.
     */
    distinct?: RiotMatchesScalarFieldEnum | RiotMatchesScalarFieldEnum[]
  }

  /**
   * RiotMatches findMany
   */
  export type RiotMatchesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where?: RiotMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiotMatches.
     */
    cursor?: RiotMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatches.
     */
    skip?: number
    distinct?: RiotMatchesScalarFieldEnum | RiotMatchesScalarFieldEnum[]
  }

  /**
   * RiotMatches create
   */
  export type RiotMatchesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * The data needed to create a RiotMatches.
     */
    data: XOR<RiotMatchesCreateInput, RiotMatchesUncheckedCreateInput>
  }

  /**
   * RiotMatches createMany
   */
  export type RiotMatchesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiotMatches.
     */
    data: RiotMatchesCreateManyInput | RiotMatchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatches createManyAndReturn
   */
  export type RiotMatchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiotMatches.
     */
    data: RiotMatchesCreateManyInput | RiotMatchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatches update
   */
  export type RiotMatchesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * The data needed to update a RiotMatches.
     */
    data: XOR<RiotMatchesUpdateInput, RiotMatchesUncheckedUpdateInput>
    /**
     * Choose, which RiotMatches to update.
     */
    where: RiotMatchesWhereUniqueInput
  }

  /**
   * RiotMatches updateMany
   */
  export type RiotMatchesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiotMatches.
     */
    data: XOR<RiotMatchesUpdateManyMutationInput, RiotMatchesUncheckedUpdateManyInput>
    /**
     * Filter which RiotMatches to update
     */
    where?: RiotMatchesWhereInput
  }

  /**
   * RiotMatches upsert
   */
  export type RiotMatchesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * The filter to search for the RiotMatches to update in case it exists.
     */
    where: RiotMatchesWhereUniqueInput
    /**
     * In case the RiotMatches found by the `where` argument doesn't exist, create a new RiotMatches with this data.
     */
    create: XOR<RiotMatchesCreateInput, RiotMatchesUncheckedCreateInput>
    /**
     * In case the RiotMatches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiotMatchesUpdateInput, RiotMatchesUncheckedUpdateInput>
  }

  /**
   * RiotMatches delete
   */
  export type RiotMatchesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    /**
     * Filter which RiotMatches to delete.
     */
    where: RiotMatchesWhereUniqueInput
  }

  /**
   * RiotMatches deleteMany
   */
  export type RiotMatchesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatches to delete
     */
    where?: RiotMatchesWhereInput
  }

  /**
   * RiotMatches.users
   */
  export type RiotMatches$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * RiotMatches.rounds
   */
  export type RiotMatches$roundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    where?: RiotMatchRoundWhereInput
    orderBy?: RiotMatchRoundOrderByWithRelationInput | RiotMatchRoundOrderByWithRelationInput[]
    cursor?: RiotMatchRoundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiotMatchRoundScalarFieldEnum | RiotMatchRoundScalarFieldEnum[]
  }

  /**
   * RiotMatches.matchPlayers
   */
  export type RiotMatches$matchPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    where?: RiotMatchPlayersWhereInput
    orderBy?: RiotMatchPlayersOrderByWithRelationInput | RiotMatchPlayersOrderByWithRelationInput[]
    cursor?: RiotMatchPlayersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiotMatchPlayersScalarFieldEnum | RiotMatchPlayersScalarFieldEnum[]
  }

  /**
   * RiotMatches without action
   */
  export type RiotMatchesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
  }


  /**
   * Model RiotMatchRound
   */

  export type AggregateRiotMatchRound = {
    _count: RiotMatchRoundCountAggregateOutputType | null
    _min: RiotMatchRoundMinAggregateOutputType | null
    _max: RiotMatchRoundMaxAggregateOutputType | null
  }

  export type RiotMatchRoundMinAggregateOutputType = {
    id: string | null
    riotMatchesId: string | null
  }

  export type RiotMatchRoundMaxAggregateOutputType = {
    id: string | null
    riotMatchesId: string | null
  }

  export type RiotMatchRoundCountAggregateOutputType = {
    id: number
    riotMatchesId: number
    _all: number
  }


  export type RiotMatchRoundMinAggregateInputType = {
    id?: true
    riotMatchesId?: true
  }

  export type RiotMatchRoundMaxAggregateInputType = {
    id?: true
    riotMatchesId?: true
  }

  export type RiotMatchRoundCountAggregateInputType = {
    id?: true
    riotMatchesId?: true
    _all?: true
  }

  export type RiotMatchRoundAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatchRound to aggregate.
     */
    where?: RiotMatchRoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchRounds to fetch.
     */
    orderBy?: RiotMatchRoundOrderByWithRelationInput | RiotMatchRoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiotMatchRoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchRounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchRounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiotMatchRounds
    **/
    _count?: true | RiotMatchRoundCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiotMatchRoundMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiotMatchRoundMaxAggregateInputType
  }

  export type GetRiotMatchRoundAggregateType<T extends RiotMatchRoundAggregateArgs> = {
        [P in keyof T & keyof AggregateRiotMatchRound]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiotMatchRound[P]>
      : GetScalarType<T[P], AggregateRiotMatchRound[P]>
  }




  export type RiotMatchRoundGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchRoundWhereInput
    orderBy?: RiotMatchRoundOrderByWithAggregationInput | RiotMatchRoundOrderByWithAggregationInput[]
    by: RiotMatchRoundScalarFieldEnum[] | RiotMatchRoundScalarFieldEnum
    having?: RiotMatchRoundScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiotMatchRoundCountAggregateInputType | true
    _min?: RiotMatchRoundMinAggregateInputType
    _max?: RiotMatchRoundMaxAggregateInputType
  }

  export type RiotMatchRoundGroupByOutputType = {
    id: string
    riotMatchesId: string
    _count: RiotMatchRoundCountAggregateOutputType | null
    _min: RiotMatchRoundMinAggregateOutputType | null
    _max: RiotMatchRoundMaxAggregateOutputType | null
  }

  type GetRiotMatchRoundGroupByPayload<T extends RiotMatchRoundGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiotMatchRoundGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiotMatchRoundGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiotMatchRoundGroupByOutputType[P]>
            : GetScalarType<T[P], RiotMatchRoundGroupByOutputType[P]>
        }
      >
    >


  export type RiotMatchRoundSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riotMatchesId?: boolean
    RiotMatches?: boolean | RiotMatchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riotMatchRound"]>

  export type RiotMatchRoundSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riotMatchesId?: boolean
    RiotMatches?: boolean | RiotMatchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riotMatchRound"]>

  export type RiotMatchRoundSelectScalar = {
    id?: boolean
    riotMatchesId?: boolean
  }

  export type RiotMatchRoundInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RiotMatches?: boolean | RiotMatchesDefaultArgs<ExtArgs>
  }
  export type RiotMatchRoundIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RiotMatches?: boolean | RiotMatchesDefaultArgs<ExtArgs>
  }

  export type $RiotMatchRoundPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiotMatchRound"
    objects: {
      RiotMatches: Prisma.$RiotMatchesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      riotMatchesId: string
    }, ExtArgs["result"]["riotMatchRound"]>
    composites: {}
  }

  type RiotMatchRoundGetPayload<S extends boolean | null | undefined | RiotMatchRoundDefaultArgs> = $Result.GetResult<Prisma.$RiotMatchRoundPayload, S>

  type RiotMatchRoundCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiotMatchRoundFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiotMatchRoundCountAggregateInputType | true
    }

  export interface RiotMatchRoundDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiotMatchRound'], meta: { name: 'RiotMatchRound' } }
    /**
     * Find zero or one RiotMatchRound that matches the filter.
     * @param {RiotMatchRoundFindUniqueArgs} args - Arguments to find a RiotMatchRound
     * @example
     * // Get one RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiotMatchRoundFindUniqueArgs>(args: SelectSubset<T, RiotMatchRoundFindUniqueArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiotMatchRound that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiotMatchRoundFindUniqueOrThrowArgs} args - Arguments to find a RiotMatchRound
     * @example
     * // Get one RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiotMatchRoundFindUniqueOrThrowArgs>(args: SelectSubset<T, RiotMatchRoundFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiotMatchRound that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundFindFirstArgs} args - Arguments to find a RiotMatchRound
     * @example
     * // Get one RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiotMatchRoundFindFirstArgs>(args?: SelectSubset<T, RiotMatchRoundFindFirstArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiotMatchRound that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundFindFirstOrThrowArgs} args - Arguments to find a RiotMatchRound
     * @example
     * // Get one RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiotMatchRoundFindFirstOrThrowArgs>(args?: SelectSubset<T, RiotMatchRoundFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiotMatchRounds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiotMatchRounds
     * const riotMatchRounds = await prisma.riotMatchRound.findMany()
     * 
     * // Get first 10 RiotMatchRounds
     * const riotMatchRounds = await prisma.riotMatchRound.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riotMatchRoundWithIdOnly = await prisma.riotMatchRound.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiotMatchRoundFindManyArgs>(args?: SelectSubset<T, RiotMatchRoundFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiotMatchRound.
     * @param {RiotMatchRoundCreateArgs} args - Arguments to create a RiotMatchRound.
     * @example
     * // Create one RiotMatchRound
     * const RiotMatchRound = await prisma.riotMatchRound.create({
     *   data: {
     *     // ... data to create a RiotMatchRound
     *   }
     * })
     * 
     */
    create<T extends RiotMatchRoundCreateArgs>(args: SelectSubset<T, RiotMatchRoundCreateArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiotMatchRounds.
     * @param {RiotMatchRoundCreateManyArgs} args - Arguments to create many RiotMatchRounds.
     * @example
     * // Create many RiotMatchRounds
     * const riotMatchRound = await prisma.riotMatchRound.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiotMatchRoundCreateManyArgs>(args?: SelectSubset<T, RiotMatchRoundCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiotMatchRounds and returns the data saved in the database.
     * @param {RiotMatchRoundCreateManyAndReturnArgs} args - Arguments to create many RiotMatchRounds.
     * @example
     * // Create many RiotMatchRounds
     * const riotMatchRound = await prisma.riotMatchRound.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiotMatchRounds and only return the `id`
     * const riotMatchRoundWithIdOnly = await prisma.riotMatchRound.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiotMatchRoundCreateManyAndReturnArgs>(args?: SelectSubset<T, RiotMatchRoundCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiotMatchRound.
     * @param {RiotMatchRoundDeleteArgs} args - Arguments to delete one RiotMatchRound.
     * @example
     * // Delete one RiotMatchRound
     * const RiotMatchRound = await prisma.riotMatchRound.delete({
     *   where: {
     *     // ... filter to delete one RiotMatchRound
     *   }
     * })
     * 
     */
    delete<T extends RiotMatchRoundDeleteArgs>(args: SelectSubset<T, RiotMatchRoundDeleteArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiotMatchRound.
     * @param {RiotMatchRoundUpdateArgs} args - Arguments to update one RiotMatchRound.
     * @example
     * // Update one RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiotMatchRoundUpdateArgs>(args: SelectSubset<T, RiotMatchRoundUpdateArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiotMatchRounds.
     * @param {RiotMatchRoundDeleteManyArgs} args - Arguments to filter RiotMatchRounds to delete.
     * @example
     * // Delete a few RiotMatchRounds
     * const { count } = await prisma.riotMatchRound.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiotMatchRoundDeleteManyArgs>(args?: SelectSubset<T, RiotMatchRoundDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiotMatchRounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiotMatchRounds
     * const riotMatchRound = await prisma.riotMatchRound.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiotMatchRoundUpdateManyArgs>(args: SelectSubset<T, RiotMatchRoundUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiotMatchRound.
     * @param {RiotMatchRoundUpsertArgs} args - Arguments to update or create a RiotMatchRound.
     * @example
     * // Update or create a RiotMatchRound
     * const riotMatchRound = await prisma.riotMatchRound.upsert({
     *   create: {
     *     // ... data to create a RiotMatchRound
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiotMatchRound we want to update
     *   }
     * })
     */
    upsert<T extends RiotMatchRoundUpsertArgs>(args: SelectSubset<T, RiotMatchRoundUpsertArgs<ExtArgs>>): Prisma__RiotMatchRoundClient<$Result.GetResult<Prisma.$RiotMatchRoundPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiotMatchRounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundCountArgs} args - Arguments to filter RiotMatchRounds to count.
     * @example
     * // Count the number of RiotMatchRounds
     * const count = await prisma.riotMatchRound.count({
     *   where: {
     *     // ... the filter for the RiotMatchRounds we want to count
     *   }
     * })
    **/
    count<T extends RiotMatchRoundCountArgs>(
      args?: Subset<T, RiotMatchRoundCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiotMatchRoundCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiotMatchRound.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RiotMatchRoundAggregateArgs>(args: Subset<T, RiotMatchRoundAggregateArgs>): Prisma.PrismaPromise<GetRiotMatchRoundAggregateType<T>>

    /**
     * Group by RiotMatchRound.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchRoundGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RiotMatchRoundGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiotMatchRoundGroupByArgs['orderBy'] }
        : { orderBy?: RiotMatchRoundGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RiotMatchRoundGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiotMatchRoundGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiotMatchRound model
   */
  readonly fields: RiotMatchRoundFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiotMatchRound.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiotMatchRoundClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    RiotMatches<T extends RiotMatchesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatchesDefaultArgs<ExtArgs>>): Prisma__RiotMatchesClient<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RiotMatchRound model
   */ 
  interface RiotMatchRoundFieldRefs {
    readonly id: FieldRef<"RiotMatchRound", 'String'>
    readonly riotMatchesId: FieldRef<"RiotMatchRound", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RiotMatchRound findUnique
   */
  export type RiotMatchRoundFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchRound to fetch.
     */
    where: RiotMatchRoundWhereUniqueInput
  }

  /**
   * RiotMatchRound findUniqueOrThrow
   */
  export type RiotMatchRoundFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchRound to fetch.
     */
    where: RiotMatchRoundWhereUniqueInput
  }

  /**
   * RiotMatchRound findFirst
   */
  export type RiotMatchRoundFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchRound to fetch.
     */
    where?: RiotMatchRoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchRounds to fetch.
     */
    orderBy?: RiotMatchRoundOrderByWithRelationInput | RiotMatchRoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatchRounds.
     */
    cursor?: RiotMatchRoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchRounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchRounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatchRounds.
     */
    distinct?: RiotMatchRoundScalarFieldEnum | RiotMatchRoundScalarFieldEnum[]
  }

  /**
   * RiotMatchRound findFirstOrThrow
   */
  export type RiotMatchRoundFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchRound to fetch.
     */
    where?: RiotMatchRoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchRounds to fetch.
     */
    orderBy?: RiotMatchRoundOrderByWithRelationInput | RiotMatchRoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatchRounds.
     */
    cursor?: RiotMatchRoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchRounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchRounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatchRounds.
     */
    distinct?: RiotMatchRoundScalarFieldEnum | RiotMatchRoundScalarFieldEnum[]
  }

  /**
   * RiotMatchRound findMany
   */
  export type RiotMatchRoundFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchRounds to fetch.
     */
    where?: RiotMatchRoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchRounds to fetch.
     */
    orderBy?: RiotMatchRoundOrderByWithRelationInput | RiotMatchRoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiotMatchRounds.
     */
    cursor?: RiotMatchRoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchRounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchRounds.
     */
    skip?: number
    distinct?: RiotMatchRoundScalarFieldEnum | RiotMatchRoundScalarFieldEnum[]
  }

  /**
   * RiotMatchRound create
   */
  export type RiotMatchRoundCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * The data needed to create a RiotMatchRound.
     */
    data: XOR<RiotMatchRoundCreateInput, RiotMatchRoundUncheckedCreateInput>
  }

  /**
   * RiotMatchRound createMany
   */
  export type RiotMatchRoundCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiotMatchRounds.
     */
    data: RiotMatchRoundCreateManyInput | RiotMatchRoundCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatchRound createManyAndReturn
   */
  export type RiotMatchRoundCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiotMatchRounds.
     */
    data: RiotMatchRoundCreateManyInput | RiotMatchRoundCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiotMatchRound update
   */
  export type RiotMatchRoundUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * The data needed to update a RiotMatchRound.
     */
    data: XOR<RiotMatchRoundUpdateInput, RiotMatchRoundUncheckedUpdateInput>
    /**
     * Choose, which RiotMatchRound to update.
     */
    where: RiotMatchRoundWhereUniqueInput
  }

  /**
   * RiotMatchRound updateMany
   */
  export type RiotMatchRoundUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiotMatchRounds.
     */
    data: XOR<RiotMatchRoundUpdateManyMutationInput, RiotMatchRoundUncheckedUpdateManyInput>
    /**
     * Filter which RiotMatchRounds to update
     */
    where?: RiotMatchRoundWhereInput
  }

  /**
   * RiotMatchRound upsert
   */
  export type RiotMatchRoundUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * The filter to search for the RiotMatchRound to update in case it exists.
     */
    where: RiotMatchRoundWhereUniqueInput
    /**
     * In case the RiotMatchRound found by the `where` argument doesn't exist, create a new RiotMatchRound with this data.
     */
    create: XOR<RiotMatchRoundCreateInput, RiotMatchRoundUncheckedCreateInput>
    /**
     * In case the RiotMatchRound was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiotMatchRoundUpdateInput, RiotMatchRoundUncheckedUpdateInput>
  }

  /**
   * RiotMatchRound delete
   */
  export type RiotMatchRoundDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
    /**
     * Filter which RiotMatchRound to delete.
     */
    where: RiotMatchRoundWhereUniqueInput
  }

  /**
   * RiotMatchRound deleteMany
   */
  export type RiotMatchRoundDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatchRounds to delete
     */
    where?: RiotMatchRoundWhereInput
  }

  /**
   * RiotMatchRound without action
   */
  export type RiotMatchRoundDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchRound
     */
    select?: RiotMatchRoundSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchRoundInclude<ExtArgs> | null
  }


  /**
   * Model RiotMatchPlayers
   */

  export type AggregateRiotMatchPlayers = {
    _count: RiotMatchPlayersCountAggregateOutputType | null
    _avg: RiotMatchPlayersAvgAggregateOutputType | null
    _sum: RiotMatchPlayersSumAggregateOutputType | null
    _min: RiotMatchPlayersMinAggregateOutputType | null
    _max: RiotMatchPlayersMaxAggregateOutputType | null
  }

  export type RiotMatchPlayersAvgAggregateOutputType = {
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    teamRoundsWon: number | null
  }

  export type RiotMatchPlayersSumAggregateOutputType = {
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    teamRoundsWon: number | null
  }

  export type RiotMatchPlayersMinAggregateOutputType = {
    id: string | null
    riotTag: string | null
    teamId: string | null
    characterId: string | null
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    playerCard: string | null
    playerTitle: string | null
    teamColor: $Enums.RiotMatchTeamColor | null
    teamWon: boolean | null
    teamRoundsWon: number | null
  }

  export type RiotMatchPlayersMaxAggregateOutputType = {
    id: string | null
    riotTag: string | null
    teamId: string | null
    characterId: string | null
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    playerCard: string | null
    playerTitle: string | null
    teamColor: $Enums.RiotMatchTeamColor | null
    teamWon: boolean | null
    teamRoundsWon: number | null
  }

  export type RiotMatchPlayersCountAggregateOutputType = {
    id: number
    riotTag: number
    teamId: number
    characterId: number
    kills: number
    deaths: number
    assists: number
    tier: number
    playerCard: number
    playerTitle: number
    teamColor: number
    teamWon: number
    teamRoundsWon: number
    _all: number
  }


  export type RiotMatchPlayersAvgAggregateInputType = {
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    teamRoundsWon?: true
  }

  export type RiotMatchPlayersSumAggregateInputType = {
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    teamRoundsWon?: true
  }

  export type RiotMatchPlayersMinAggregateInputType = {
    id?: true
    riotTag?: true
    teamId?: true
    characterId?: true
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    playerCard?: true
    playerTitle?: true
    teamColor?: true
    teamWon?: true
    teamRoundsWon?: true
  }

  export type RiotMatchPlayersMaxAggregateInputType = {
    id?: true
    riotTag?: true
    teamId?: true
    characterId?: true
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    playerCard?: true
    playerTitle?: true
    teamColor?: true
    teamWon?: true
    teamRoundsWon?: true
  }

  export type RiotMatchPlayersCountAggregateInputType = {
    id?: true
    riotTag?: true
    teamId?: true
    characterId?: true
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    playerCard?: true
    playerTitle?: true
    teamColor?: true
    teamWon?: true
    teamRoundsWon?: true
    _all?: true
  }

  export type RiotMatchPlayersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatchPlayers to aggregate.
     */
    where?: RiotMatchPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchPlayers to fetch.
     */
    orderBy?: RiotMatchPlayersOrderByWithRelationInput | RiotMatchPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiotMatchPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiotMatchPlayers
    **/
    _count?: true | RiotMatchPlayersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiotMatchPlayersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiotMatchPlayersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiotMatchPlayersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiotMatchPlayersMaxAggregateInputType
  }

  export type GetRiotMatchPlayersAggregateType<T extends RiotMatchPlayersAggregateArgs> = {
        [P in keyof T & keyof AggregateRiotMatchPlayers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiotMatchPlayers[P]>
      : GetScalarType<T[P], AggregateRiotMatchPlayers[P]>
  }




  export type RiotMatchPlayersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchPlayersWhereInput
    orderBy?: RiotMatchPlayersOrderByWithAggregationInput | RiotMatchPlayersOrderByWithAggregationInput[]
    by: RiotMatchPlayersScalarFieldEnum[] | RiotMatchPlayersScalarFieldEnum
    having?: RiotMatchPlayersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiotMatchPlayersCountAggregateInputType | true
    _avg?: RiotMatchPlayersAvgAggregateInputType
    _sum?: RiotMatchPlayersSumAggregateInputType
    _min?: RiotMatchPlayersMinAggregateInputType
    _max?: RiotMatchPlayersMaxAggregateInputType
  }

  export type RiotMatchPlayersGroupByOutputType = {
    id: string
    riotTag: string | null
    teamId: string | null
    characterId: string | null
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    playerCard: string | null
    playerTitle: string | null
    teamColor: $Enums.RiotMatchTeamColor | null
    teamWon: boolean | null
    teamRoundsWon: number | null
    _count: RiotMatchPlayersCountAggregateOutputType | null
    _avg: RiotMatchPlayersAvgAggregateOutputType | null
    _sum: RiotMatchPlayersSumAggregateOutputType | null
    _min: RiotMatchPlayersMinAggregateOutputType | null
    _max: RiotMatchPlayersMaxAggregateOutputType | null
  }

  type GetRiotMatchPlayersGroupByPayload<T extends RiotMatchPlayersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiotMatchPlayersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiotMatchPlayersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiotMatchPlayersGroupByOutputType[P]>
            : GetScalarType<T[P], RiotMatchPlayersGroupByOutputType[P]>
        }
      >
    >


  export type RiotMatchPlayersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riotTag?: boolean
    teamId?: boolean
    characterId?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    tier?: boolean
    playerCard?: boolean
    playerTitle?: boolean
    teamColor?: boolean
    teamWon?: boolean
    teamRoundsWon?: boolean
    riotMatches?: boolean | RiotMatchPlayers$riotMatchesArgs<ExtArgs>
    _count?: boolean | RiotMatchPlayersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riotMatchPlayers"]>

  export type RiotMatchPlayersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riotTag?: boolean
    teamId?: boolean
    characterId?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    tier?: boolean
    playerCard?: boolean
    playerTitle?: boolean
    teamColor?: boolean
    teamWon?: boolean
    teamRoundsWon?: boolean
  }, ExtArgs["result"]["riotMatchPlayers"]>

  export type RiotMatchPlayersSelectScalar = {
    id?: boolean
    riotTag?: boolean
    teamId?: boolean
    characterId?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    tier?: boolean
    playerCard?: boolean
    playerTitle?: boolean
    teamColor?: boolean
    teamWon?: boolean
    teamRoundsWon?: boolean
  }

  export type RiotMatchPlayersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riotMatches?: boolean | RiotMatchPlayers$riotMatchesArgs<ExtArgs>
    _count?: boolean | RiotMatchPlayersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RiotMatchPlayersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RiotMatchPlayersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiotMatchPlayers"
    objects: {
      riotMatches: Prisma.$RiotMatchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      riotTag: string | null
      teamId: string | null
      characterId: string | null
      kills: number | null
      deaths: number | null
      assists: number | null
      tier: number | null
      playerCard: string | null
      playerTitle: string | null
      teamColor: $Enums.RiotMatchTeamColor | null
      teamWon: boolean | null
      teamRoundsWon: number | null
    }, ExtArgs["result"]["riotMatchPlayers"]>
    composites: {}
  }

  type RiotMatchPlayersGetPayload<S extends boolean | null | undefined | RiotMatchPlayersDefaultArgs> = $Result.GetResult<Prisma.$RiotMatchPlayersPayload, S>

  type RiotMatchPlayersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiotMatchPlayersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiotMatchPlayersCountAggregateInputType | true
    }

  export interface RiotMatchPlayersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiotMatchPlayers'], meta: { name: 'RiotMatchPlayers' } }
    /**
     * Find zero or one RiotMatchPlayers that matches the filter.
     * @param {RiotMatchPlayersFindUniqueArgs} args - Arguments to find a RiotMatchPlayers
     * @example
     * // Get one RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiotMatchPlayersFindUniqueArgs>(args: SelectSubset<T, RiotMatchPlayersFindUniqueArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiotMatchPlayers that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiotMatchPlayersFindUniqueOrThrowArgs} args - Arguments to find a RiotMatchPlayers
     * @example
     * // Get one RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiotMatchPlayersFindUniqueOrThrowArgs>(args: SelectSubset<T, RiotMatchPlayersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiotMatchPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersFindFirstArgs} args - Arguments to find a RiotMatchPlayers
     * @example
     * // Get one RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiotMatchPlayersFindFirstArgs>(args?: SelectSubset<T, RiotMatchPlayersFindFirstArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiotMatchPlayers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersFindFirstOrThrowArgs} args - Arguments to find a RiotMatchPlayers
     * @example
     * // Get one RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiotMatchPlayersFindFirstOrThrowArgs>(args?: SelectSubset<T, RiotMatchPlayersFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiotMatchPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findMany()
     * 
     * // Get first 10 RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riotMatchPlayersWithIdOnly = await prisma.riotMatchPlayers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiotMatchPlayersFindManyArgs>(args?: SelectSubset<T, RiotMatchPlayersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiotMatchPlayers.
     * @param {RiotMatchPlayersCreateArgs} args - Arguments to create a RiotMatchPlayers.
     * @example
     * // Create one RiotMatchPlayers
     * const RiotMatchPlayers = await prisma.riotMatchPlayers.create({
     *   data: {
     *     // ... data to create a RiotMatchPlayers
     *   }
     * })
     * 
     */
    create<T extends RiotMatchPlayersCreateArgs>(args: SelectSubset<T, RiotMatchPlayersCreateArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiotMatchPlayers.
     * @param {RiotMatchPlayersCreateManyArgs} args - Arguments to create many RiotMatchPlayers.
     * @example
     * // Create many RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiotMatchPlayersCreateManyArgs>(args?: SelectSubset<T, RiotMatchPlayersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiotMatchPlayers and returns the data saved in the database.
     * @param {RiotMatchPlayersCreateManyAndReturnArgs} args - Arguments to create many RiotMatchPlayers.
     * @example
     * // Create many RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiotMatchPlayers and only return the `id`
     * const riotMatchPlayersWithIdOnly = await prisma.riotMatchPlayers.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiotMatchPlayersCreateManyAndReturnArgs>(args?: SelectSubset<T, RiotMatchPlayersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiotMatchPlayers.
     * @param {RiotMatchPlayersDeleteArgs} args - Arguments to delete one RiotMatchPlayers.
     * @example
     * // Delete one RiotMatchPlayers
     * const RiotMatchPlayers = await prisma.riotMatchPlayers.delete({
     *   where: {
     *     // ... filter to delete one RiotMatchPlayers
     *   }
     * })
     * 
     */
    delete<T extends RiotMatchPlayersDeleteArgs>(args: SelectSubset<T, RiotMatchPlayersDeleteArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiotMatchPlayers.
     * @param {RiotMatchPlayersUpdateArgs} args - Arguments to update one RiotMatchPlayers.
     * @example
     * // Update one RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiotMatchPlayersUpdateArgs>(args: SelectSubset<T, RiotMatchPlayersUpdateArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiotMatchPlayers.
     * @param {RiotMatchPlayersDeleteManyArgs} args - Arguments to filter RiotMatchPlayers to delete.
     * @example
     * // Delete a few RiotMatchPlayers
     * const { count } = await prisma.riotMatchPlayers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiotMatchPlayersDeleteManyArgs>(args?: SelectSubset<T, RiotMatchPlayersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiotMatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiotMatchPlayersUpdateManyArgs>(args: SelectSubset<T, RiotMatchPlayersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiotMatchPlayers.
     * @param {RiotMatchPlayersUpsertArgs} args - Arguments to update or create a RiotMatchPlayers.
     * @example
     * // Update or create a RiotMatchPlayers
     * const riotMatchPlayers = await prisma.riotMatchPlayers.upsert({
     *   create: {
     *     // ... data to create a RiotMatchPlayers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiotMatchPlayers we want to update
     *   }
     * })
     */
    upsert<T extends RiotMatchPlayersUpsertArgs>(args: SelectSubset<T, RiotMatchPlayersUpsertArgs<ExtArgs>>): Prisma__RiotMatchPlayersClient<$Result.GetResult<Prisma.$RiotMatchPlayersPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiotMatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersCountArgs} args - Arguments to filter RiotMatchPlayers to count.
     * @example
     * // Count the number of RiotMatchPlayers
     * const count = await prisma.riotMatchPlayers.count({
     *   where: {
     *     // ... the filter for the RiotMatchPlayers we want to count
     *   }
     * })
    **/
    count<T extends RiotMatchPlayersCountArgs>(
      args?: Subset<T, RiotMatchPlayersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiotMatchPlayersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiotMatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RiotMatchPlayersAggregateArgs>(args: Subset<T, RiotMatchPlayersAggregateArgs>): Prisma.PrismaPromise<GetRiotMatchPlayersAggregateType<T>>

    /**
     * Group by RiotMatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchPlayersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RiotMatchPlayersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiotMatchPlayersGroupByArgs['orderBy'] }
        : { orderBy?: RiotMatchPlayersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RiotMatchPlayersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiotMatchPlayersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiotMatchPlayers model
   */
  readonly fields: RiotMatchPlayersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiotMatchPlayers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiotMatchPlayersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    riotMatches<T extends RiotMatchPlayers$riotMatchesArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatchPlayers$riotMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchesPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RiotMatchPlayers model
   */ 
  interface RiotMatchPlayersFieldRefs {
    readonly id: FieldRef<"RiotMatchPlayers", 'String'>
    readonly riotTag: FieldRef<"RiotMatchPlayers", 'String'>
    readonly teamId: FieldRef<"RiotMatchPlayers", 'String'>
    readonly characterId: FieldRef<"RiotMatchPlayers", 'String'>
    readonly kills: FieldRef<"RiotMatchPlayers", 'Int'>
    readonly deaths: FieldRef<"RiotMatchPlayers", 'Int'>
    readonly assists: FieldRef<"RiotMatchPlayers", 'Int'>
    readonly tier: FieldRef<"RiotMatchPlayers", 'Int'>
    readonly playerCard: FieldRef<"RiotMatchPlayers", 'String'>
    readonly playerTitle: FieldRef<"RiotMatchPlayers", 'String'>
    readonly teamColor: FieldRef<"RiotMatchPlayers", 'RiotMatchTeamColor'>
    readonly teamWon: FieldRef<"RiotMatchPlayers", 'Boolean'>
    readonly teamRoundsWon: FieldRef<"RiotMatchPlayers", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RiotMatchPlayers findUnique
   */
  export type RiotMatchPlayersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchPlayers to fetch.
     */
    where: RiotMatchPlayersWhereUniqueInput
  }

  /**
   * RiotMatchPlayers findUniqueOrThrow
   */
  export type RiotMatchPlayersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchPlayers to fetch.
     */
    where: RiotMatchPlayersWhereUniqueInput
  }

  /**
   * RiotMatchPlayers findFirst
   */
  export type RiotMatchPlayersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchPlayers to fetch.
     */
    where?: RiotMatchPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchPlayers to fetch.
     */
    orderBy?: RiotMatchPlayersOrderByWithRelationInput | RiotMatchPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatchPlayers.
     */
    cursor?: RiotMatchPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatchPlayers.
     */
    distinct?: RiotMatchPlayersScalarFieldEnum | RiotMatchPlayersScalarFieldEnum[]
  }

  /**
   * RiotMatchPlayers findFirstOrThrow
   */
  export type RiotMatchPlayersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchPlayers to fetch.
     */
    where?: RiotMatchPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchPlayers to fetch.
     */
    orderBy?: RiotMatchPlayersOrderByWithRelationInput | RiotMatchPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatchPlayers.
     */
    cursor?: RiotMatchPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiotMatchPlayers.
     */
    distinct?: RiotMatchPlayersScalarFieldEnum | RiotMatchPlayersScalarFieldEnum[]
  }

  /**
   * RiotMatchPlayers findMany
   */
  export type RiotMatchPlayersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatchPlayers to fetch.
     */
    where?: RiotMatchPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatchPlayers to fetch.
     */
    orderBy?: RiotMatchPlayersOrderByWithRelationInput | RiotMatchPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiotMatchPlayers.
     */
    cursor?: RiotMatchPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiotMatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiotMatchPlayers.
     */
    skip?: number
    distinct?: RiotMatchPlayersScalarFieldEnum | RiotMatchPlayersScalarFieldEnum[]
  }

  /**
   * RiotMatchPlayers create
   */
  export type RiotMatchPlayersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * The data needed to create a RiotMatchPlayers.
     */
    data: XOR<RiotMatchPlayersCreateInput, RiotMatchPlayersUncheckedCreateInput>
  }

  /**
   * RiotMatchPlayers createMany
   */
  export type RiotMatchPlayersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiotMatchPlayers.
     */
    data: RiotMatchPlayersCreateManyInput | RiotMatchPlayersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatchPlayers createManyAndReturn
   */
  export type RiotMatchPlayersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiotMatchPlayers.
     */
    data: RiotMatchPlayersCreateManyInput | RiotMatchPlayersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatchPlayers update
   */
  export type RiotMatchPlayersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * The data needed to update a RiotMatchPlayers.
     */
    data: XOR<RiotMatchPlayersUpdateInput, RiotMatchPlayersUncheckedUpdateInput>
    /**
     * Choose, which RiotMatchPlayers to update.
     */
    where: RiotMatchPlayersWhereUniqueInput
  }

  /**
   * RiotMatchPlayers updateMany
   */
  export type RiotMatchPlayersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiotMatchPlayers.
     */
    data: XOR<RiotMatchPlayersUpdateManyMutationInput, RiotMatchPlayersUncheckedUpdateManyInput>
    /**
     * Filter which RiotMatchPlayers to update
     */
    where?: RiotMatchPlayersWhereInput
  }

  /**
   * RiotMatchPlayers upsert
   */
  export type RiotMatchPlayersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * The filter to search for the RiotMatchPlayers to update in case it exists.
     */
    where: RiotMatchPlayersWhereUniqueInput
    /**
     * In case the RiotMatchPlayers found by the `where` argument doesn't exist, create a new RiotMatchPlayers with this data.
     */
    create: XOR<RiotMatchPlayersCreateInput, RiotMatchPlayersUncheckedCreateInput>
    /**
     * In case the RiotMatchPlayers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiotMatchPlayersUpdateInput, RiotMatchPlayersUncheckedUpdateInput>
  }

  /**
   * RiotMatchPlayers delete
   */
  export type RiotMatchPlayersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
    /**
     * Filter which RiotMatchPlayers to delete.
     */
    where: RiotMatchPlayersWhereUniqueInput
  }

  /**
   * RiotMatchPlayers deleteMany
   */
  export type RiotMatchPlayersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatchPlayers to delete
     */
    where?: RiotMatchPlayersWhereInput
  }

  /**
   * RiotMatchPlayers.riotMatches
   */
  export type RiotMatchPlayers$riotMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatches
     */
    select?: RiotMatchesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchesInclude<ExtArgs> | null
    where?: RiotMatchesWhereInput
    orderBy?: RiotMatchesOrderByWithRelationInput | RiotMatchesOrderByWithRelationInput[]
    cursor?: RiotMatchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiotMatchesScalarFieldEnum | RiotMatchesScalarFieldEnum[]
  }

  /**
   * RiotMatchPlayers without action
   */
  export type RiotMatchPlayersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchPlayers
     */
    select?: RiotMatchPlayersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchPlayersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    discordId: 'discordId',
    discordName: 'discordName',
    riotEntitlement: 'riotEntitlement',
    riotAuth: 'riotAuth',
    riotPuuid: 'riotPuuid',
    riotTag: 'riotTag'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const RiotMatchesScalarFieldEnum: {
    id: 'id',
    mapId: 'mapId',
    gameVersion: 'gameVersion',
    gameStart: 'gameStart',
    gameEnd: 'gameEnd',
    isCompleted: 'isCompleted',
    queueId: 'queueId',
    isRanked: 'isRanked',
    seasonId: 'seasonId',
    roundsPlayed: 'roundsPlayed',
    teamWon: 'teamWon',
    teamRedRoundsWon: 'teamRedRoundsWon',
    teamBlueRoundsWon: 'teamBlueRoundsWon',
    riotMatchPlayersId: 'riotMatchPlayersId'
  };

  export type RiotMatchesScalarFieldEnum = (typeof RiotMatchesScalarFieldEnum)[keyof typeof RiotMatchesScalarFieldEnum]


  export const RiotMatchRoundScalarFieldEnum: {
    id: 'id',
    riotMatchesId: 'riotMatchesId'
  };

  export type RiotMatchRoundScalarFieldEnum = (typeof RiotMatchRoundScalarFieldEnum)[keyof typeof RiotMatchRoundScalarFieldEnum]


  export const RiotMatchPlayersScalarFieldEnum: {
    id: 'id',
    riotTag: 'riotTag',
    teamId: 'teamId',
    characterId: 'characterId',
    kills: 'kills',
    deaths: 'deaths',
    assists: 'assists',
    tier: 'tier',
    playerCard: 'playerCard',
    playerTitle: 'playerTitle',
    teamColor: 'teamColor',
    teamWon: 'teamWon',
    teamRoundsWon: 'teamRoundsWon'
  };

  export type RiotMatchPlayersScalarFieldEnum = (typeof RiotMatchPlayersScalarFieldEnum)[keyof typeof RiotMatchPlayersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RiotMatchTeamColor'
   */
  export type EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiotMatchTeamColor'>
    


  /**
   * Reference to a field of type 'RiotMatchTeamColor[]'
   */
  export type ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiotMatchTeamColor[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    discordId?: StringFilter<"User"> | string
    discordName?: StringFilter<"User"> | string
    riotEntitlement?: StringNullableFilter<"User"> | string | null
    riotAuth?: StringNullableFilter<"User"> | string | null
    riotPuuid?: StringNullableFilter<"User"> | string | null
    riotTag?: StringNullableFilter<"User"> | string | null
    Session?: SessionListRelationFilter
    riotMatches?: RiotMatchesListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    discordId?: SortOrder
    discordName?: SortOrder
    riotEntitlement?: SortOrderInput | SortOrder
    riotAuth?: SortOrderInput | SortOrder
    riotPuuid?: SortOrderInput | SortOrder
    riotTag?: SortOrderInput | SortOrder
    Session?: SessionOrderByRelationAggregateInput
    riotMatches?: RiotMatchesOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    discordId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    discordName?: StringFilter<"User"> | string
    riotEntitlement?: StringNullableFilter<"User"> | string | null
    riotAuth?: StringNullableFilter<"User"> | string | null
    riotPuuid?: StringNullableFilter<"User"> | string | null
    riotTag?: StringNullableFilter<"User"> | string | null
    Session?: SessionListRelationFilter
    riotMatches?: RiotMatchesListRelationFilter
  }, "id" | "discordId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    discordId?: SortOrder
    discordName?: SortOrder
    riotEntitlement?: SortOrderInput | SortOrder
    riotAuth?: SortOrderInput | SortOrder
    riotPuuid?: SortOrderInput | SortOrder
    riotTag?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    discordId?: StringWithAggregatesFilter<"User"> | string
    discordName?: StringWithAggregatesFilter<"User"> | string
    riotEntitlement?: StringNullableWithAggregatesFilter<"User"> | string | null
    riotAuth?: StringNullableWithAggregatesFilter<"User"> | string | null
    riotPuuid?: StringNullableWithAggregatesFilter<"User"> | string | null
    riotTag?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type RiotMatchesWhereInput = {
    AND?: RiotMatchesWhereInput | RiotMatchesWhereInput[]
    OR?: RiotMatchesWhereInput[]
    NOT?: RiotMatchesWhereInput | RiotMatchesWhereInput[]
    id?: StringFilter<"RiotMatches"> | string
    mapId?: StringNullableFilter<"RiotMatches"> | string | null
    gameVersion?: StringNullableFilter<"RiotMatches"> | string | null
    gameStart?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    gameEnd?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    isCompleted?: BoolNullableFilter<"RiotMatches"> | boolean | null
    queueId?: StringNullableFilter<"RiotMatches"> | string | null
    isRanked?: BoolNullableFilter<"RiotMatches"> | boolean | null
    seasonId?: StringNullableFilter<"RiotMatches"> | string | null
    roundsPlayed?: IntNullableFilter<"RiotMatches"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableFilter<"RiotMatches"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    teamBlueRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    riotMatchPlayersId?: StringNullableFilter<"RiotMatches"> | string | null
    users?: UserListRelationFilter
    rounds?: RiotMatchRoundListRelationFilter
    matchPlayers?: RiotMatchPlayersListRelationFilter
  }

  export type RiotMatchesOrderByWithRelationInput = {
    id?: SortOrder
    mapId?: SortOrderInput | SortOrder
    gameVersion?: SortOrderInput | SortOrder
    gameStart?: SortOrderInput | SortOrder
    gameEnd?: SortOrderInput | SortOrder
    isCompleted?: SortOrderInput | SortOrder
    queueId?: SortOrderInput | SortOrder
    isRanked?: SortOrderInput | SortOrder
    seasonId?: SortOrderInput | SortOrder
    roundsPlayed?: SortOrderInput | SortOrder
    teamWon?: SortOrderInput | SortOrder
    teamRedRoundsWon?: SortOrderInput | SortOrder
    teamBlueRoundsWon?: SortOrderInput | SortOrder
    riotMatchPlayersId?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
    rounds?: RiotMatchRoundOrderByRelationAggregateInput
    matchPlayers?: RiotMatchPlayersOrderByRelationAggregateInput
  }

  export type RiotMatchesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiotMatchesWhereInput | RiotMatchesWhereInput[]
    OR?: RiotMatchesWhereInput[]
    NOT?: RiotMatchesWhereInput | RiotMatchesWhereInput[]
    mapId?: StringNullableFilter<"RiotMatches"> | string | null
    gameVersion?: StringNullableFilter<"RiotMatches"> | string | null
    gameStart?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    gameEnd?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    isCompleted?: BoolNullableFilter<"RiotMatches"> | boolean | null
    queueId?: StringNullableFilter<"RiotMatches"> | string | null
    isRanked?: BoolNullableFilter<"RiotMatches"> | boolean | null
    seasonId?: StringNullableFilter<"RiotMatches"> | string | null
    roundsPlayed?: IntNullableFilter<"RiotMatches"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableFilter<"RiotMatches"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    teamBlueRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    riotMatchPlayersId?: StringNullableFilter<"RiotMatches"> | string | null
    users?: UserListRelationFilter
    rounds?: RiotMatchRoundListRelationFilter
    matchPlayers?: RiotMatchPlayersListRelationFilter
  }, "id">

  export type RiotMatchesOrderByWithAggregationInput = {
    id?: SortOrder
    mapId?: SortOrderInput | SortOrder
    gameVersion?: SortOrderInput | SortOrder
    gameStart?: SortOrderInput | SortOrder
    gameEnd?: SortOrderInput | SortOrder
    isCompleted?: SortOrderInput | SortOrder
    queueId?: SortOrderInput | SortOrder
    isRanked?: SortOrderInput | SortOrder
    seasonId?: SortOrderInput | SortOrder
    roundsPlayed?: SortOrderInput | SortOrder
    teamWon?: SortOrderInput | SortOrder
    teamRedRoundsWon?: SortOrderInput | SortOrder
    teamBlueRoundsWon?: SortOrderInput | SortOrder
    riotMatchPlayersId?: SortOrderInput | SortOrder
    _count?: RiotMatchesCountOrderByAggregateInput
    _avg?: RiotMatchesAvgOrderByAggregateInput
    _max?: RiotMatchesMaxOrderByAggregateInput
    _min?: RiotMatchesMinOrderByAggregateInput
    _sum?: RiotMatchesSumOrderByAggregateInput
  }

  export type RiotMatchesScalarWhereWithAggregatesInput = {
    AND?: RiotMatchesScalarWhereWithAggregatesInput | RiotMatchesScalarWhereWithAggregatesInput[]
    OR?: RiotMatchesScalarWhereWithAggregatesInput[]
    NOT?: RiotMatchesScalarWhereWithAggregatesInput | RiotMatchesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiotMatches"> | string
    mapId?: StringNullableWithAggregatesFilter<"RiotMatches"> | string | null
    gameVersion?: StringNullableWithAggregatesFilter<"RiotMatches"> | string | null
    gameStart?: DateTimeNullableWithAggregatesFilter<"RiotMatches"> | Date | string | null
    gameEnd?: DateTimeNullableWithAggregatesFilter<"RiotMatches"> | Date | string | null
    isCompleted?: BoolNullableWithAggregatesFilter<"RiotMatches"> | boolean | null
    queueId?: StringNullableWithAggregatesFilter<"RiotMatches"> | string | null
    isRanked?: BoolNullableWithAggregatesFilter<"RiotMatches"> | boolean | null
    seasonId?: StringNullableWithAggregatesFilter<"RiotMatches"> | string | null
    roundsPlayed?: IntNullableWithAggregatesFilter<"RiotMatches"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableWithAggregatesFilter<"RiotMatches"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableWithAggregatesFilter<"RiotMatches"> | number | null
    teamBlueRoundsWon?: IntNullableWithAggregatesFilter<"RiotMatches"> | number | null
    riotMatchPlayersId?: StringNullableWithAggregatesFilter<"RiotMatches"> | string | null
  }

  export type RiotMatchRoundWhereInput = {
    AND?: RiotMatchRoundWhereInput | RiotMatchRoundWhereInput[]
    OR?: RiotMatchRoundWhereInput[]
    NOT?: RiotMatchRoundWhereInput | RiotMatchRoundWhereInput[]
    id?: StringFilter<"RiotMatchRound"> | string
    riotMatchesId?: StringFilter<"RiotMatchRound"> | string
    RiotMatches?: XOR<RiotMatchesScalarRelationFilter, RiotMatchesWhereInput>
  }

  export type RiotMatchRoundOrderByWithRelationInput = {
    id?: SortOrder
    riotMatchesId?: SortOrder
    RiotMatches?: RiotMatchesOrderByWithRelationInput
  }

  export type RiotMatchRoundWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiotMatchRoundWhereInput | RiotMatchRoundWhereInput[]
    OR?: RiotMatchRoundWhereInput[]
    NOT?: RiotMatchRoundWhereInput | RiotMatchRoundWhereInput[]
    riotMatchesId?: StringFilter<"RiotMatchRound"> | string
    RiotMatches?: XOR<RiotMatchesScalarRelationFilter, RiotMatchesWhereInput>
  }, "id">

  export type RiotMatchRoundOrderByWithAggregationInput = {
    id?: SortOrder
    riotMatchesId?: SortOrder
    _count?: RiotMatchRoundCountOrderByAggregateInput
    _max?: RiotMatchRoundMaxOrderByAggregateInput
    _min?: RiotMatchRoundMinOrderByAggregateInput
  }

  export type RiotMatchRoundScalarWhereWithAggregatesInput = {
    AND?: RiotMatchRoundScalarWhereWithAggregatesInput | RiotMatchRoundScalarWhereWithAggregatesInput[]
    OR?: RiotMatchRoundScalarWhereWithAggregatesInput[]
    NOT?: RiotMatchRoundScalarWhereWithAggregatesInput | RiotMatchRoundScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiotMatchRound"> | string
    riotMatchesId?: StringWithAggregatesFilter<"RiotMatchRound"> | string
  }

  export type RiotMatchPlayersWhereInput = {
    AND?: RiotMatchPlayersWhereInput | RiotMatchPlayersWhereInput[]
    OR?: RiotMatchPlayersWhereInput[]
    NOT?: RiotMatchPlayersWhereInput | RiotMatchPlayersWhereInput[]
    id?: StringFilter<"RiotMatchPlayers"> | string
    riotTag?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    characterId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    kills?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    deaths?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    assists?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    tier?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    playerCard?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    playerTitle?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"RiotMatchPlayers"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"RiotMatchPlayers"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    riotMatches?: RiotMatchesListRelationFilter
  }

  export type RiotMatchPlayersOrderByWithRelationInput = {
    id?: SortOrder
    riotTag?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    characterId?: SortOrderInput | SortOrder
    kills?: SortOrderInput | SortOrder
    deaths?: SortOrderInput | SortOrder
    assists?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    playerCard?: SortOrderInput | SortOrder
    playerTitle?: SortOrderInput | SortOrder
    teamColor?: SortOrderInput | SortOrder
    teamWon?: SortOrderInput | SortOrder
    teamRoundsWon?: SortOrderInput | SortOrder
    riotMatches?: RiotMatchesOrderByRelationAggregateInput
  }

  export type RiotMatchPlayersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiotMatchPlayersWhereInput | RiotMatchPlayersWhereInput[]
    OR?: RiotMatchPlayersWhereInput[]
    NOT?: RiotMatchPlayersWhereInput | RiotMatchPlayersWhereInput[]
    riotTag?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    characterId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    kills?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    deaths?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    assists?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    tier?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    playerCard?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    playerTitle?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"RiotMatchPlayers"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"RiotMatchPlayers"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    riotMatches?: RiotMatchesListRelationFilter
  }, "id">

  export type RiotMatchPlayersOrderByWithAggregationInput = {
    id?: SortOrder
    riotTag?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    characterId?: SortOrderInput | SortOrder
    kills?: SortOrderInput | SortOrder
    deaths?: SortOrderInput | SortOrder
    assists?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    playerCard?: SortOrderInput | SortOrder
    playerTitle?: SortOrderInput | SortOrder
    teamColor?: SortOrderInput | SortOrder
    teamWon?: SortOrderInput | SortOrder
    teamRoundsWon?: SortOrderInput | SortOrder
    _count?: RiotMatchPlayersCountOrderByAggregateInput
    _avg?: RiotMatchPlayersAvgOrderByAggregateInput
    _max?: RiotMatchPlayersMaxOrderByAggregateInput
    _min?: RiotMatchPlayersMinOrderByAggregateInput
    _sum?: RiotMatchPlayersSumOrderByAggregateInput
  }

  export type RiotMatchPlayersScalarWhereWithAggregatesInput = {
    AND?: RiotMatchPlayersScalarWhereWithAggregatesInput | RiotMatchPlayersScalarWhereWithAggregatesInput[]
    OR?: RiotMatchPlayersScalarWhereWithAggregatesInput[]
    NOT?: RiotMatchPlayersScalarWhereWithAggregatesInput | RiotMatchPlayersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiotMatchPlayers"> | string
    riotTag?: StringNullableWithAggregatesFilter<"RiotMatchPlayers"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"RiotMatchPlayers"> | string | null
    characterId?: StringNullableWithAggregatesFilter<"RiotMatchPlayers"> | string | null
    kills?: IntNullableWithAggregatesFilter<"RiotMatchPlayers"> | number | null
    deaths?: IntNullableWithAggregatesFilter<"RiotMatchPlayers"> | number | null
    assists?: IntNullableWithAggregatesFilter<"RiotMatchPlayers"> | number | null
    tier?: IntNullableWithAggregatesFilter<"RiotMatchPlayers"> | number | null
    playerCard?: StringNullableWithAggregatesFilter<"RiotMatchPlayers"> | string | null
    playerTitle?: StringNullableWithAggregatesFilter<"RiotMatchPlayers"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableWithAggregatesFilter<"RiotMatchPlayers"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableWithAggregatesFilter<"RiotMatchPlayers"> | boolean | null
    teamRoundsWon?: IntNullableWithAggregatesFilter<"RiotMatchPlayers"> | number | null
  }

  export type UserCreateInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    Session?: SessionCreateNestedManyWithoutUserInput
    riotMatches?: RiotMatchesCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
    riotMatches?: RiotMatchesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUpdateManyWithoutUserNestedInput
    riotMatches?: RiotMatchesUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
    riotMatches?: RiotMatchesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userId: string
    expiresAt: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id: string
    userId: string
    expiresAt: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiotMatchesCreateInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserCreateNestedManyWithoutRiotMatchesInput
    rounds?: RiotMatchRoundCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesUncheckedCreateInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserUncheckedCreateNestedManyWithoutRiotMatchesInput
    rounds?: RiotMatchRoundUncheckedCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersUncheckedCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutRiotMatchesNestedInput
    rounds?: RiotMatchRoundUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutRiotMatchesNestedInput
    rounds?: RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesCreateManyInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
  }

  export type RiotMatchesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RiotMatchesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RiotMatchRoundCreateInput = {
    id?: string
    RiotMatches: RiotMatchesCreateNestedOneWithoutRoundsInput
  }

  export type RiotMatchRoundUncheckedCreateInput = {
    id?: string
    riotMatchesId: string
  }

  export type RiotMatchRoundUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    RiotMatches?: RiotMatchesUpdateOneRequiredWithoutRoundsNestedInput
  }

  export type RiotMatchRoundUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotMatchesId?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchRoundCreateManyInput = {
    id?: string
    riotMatchesId: string
  }

  export type RiotMatchRoundUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchRoundUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotMatchesId?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchPlayersCreateInput = {
    id: string
    riotTag?: string | null
    teamId?: string | null
    characterId?: string | null
    kills?: number | null
    deaths?: number | null
    assists?: number | null
    tier?: number | null
    playerCard?: string | null
    playerTitle?: string | null
    teamColor?: $Enums.RiotMatchTeamColor | null
    teamWon?: boolean | null
    teamRoundsWon?: number | null
    riotMatches?: RiotMatchesCreateNestedManyWithoutMatchPlayersInput
  }

  export type RiotMatchPlayersUncheckedCreateInput = {
    id: string
    riotTag?: string | null
    teamId?: string | null
    characterId?: string | null
    kills?: number | null
    deaths?: number | null
    assists?: number | null
    tier?: number | null
    playerCard?: string | null
    playerTitle?: string | null
    teamColor?: $Enums.RiotMatchTeamColor | null
    teamWon?: boolean | null
    teamRoundsWon?: number | null
    riotMatches?: RiotMatchesUncheckedCreateNestedManyWithoutMatchPlayersInput
  }

  export type RiotMatchPlayersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatches?: RiotMatchesUpdateManyWithoutMatchPlayersNestedInput
  }

  export type RiotMatchPlayersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatches?: RiotMatchesUncheckedUpdateManyWithoutMatchPlayersNestedInput
  }

  export type RiotMatchPlayersCreateManyInput = {
    id: string
    riotTag?: string | null
    teamId?: string | null
    characterId?: string | null
    kills?: number | null
    deaths?: number | null
    assists?: number | null
    tier?: number | null
    playerCard?: string | null
    playerTitle?: string | null
    teamColor?: $Enums.RiotMatchTeamColor | null
    teamWon?: boolean | null
    teamRoundsWon?: number | null
  }

  export type RiotMatchPlayersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RiotMatchPlayersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type RiotMatchesListRelationFilter = {
    every?: RiotMatchesWhereInput
    some?: RiotMatchesWhereInput
    none?: RiotMatchesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiotMatchesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    discordId?: SortOrder
    discordName?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotPuuid?: SortOrder
    riotTag?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    discordId?: SortOrder
    discordName?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotPuuid?: SortOrder
    riotTag?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    discordId?: SortOrder
    discordName?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotPuuid?: SortOrder
    riotTag?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumRiotMatchTeamColorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiotMatchTeamColor | EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel> | $Enums.RiotMatchTeamColor | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type RiotMatchRoundListRelationFilter = {
    every?: RiotMatchRoundWhereInput
    some?: RiotMatchRoundWhereInput
    none?: RiotMatchRoundWhereInput
  }

  export type RiotMatchPlayersListRelationFilter = {
    every?: RiotMatchPlayersWhereInput
    some?: RiotMatchPlayersWhereInput
    none?: RiotMatchPlayersWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiotMatchRoundOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiotMatchPlayersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiotMatchesCountOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    gameVersion?: SortOrder
    gameStart?: SortOrder
    gameEnd?: SortOrder
    isCompleted?: SortOrder
    queueId?: SortOrder
    isRanked?: SortOrder
    seasonId?: SortOrder
    roundsPlayed?: SortOrder
    teamWon?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
    riotMatchPlayersId?: SortOrder
  }

  export type RiotMatchesAvgOrderByAggregateInput = {
    roundsPlayed?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
  }

  export type RiotMatchesMaxOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    gameVersion?: SortOrder
    gameStart?: SortOrder
    gameEnd?: SortOrder
    isCompleted?: SortOrder
    queueId?: SortOrder
    isRanked?: SortOrder
    seasonId?: SortOrder
    roundsPlayed?: SortOrder
    teamWon?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
    riotMatchPlayersId?: SortOrder
  }

  export type RiotMatchesMinOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    gameVersion?: SortOrder
    gameStart?: SortOrder
    gameEnd?: SortOrder
    isCompleted?: SortOrder
    queueId?: SortOrder
    isRanked?: SortOrder
    seasonId?: SortOrder
    roundsPlayed?: SortOrder
    teamWon?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
    riotMatchPlayersId?: SortOrder
  }

  export type RiotMatchesSumOrderByAggregateInput = {
    roundsPlayed?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRiotMatchTeamColorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiotMatchTeamColor | EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiotMatchTeamColorNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiotMatchTeamColor | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel>
    _max?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel>
  }

  export type RiotMatchesScalarRelationFilter = {
    is?: RiotMatchesWhereInput
    isNot?: RiotMatchesWhereInput
  }

  export type RiotMatchRoundCountOrderByAggregateInput = {
    id?: SortOrder
    riotMatchesId?: SortOrder
  }

  export type RiotMatchRoundMaxOrderByAggregateInput = {
    id?: SortOrder
    riotMatchesId?: SortOrder
  }

  export type RiotMatchRoundMinOrderByAggregateInput = {
    id?: SortOrder
    riotMatchesId?: SortOrder
  }

  export type RiotMatchPlayersCountOrderByAggregateInput = {
    id?: SortOrder
    riotTag?: SortOrder
    teamId?: SortOrder
    characterId?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    playerCard?: SortOrder
    playerTitle?: SortOrder
    teamColor?: SortOrder
    teamWon?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type RiotMatchPlayersAvgOrderByAggregateInput = {
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type RiotMatchPlayersMaxOrderByAggregateInput = {
    id?: SortOrder
    riotTag?: SortOrder
    teamId?: SortOrder
    characterId?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    playerCard?: SortOrder
    playerTitle?: SortOrder
    teamColor?: SortOrder
    teamWon?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type RiotMatchPlayersMinOrderByAggregateInput = {
    id?: SortOrder
    riotTag?: SortOrder
    teamId?: SortOrder
    characterId?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    playerCard?: SortOrder
    playerTitle?: SortOrder
    teamColor?: SortOrder
    teamWon?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type RiotMatchPlayersSumOrderByAggregateInput = {
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RiotMatchesCreateNestedManyWithoutUsersInput = {
    create?: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput> | RiotMatchesCreateWithoutUsersInput[] | RiotMatchesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutUsersInput | RiotMatchesCreateOrConnectWithoutUsersInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RiotMatchesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput> | RiotMatchesCreateWithoutUsersInput[] | RiotMatchesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutUsersInput | RiotMatchesCreateOrConnectWithoutUsersInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RiotMatchesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput> | RiotMatchesCreateWithoutUsersInput[] | RiotMatchesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutUsersInput | RiotMatchesCreateOrConnectWithoutUsersInput[]
    upsert?: RiotMatchesUpsertWithWhereUniqueWithoutUsersInput | RiotMatchesUpsertWithWhereUniqueWithoutUsersInput[]
    set?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    disconnect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    delete?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    update?: RiotMatchesUpdateWithWhereUniqueWithoutUsersInput | RiotMatchesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RiotMatchesUpdateManyWithWhereWithoutUsersInput | RiotMatchesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RiotMatchesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput> | RiotMatchesCreateWithoutUsersInput[] | RiotMatchesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutUsersInput | RiotMatchesCreateOrConnectWithoutUsersInput[]
    upsert?: RiotMatchesUpsertWithWhereUniqueWithoutUsersInput | RiotMatchesUpsertWithWhereUniqueWithoutUsersInput[]
    set?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    disconnect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    delete?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    update?: RiotMatchesUpdateWithWhereUniqueWithoutUsersInput | RiotMatchesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RiotMatchesUpdateManyWithWhereWithoutUsersInput | RiotMatchesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput
    upsert?: UserUpsertWithoutSessionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionInput, UserUpdateWithoutSessionInput>, UserUncheckedUpdateWithoutSessionInput>
  }

  export type UserCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput> | UserCreateWithoutRiotMatchesInput[] | UserUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput | UserCreateOrConnectWithoutRiotMatchesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RiotMatchRoundCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput> | RiotMatchRoundCreateWithoutRiotMatchesInput[] | RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput | RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput[]
    createMany?: RiotMatchRoundCreateManyRiotMatchesInputEnvelope
    connect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
  }

  export type RiotMatchPlayersCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput> | RiotMatchPlayersCreateWithoutRiotMatchesInput[] | RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput | RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput[]
    connect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput> | UserCreateWithoutRiotMatchesInput[] | UserUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput | UserCreateOrConnectWithoutRiotMatchesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RiotMatchRoundUncheckedCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput> | RiotMatchRoundCreateWithoutRiotMatchesInput[] | RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput | RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput[]
    createMany?: RiotMatchRoundCreateManyRiotMatchesInputEnvelope
    connect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
  }

  export type RiotMatchPlayersUncheckedCreateNestedManyWithoutRiotMatchesInput = {
    create?: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput> | RiotMatchPlayersCreateWithoutRiotMatchesInput[] | RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput | RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput[]
    connect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput = {
    set?: $Enums.RiotMatchTeamColor | null
  }

  export type UserUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput> | UserCreateWithoutRiotMatchesInput[] | UserUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput | UserCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRiotMatchesInput | UserUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRiotMatchesInput | UserUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRiotMatchesInput | UserUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RiotMatchRoundUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput> | RiotMatchRoundCreateWithoutRiotMatchesInput[] | RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput | RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: RiotMatchRoundUpsertWithWhereUniqueWithoutRiotMatchesInput | RiotMatchRoundUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    createMany?: RiotMatchRoundCreateManyRiotMatchesInputEnvelope
    set?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    disconnect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    delete?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    connect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    update?: RiotMatchRoundUpdateWithWhereUniqueWithoutRiotMatchesInput | RiotMatchRoundUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: RiotMatchRoundUpdateManyWithWhereWithoutRiotMatchesInput | RiotMatchRoundUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: RiotMatchRoundScalarWhereInput | RiotMatchRoundScalarWhereInput[]
  }

  export type RiotMatchPlayersUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput> | RiotMatchPlayersCreateWithoutRiotMatchesInput[] | RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput | RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: RiotMatchPlayersUpsertWithWhereUniqueWithoutRiotMatchesInput | RiotMatchPlayersUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    set?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    disconnect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    delete?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    connect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    update?: RiotMatchPlayersUpdateWithWhereUniqueWithoutRiotMatchesInput | RiotMatchPlayersUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: RiotMatchPlayersUpdateManyWithWhereWithoutRiotMatchesInput | RiotMatchPlayersUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: RiotMatchPlayersScalarWhereInput | RiotMatchPlayersScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput> | UserCreateWithoutRiotMatchesInput[] | UserUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput | UserCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRiotMatchesInput | UserUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRiotMatchesInput | UserUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRiotMatchesInput | UserUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput> | RiotMatchRoundCreateWithoutRiotMatchesInput[] | RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput | RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: RiotMatchRoundUpsertWithWhereUniqueWithoutRiotMatchesInput | RiotMatchRoundUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    createMany?: RiotMatchRoundCreateManyRiotMatchesInputEnvelope
    set?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    disconnect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    delete?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    connect?: RiotMatchRoundWhereUniqueInput | RiotMatchRoundWhereUniqueInput[]
    update?: RiotMatchRoundUpdateWithWhereUniqueWithoutRiotMatchesInput | RiotMatchRoundUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: RiotMatchRoundUpdateManyWithWhereWithoutRiotMatchesInput | RiotMatchRoundUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: RiotMatchRoundScalarWhereInput | RiotMatchRoundScalarWhereInput[]
  }

  export type RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesNestedInput = {
    create?: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput> | RiotMatchPlayersCreateWithoutRiotMatchesInput[] | RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput[]
    connectOrCreate?: RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput | RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput[]
    upsert?: RiotMatchPlayersUpsertWithWhereUniqueWithoutRiotMatchesInput | RiotMatchPlayersUpsertWithWhereUniqueWithoutRiotMatchesInput[]
    set?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    disconnect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    delete?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    connect?: RiotMatchPlayersWhereUniqueInput | RiotMatchPlayersWhereUniqueInput[]
    update?: RiotMatchPlayersUpdateWithWhereUniqueWithoutRiotMatchesInput | RiotMatchPlayersUpdateWithWhereUniqueWithoutRiotMatchesInput[]
    updateMany?: RiotMatchPlayersUpdateManyWithWhereWithoutRiotMatchesInput | RiotMatchPlayersUpdateManyWithWhereWithoutRiotMatchesInput[]
    deleteMany?: RiotMatchPlayersScalarWhereInput | RiotMatchPlayersScalarWhereInput[]
  }

  export type RiotMatchesCreateNestedOneWithoutRoundsInput = {
    create?: XOR<RiotMatchesCreateWithoutRoundsInput, RiotMatchesUncheckedCreateWithoutRoundsInput>
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutRoundsInput
    connect?: RiotMatchesWhereUniqueInput
  }

  export type RiotMatchesUpdateOneRequiredWithoutRoundsNestedInput = {
    create?: XOR<RiotMatchesCreateWithoutRoundsInput, RiotMatchesUncheckedCreateWithoutRoundsInput>
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutRoundsInput
    upsert?: RiotMatchesUpsertWithoutRoundsInput
    connect?: RiotMatchesWhereUniqueInput
    update?: XOR<XOR<RiotMatchesUpdateToOneWithWhereWithoutRoundsInput, RiotMatchesUpdateWithoutRoundsInput>, RiotMatchesUncheckedUpdateWithoutRoundsInput>
  }

  export type RiotMatchesCreateNestedManyWithoutMatchPlayersInput = {
    create?: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput> | RiotMatchesCreateWithoutMatchPlayersInput[] | RiotMatchesUncheckedCreateWithoutMatchPlayersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutMatchPlayersInput | RiotMatchesCreateOrConnectWithoutMatchPlayersInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
  }

  export type RiotMatchesUncheckedCreateNestedManyWithoutMatchPlayersInput = {
    create?: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput> | RiotMatchesCreateWithoutMatchPlayersInput[] | RiotMatchesUncheckedCreateWithoutMatchPlayersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutMatchPlayersInput | RiotMatchesCreateOrConnectWithoutMatchPlayersInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
  }

  export type RiotMatchesUpdateManyWithoutMatchPlayersNestedInput = {
    create?: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput> | RiotMatchesCreateWithoutMatchPlayersInput[] | RiotMatchesUncheckedCreateWithoutMatchPlayersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutMatchPlayersInput | RiotMatchesCreateOrConnectWithoutMatchPlayersInput[]
    upsert?: RiotMatchesUpsertWithWhereUniqueWithoutMatchPlayersInput | RiotMatchesUpsertWithWhereUniqueWithoutMatchPlayersInput[]
    set?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    disconnect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    delete?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    update?: RiotMatchesUpdateWithWhereUniqueWithoutMatchPlayersInput | RiotMatchesUpdateWithWhereUniqueWithoutMatchPlayersInput[]
    updateMany?: RiotMatchesUpdateManyWithWhereWithoutMatchPlayersInput | RiotMatchesUpdateManyWithWhereWithoutMatchPlayersInput[]
    deleteMany?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
  }

  export type RiotMatchesUncheckedUpdateManyWithoutMatchPlayersNestedInput = {
    create?: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput> | RiotMatchesCreateWithoutMatchPlayersInput[] | RiotMatchesUncheckedCreateWithoutMatchPlayersInput[]
    connectOrCreate?: RiotMatchesCreateOrConnectWithoutMatchPlayersInput | RiotMatchesCreateOrConnectWithoutMatchPlayersInput[]
    upsert?: RiotMatchesUpsertWithWhereUniqueWithoutMatchPlayersInput | RiotMatchesUpsertWithWhereUniqueWithoutMatchPlayersInput[]
    set?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    disconnect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    delete?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    connect?: RiotMatchesWhereUniqueInput | RiotMatchesWhereUniqueInput[]
    update?: RiotMatchesUpdateWithWhereUniqueWithoutMatchPlayersInput | RiotMatchesUpdateWithWhereUniqueWithoutMatchPlayersInput[]
    updateMany?: RiotMatchesUpdateManyWithWhereWithoutMatchPlayersInput | RiotMatchesUpdateManyWithWhereWithoutMatchPlayersInput[]
    deleteMany?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiotMatchTeamColor | EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel> | $Enums.RiotMatchTeamColor | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRiotMatchTeamColorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiotMatchTeamColor | EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiotMatchTeamColorNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiotMatchTeamColor | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel>
    _max?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RiotMatchesCreateWithoutUsersInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    rounds?: RiotMatchRoundCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesUncheckedCreateWithoutUsersInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    rounds?: RiotMatchRoundUncheckedCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersUncheckedCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesCreateOrConnectWithoutUsersInput = {
    where: RiotMatchesWhereUniqueInput
    create: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type RiotMatchesUpsertWithWhereUniqueWithoutUsersInput = {
    where: RiotMatchesWhereUniqueInput
    update: XOR<RiotMatchesUpdateWithoutUsersInput, RiotMatchesUncheckedUpdateWithoutUsersInput>
    create: XOR<RiotMatchesCreateWithoutUsersInput, RiotMatchesUncheckedCreateWithoutUsersInput>
  }

  export type RiotMatchesUpdateWithWhereUniqueWithoutUsersInput = {
    where: RiotMatchesWhereUniqueInput
    data: XOR<RiotMatchesUpdateWithoutUsersInput, RiotMatchesUncheckedUpdateWithoutUsersInput>
  }

  export type RiotMatchesUpdateManyWithWhereWithoutUsersInput = {
    where: RiotMatchesScalarWhereInput
    data: XOR<RiotMatchesUpdateManyMutationInput, RiotMatchesUncheckedUpdateManyWithoutUsersInput>
  }

  export type RiotMatchesScalarWhereInput = {
    AND?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
    OR?: RiotMatchesScalarWhereInput[]
    NOT?: RiotMatchesScalarWhereInput | RiotMatchesScalarWhereInput[]
    id?: StringFilter<"RiotMatches"> | string
    mapId?: StringNullableFilter<"RiotMatches"> | string | null
    gameVersion?: StringNullableFilter<"RiotMatches"> | string | null
    gameStart?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    gameEnd?: DateTimeNullableFilter<"RiotMatches"> | Date | string | null
    isCompleted?: BoolNullableFilter<"RiotMatches"> | boolean | null
    queueId?: StringNullableFilter<"RiotMatches"> | string | null
    isRanked?: BoolNullableFilter<"RiotMatches"> | boolean | null
    seasonId?: StringNullableFilter<"RiotMatches"> | string | null
    roundsPlayed?: IntNullableFilter<"RiotMatches"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableFilter<"RiotMatches"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    teamBlueRoundsWon?: IntNullableFilter<"RiotMatches"> | number | null
    riotMatchPlayersId?: StringNullableFilter<"RiotMatches"> | string | null
  }

  export type UserCreateWithoutSessionInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    riotMatches?: RiotMatchesCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutSessionInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    riotMatches?: RiotMatchesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutSessionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
  }

  export type UserUpsertWithoutSessionInput = {
    update: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
    create: XOR<UserCreateWithoutSessionInput, UserUncheckedCreateWithoutSessionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionInput, UserUncheckedUpdateWithoutSessionInput>
  }

  export type UserUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    riotMatches?: RiotMatchesUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    riotMatches?: RiotMatchesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutRiotMatchesInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    Session?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRiotMatchesInput = {
    id?: string
    discordId: string
    discordName: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotPuuid?: string | null
    riotTag?: string | null
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRiotMatchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
  }

  export type RiotMatchRoundCreateWithoutRiotMatchesInput = {
    id?: string
  }

  export type RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput = {
    id?: string
  }

  export type RiotMatchRoundCreateOrConnectWithoutRiotMatchesInput = {
    where: RiotMatchRoundWhereUniqueInput
    create: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput>
  }

  export type RiotMatchRoundCreateManyRiotMatchesInputEnvelope = {
    data: RiotMatchRoundCreateManyRiotMatchesInput | RiotMatchRoundCreateManyRiotMatchesInput[]
    skipDuplicates?: boolean
  }

  export type RiotMatchPlayersCreateWithoutRiotMatchesInput = {
    id: string
    riotTag?: string | null
    teamId?: string | null
    characterId?: string | null
    kills?: number | null
    deaths?: number | null
    assists?: number | null
    tier?: number | null
    playerCard?: string | null
    playerTitle?: string | null
    teamColor?: $Enums.RiotMatchTeamColor | null
    teamWon?: boolean | null
    teamRoundsWon?: number | null
  }

  export type RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput = {
    id: string
    riotTag?: string | null
    teamId?: string | null
    characterId?: string | null
    kills?: number | null
    deaths?: number | null
    assists?: number | null
    tier?: number | null
    playerCard?: string | null
    playerTitle?: string | null
    teamColor?: $Enums.RiotMatchTeamColor | null
    teamWon?: boolean | null
    teamRoundsWon?: number | null
  }

  export type RiotMatchPlayersCreateOrConnectWithoutRiotMatchesInput = {
    where: RiotMatchPlayersWhereUniqueInput
    create: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput>
  }

  export type UserUpsertWithWhereUniqueWithoutRiotMatchesInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRiotMatchesInput, UserUncheckedUpdateWithoutRiotMatchesInput>
    create: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRiotMatchesInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRiotMatchesInput, UserUncheckedUpdateWithoutRiotMatchesInput>
  }

  export type UserUpdateManyWithWhereWithoutRiotMatchesInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRiotMatchesInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    discordId?: StringFilter<"User"> | string
    discordName?: StringFilter<"User"> | string
    riotEntitlement?: StringNullableFilter<"User"> | string | null
    riotAuth?: StringNullableFilter<"User"> | string | null
    riotPuuid?: StringNullableFilter<"User"> | string | null
    riotTag?: StringNullableFilter<"User"> | string | null
  }

  export type RiotMatchRoundUpsertWithWhereUniqueWithoutRiotMatchesInput = {
    where: RiotMatchRoundWhereUniqueInput
    update: XOR<RiotMatchRoundUpdateWithoutRiotMatchesInput, RiotMatchRoundUncheckedUpdateWithoutRiotMatchesInput>
    create: XOR<RiotMatchRoundCreateWithoutRiotMatchesInput, RiotMatchRoundUncheckedCreateWithoutRiotMatchesInput>
  }

  export type RiotMatchRoundUpdateWithWhereUniqueWithoutRiotMatchesInput = {
    where: RiotMatchRoundWhereUniqueInput
    data: XOR<RiotMatchRoundUpdateWithoutRiotMatchesInput, RiotMatchRoundUncheckedUpdateWithoutRiotMatchesInput>
  }

  export type RiotMatchRoundUpdateManyWithWhereWithoutRiotMatchesInput = {
    where: RiotMatchRoundScalarWhereInput
    data: XOR<RiotMatchRoundUpdateManyMutationInput, RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesInput>
  }

  export type RiotMatchRoundScalarWhereInput = {
    AND?: RiotMatchRoundScalarWhereInput | RiotMatchRoundScalarWhereInput[]
    OR?: RiotMatchRoundScalarWhereInput[]
    NOT?: RiotMatchRoundScalarWhereInput | RiotMatchRoundScalarWhereInput[]
    id?: StringFilter<"RiotMatchRound"> | string
    riotMatchesId?: StringFilter<"RiotMatchRound"> | string
  }

  export type RiotMatchPlayersUpsertWithWhereUniqueWithoutRiotMatchesInput = {
    where: RiotMatchPlayersWhereUniqueInput
    update: XOR<RiotMatchPlayersUpdateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedUpdateWithoutRiotMatchesInput>
    create: XOR<RiotMatchPlayersCreateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedCreateWithoutRiotMatchesInput>
  }

  export type RiotMatchPlayersUpdateWithWhereUniqueWithoutRiotMatchesInput = {
    where: RiotMatchPlayersWhereUniqueInput
    data: XOR<RiotMatchPlayersUpdateWithoutRiotMatchesInput, RiotMatchPlayersUncheckedUpdateWithoutRiotMatchesInput>
  }

  export type RiotMatchPlayersUpdateManyWithWhereWithoutRiotMatchesInput = {
    where: RiotMatchPlayersScalarWhereInput
    data: XOR<RiotMatchPlayersUpdateManyMutationInput, RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesInput>
  }

  export type RiotMatchPlayersScalarWhereInput = {
    AND?: RiotMatchPlayersScalarWhereInput | RiotMatchPlayersScalarWhereInput[]
    OR?: RiotMatchPlayersScalarWhereInput[]
    NOT?: RiotMatchPlayersScalarWhereInput | RiotMatchPlayersScalarWhereInput[]
    id?: StringFilter<"RiotMatchPlayers"> | string
    riotTag?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    characterId?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    kills?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    deaths?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    assists?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    tier?: IntNullableFilter<"RiotMatchPlayers"> | number | null
    playerCard?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    playerTitle?: StringNullableFilter<"RiotMatchPlayers"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"RiotMatchPlayers"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"RiotMatchPlayers"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"RiotMatchPlayers"> | number | null
  }

  export type RiotMatchesCreateWithoutRoundsInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesUncheckedCreateWithoutRoundsInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserUncheckedCreateNestedManyWithoutRiotMatchesInput
    matchPlayers?: RiotMatchPlayersUncheckedCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesCreateOrConnectWithoutRoundsInput = {
    where: RiotMatchesWhereUniqueInput
    create: XOR<RiotMatchesCreateWithoutRoundsInput, RiotMatchesUncheckedCreateWithoutRoundsInput>
  }

  export type RiotMatchesUpsertWithoutRoundsInput = {
    update: XOR<RiotMatchesUpdateWithoutRoundsInput, RiotMatchesUncheckedUpdateWithoutRoundsInput>
    create: XOR<RiotMatchesCreateWithoutRoundsInput, RiotMatchesUncheckedCreateWithoutRoundsInput>
    where?: RiotMatchesWhereInput
  }

  export type RiotMatchesUpdateToOneWithWhereWithoutRoundsInput = {
    where?: RiotMatchesWhereInput
    data: XOR<RiotMatchesUpdateWithoutRoundsInput, RiotMatchesUncheckedUpdateWithoutRoundsInput>
  }

  export type RiotMatchesUpdateWithoutRoundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateWithoutRoundsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesCreateWithoutMatchPlayersInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserCreateNestedManyWithoutRiotMatchesInput
    rounds?: RiotMatchRoundCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesUncheckedCreateWithoutMatchPlayersInput = {
    id: string
    mapId?: string | null
    gameVersion?: string | null
    gameStart?: Date | string | null
    gameEnd?: Date | string | null
    isCompleted?: boolean | null
    queueId?: string | null
    isRanked?: boolean | null
    seasonId?: string | null
    roundsPlayed?: number | null
    teamWon?: $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: number | null
    teamBlueRoundsWon?: number | null
    riotMatchPlayersId?: string | null
    users?: UserUncheckedCreateNestedManyWithoutRiotMatchesInput
    rounds?: RiotMatchRoundUncheckedCreateNestedManyWithoutRiotMatchesInput
  }

  export type RiotMatchesCreateOrConnectWithoutMatchPlayersInput = {
    where: RiotMatchesWhereUniqueInput
    create: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput>
  }

  export type RiotMatchesUpsertWithWhereUniqueWithoutMatchPlayersInput = {
    where: RiotMatchesWhereUniqueInput
    update: XOR<RiotMatchesUpdateWithoutMatchPlayersInput, RiotMatchesUncheckedUpdateWithoutMatchPlayersInput>
    create: XOR<RiotMatchesCreateWithoutMatchPlayersInput, RiotMatchesUncheckedCreateWithoutMatchPlayersInput>
  }

  export type RiotMatchesUpdateWithWhereUniqueWithoutMatchPlayersInput = {
    where: RiotMatchesWhereUniqueInput
    data: XOR<RiotMatchesUpdateWithoutMatchPlayersInput, RiotMatchesUncheckedUpdateWithoutMatchPlayersInput>
  }

  export type RiotMatchesUpdateManyWithWhereWithoutMatchPlayersInput = {
    where: RiotMatchesScalarWhereInput
    data: XOR<RiotMatchesUpdateManyMutationInput, RiotMatchesUncheckedUpdateManyWithoutMatchPlayersInput>
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiotMatchesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    rounds?: RiotMatchRoundUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    rounds?: RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesNestedInput
    matchPlayers?: RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RiotMatchRoundCreateManyRiotMatchesInput = {
    id?: string
  }

  export type UserUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    discordId?: StringFieldUpdateOperationsInput | string
    discordName?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotPuuid?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RiotMatchRoundUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchRoundUncheckedUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RiotMatchPlayersUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RiotMatchPlayersUncheckedUpdateWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RiotMatchPlayersUncheckedUpdateManyWithoutRiotMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    kills?: NullableIntFieldUpdateOperationsInput | number | null
    deaths?: NullableIntFieldUpdateOperationsInput | number | null
    assists?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableIntFieldUpdateOperationsInput | number | null
    playerCard?: NullableStringFieldUpdateOperationsInput | string | null
    playerTitle?: NullableStringFieldUpdateOperationsInput | string | null
    teamColor?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamWon?: NullableBoolFieldUpdateOperationsInput | boolean | null
    teamRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RiotMatchesUpdateWithoutMatchPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutRiotMatchesNestedInput
    rounds?: RiotMatchRoundUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateWithoutMatchPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutRiotMatchesNestedInput
    rounds?: RiotMatchRoundUncheckedUpdateManyWithoutRiotMatchesNestedInput
  }

  export type RiotMatchesUncheckedUpdateManyWithoutMatchPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: NullableStringFieldUpdateOperationsInput | string | null
    gameVersion?: NullableStringFieldUpdateOperationsInput | string | null
    gameStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCompleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    queueId?: NullableStringFieldUpdateOperationsInput | string | null
    isRanked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    seasonId?: NullableStringFieldUpdateOperationsInput | string | null
    roundsPlayed?: NullableIntFieldUpdateOperationsInput | number | null
    teamWon?: NullableEnumRiotMatchTeamColorFieldUpdateOperationsInput | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    teamBlueRoundsWon?: NullableIntFieldUpdateOperationsInput | number | null
    riotMatchPlayersId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchesCountOutputTypeDefaultArgs instead
     */
    export type RiotMatchesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchPlayersCountOutputTypeDefaultArgs instead
     */
    export type RiotMatchPlayersCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchPlayersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchesDefaultArgs instead
     */
    export type RiotMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchRoundDefaultArgs instead
     */
    export type RiotMatchRoundArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchRoundDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchPlayersDefaultArgs instead
     */
    export type RiotMatchPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchPlayersDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}