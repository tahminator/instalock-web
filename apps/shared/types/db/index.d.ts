
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
 * Model PlayerMatch
 * 
 */
export type PlayerMatch = $Result.DefaultSelection<Prisma.$PlayerMatchPayload>
/**
 * Model RiotMatch
 * 
 */
export type RiotMatch = $Result.DefaultSelection<Prisma.$RiotMatchPayload>

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
   * `prisma.playerMatch`: Exposes CRUD operations for the **PlayerMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayerMatches
    * const playerMatches = await prisma.playerMatch.findMany()
    * ```
    */
  get playerMatch(): Prisma.PlayerMatchDelegate<ExtArgs>;

  /**
   * `prisma.riotMatch`: Exposes CRUD operations for the **RiotMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiotMatches
    * const riotMatches = await prisma.riotMatch.findMany()
    * ```
    */
  get riotMatch(): Prisma.RiotMatchDelegate<ExtArgs>;
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
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
    PlayerMatch: 'PlayerMatch',
    RiotMatch: 'RiotMatch'
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
      modelProps: "user" | "session" | "playerMatch" | "riotMatch"
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
      PlayerMatch: {
        payload: Prisma.$PlayerMatchPayload<ExtArgs>
        fields: Prisma.PlayerMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          findFirst: {
            args: Prisma.PlayerMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          findMany: {
            args: Prisma.PlayerMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>[]
          }
          create: {
            args: Prisma.PlayerMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          createMany: {
            args: Prisma.PlayerMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>[]
          }
          delete: {
            args: Prisma.PlayerMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          update: {
            args: Prisma.PlayerMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          deleteMany: {
            args: Prisma.PlayerMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayerMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerMatchPayload>
          }
          aggregate: {
            args: Prisma.PlayerMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayerMatch>
          }
          groupBy: {
            args: Prisma.PlayerMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerMatchCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerMatchCountAggregateOutputType> | number
          }
        }
      }
      RiotMatch: {
        payload: Prisma.$RiotMatchPayload<ExtArgs>
        fields: Prisma.RiotMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiotMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiotMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          findFirst: {
            args: Prisma.RiotMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiotMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          findMany: {
            args: Prisma.RiotMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>[]
          }
          create: {
            args: Prisma.RiotMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          createMany: {
            args: Prisma.RiotMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiotMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>[]
          }
          delete: {
            args: Prisma.RiotMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          update: {
            args: Prisma.RiotMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          deleteMany: {
            args: Prisma.RiotMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiotMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiotMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiotMatchPayload>
          }
          aggregate: {
            args: Prisma.RiotMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiotMatch>
          }
          groupBy: {
            args: Prisma.RiotMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiotMatchCountArgs<ExtArgs>
            result: $Utils.Optional<RiotMatchCountAggregateOutputType> | number
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
    where?: PlayerMatchWhereInput
  }


  /**
   * Count Type RiotMatchCountOutputType
   */

  export type RiotMatchCountOutputType = {
    players: number
  }

  export type RiotMatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | RiotMatchCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * RiotMatchCountOutputType without action
   */
  export type RiotMatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatchCountOutputType
     */
    select?: RiotMatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RiotMatchCountOutputType without action
   */
  export type RiotMatchCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerMatchWhereInput
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
    puuid: string | null
    riotEntitlement: string | null
    riotAuth: string | null
    riotTag: string | null
    newUser: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    puuid: string | null
    riotEntitlement: string | null
    riotAuth: string | null
    riotTag: string | null
    newUser: boolean | null
  }

  export type UserCountAggregateOutputType = {
    puuid: number
    riotEntitlement: number
    riotAuth: number
    riotTag: number
    newUser: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    puuid?: true
    riotEntitlement?: true
    riotAuth?: true
    riotTag?: true
    newUser?: true
  }

  export type UserMaxAggregateInputType = {
    puuid?: true
    riotEntitlement?: true
    riotAuth?: true
    riotTag?: true
    newUser?: true
  }

  export type UserCountAggregateInputType = {
    puuid?: true
    riotEntitlement?: true
    riotAuth?: true
    riotTag?: true
    newUser?: true
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
    puuid: string
    riotEntitlement: string | null
    riotAuth: string | null
    riotTag: string | null
    newUser: boolean
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
    puuid?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotTag?: boolean
    newUser?: boolean
    Session?: boolean | User$SessionArgs<ExtArgs>
    riotMatches?: boolean | User$riotMatchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    puuid?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotTag?: boolean
    newUser?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    puuid?: boolean
    riotEntitlement?: boolean
    riotAuth?: boolean
    riotTag?: boolean
    newUser?: boolean
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
      riotMatches: Prisma.$PlayerMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      puuid: string
      riotEntitlement: string | null
      riotAuth: string | null
      riotTag: string | null
      newUser: boolean
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
     * // Only select the `puuid`
     * const userWithPuuidOnly = await prisma.user.findMany({ select: { puuid: true } })
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
     * // Create many Users and only return the `puuid`
     * const userWithPuuidOnly = await prisma.user.createManyAndReturn({ 
     *   select: { puuid: true },
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
    riotMatches<T extends User$riotMatchesArgs<ExtArgs> = {}>(args?: Subset<T, User$riotMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly puuid: FieldRef<"User", 'String'>
    readonly riotEntitlement: FieldRef<"User", 'String'>
    readonly riotAuth: FieldRef<"User", 'String'>
    readonly riotTag: FieldRef<"User", 'String'>
    readonly newUser: FieldRef<"User", 'Boolean'>
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
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    where?: PlayerMatchWhereInput
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    cursor?: PlayerMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerMatchScalarFieldEnum | PlayerMatchScalarFieldEnum[]
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
   * Model PlayerMatch
   */

  export type AggregatePlayerMatch = {
    _count: PlayerMatchCountAggregateOutputType | null
    _avg: PlayerMatchAvgAggregateOutputType | null
    _sum: PlayerMatchSumAggregateOutputType | null
    _min: PlayerMatchMinAggregateOutputType | null
    _max: PlayerMatchMaxAggregateOutputType | null
  }

  export type PlayerMatchAvgAggregateOutputType = {
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    teamRoundsWon: number | null
  }

  export type PlayerMatchSumAggregateOutputType = {
    kills: number | null
    deaths: number | null
    assists: number | null
    tier: number | null
    teamRoundsWon: number | null
  }

  export type PlayerMatchMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    matchId: string | null
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

  export type PlayerMatchMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    matchId: string | null
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

  export type PlayerMatchCountAggregateOutputType = {
    id: number
    playerId: number
    matchId: number
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


  export type PlayerMatchAvgAggregateInputType = {
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    teamRoundsWon?: true
  }

  export type PlayerMatchSumAggregateInputType = {
    kills?: true
    deaths?: true
    assists?: true
    tier?: true
    teamRoundsWon?: true
  }

  export type PlayerMatchMinAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
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

  export type PlayerMatchMaxAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
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

  export type PlayerMatchCountAggregateInputType = {
    id?: true
    playerId?: true
    matchId?: true
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

  export type PlayerMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerMatch to aggregate.
     */
    where?: PlayerMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatches to fetch.
     */
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlayerMatches
    **/
    _count?: true | PlayerMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerMatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerMatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMatchMaxAggregateInputType
  }

  export type GetPlayerMatchAggregateType<T extends PlayerMatchAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayerMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayerMatch[P]>
      : GetScalarType<T[P], AggregatePlayerMatch[P]>
  }




  export type PlayerMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerMatchWhereInput
    orderBy?: PlayerMatchOrderByWithAggregationInput | PlayerMatchOrderByWithAggregationInput[]
    by: PlayerMatchScalarFieldEnum[] | PlayerMatchScalarFieldEnum
    having?: PlayerMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerMatchCountAggregateInputType | true
    _avg?: PlayerMatchAvgAggregateInputType
    _sum?: PlayerMatchSumAggregateInputType
    _min?: PlayerMatchMinAggregateInputType
    _max?: PlayerMatchMaxAggregateInputType
  }

  export type PlayerMatchGroupByOutputType = {
    id: string
    playerId: string
    matchId: string
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
    _count: PlayerMatchCountAggregateOutputType | null
    _avg: PlayerMatchAvgAggregateOutputType | null
    _sum: PlayerMatchSumAggregateOutputType | null
    _min: PlayerMatchMinAggregateOutputType | null
    _max: PlayerMatchMaxAggregateOutputType | null
  }

  type GetPlayerMatchGroupByPayload<T extends PlayerMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerMatchGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerMatchGroupByOutputType[P]>
        }
      >
    >


  export type PlayerMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    matchId?: boolean
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
    player?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | RiotMatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerMatch"]>

  export type PlayerMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    matchId?: boolean
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
    player?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | RiotMatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerMatch"]>

  export type PlayerMatchSelectScalar = {
    id?: boolean
    playerId?: boolean
    matchId?: boolean
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

  export type PlayerMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | RiotMatchDefaultArgs<ExtArgs>
  }
  export type PlayerMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | RiotMatchDefaultArgs<ExtArgs>
  }

  export type $PlayerMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlayerMatch"
    objects: {
      player: Prisma.$UserPayload<ExtArgs>
      match: Prisma.$RiotMatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerId: string
      matchId: string
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
    }, ExtArgs["result"]["playerMatch"]>
    composites: {}
  }

  type PlayerMatchGetPayload<S extends boolean | null | undefined | PlayerMatchDefaultArgs> = $Result.GetResult<Prisma.$PlayerMatchPayload, S>

  type PlayerMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlayerMatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayerMatchCountAggregateInputType | true
    }

  export interface PlayerMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlayerMatch'], meta: { name: 'PlayerMatch' } }
    /**
     * Find zero or one PlayerMatch that matches the filter.
     * @param {PlayerMatchFindUniqueArgs} args - Arguments to find a PlayerMatch
     * @example
     * // Get one PlayerMatch
     * const playerMatch = await prisma.playerMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerMatchFindUniqueArgs>(args: SelectSubset<T, PlayerMatchFindUniqueArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlayerMatch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlayerMatchFindUniqueOrThrowArgs} args - Arguments to find a PlayerMatch
     * @example
     * // Get one PlayerMatch
     * const playerMatch = await prisma.playerMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlayerMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchFindFirstArgs} args - Arguments to find a PlayerMatch
     * @example
     * // Get one PlayerMatch
     * const playerMatch = await prisma.playerMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerMatchFindFirstArgs>(args?: SelectSubset<T, PlayerMatchFindFirstArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlayerMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchFindFirstOrThrowArgs} args - Arguments to find a PlayerMatch
     * @example
     * // Get one PlayerMatch
     * const playerMatch = await prisma.playerMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlayerMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayerMatches
     * const playerMatches = await prisma.playerMatch.findMany()
     * 
     * // Get first 10 PlayerMatches
     * const playerMatches = await prisma.playerMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerMatchWithIdOnly = await prisma.playerMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerMatchFindManyArgs>(args?: SelectSubset<T, PlayerMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlayerMatch.
     * @param {PlayerMatchCreateArgs} args - Arguments to create a PlayerMatch.
     * @example
     * // Create one PlayerMatch
     * const PlayerMatch = await prisma.playerMatch.create({
     *   data: {
     *     // ... data to create a PlayerMatch
     *   }
     * })
     * 
     */
    create<T extends PlayerMatchCreateArgs>(args: SelectSubset<T, PlayerMatchCreateArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlayerMatches.
     * @param {PlayerMatchCreateManyArgs} args - Arguments to create many PlayerMatches.
     * @example
     * // Create many PlayerMatches
     * const playerMatch = await prisma.playerMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerMatchCreateManyArgs>(args?: SelectSubset<T, PlayerMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlayerMatches and returns the data saved in the database.
     * @param {PlayerMatchCreateManyAndReturnArgs} args - Arguments to create many PlayerMatches.
     * @example
     * // Create many PlayerMatches
     * const playerMatch = await prisma.playerMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlayerMatches and only return the `id`
     * const playerMatchWithIdOnly = await prisma.playerMatch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlayerMatch.
     * @param {PlayerMatchDeleteArgs} args - Arguments to delete one PlayerMatch.
     * @example
     * // Delete one PlayerMatch
     * const PlayerMatch = await prisma.playerMatch.delete({
     *   where: {
     *     // ... filter to delete one PlayerMatch
     *   }
     * })
     * 
     */
    delete<T extends PlayerMatchDeleteArgs>(args: SelectSubset<T, PlayerMatchDeleteArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlayerMatch.
     * @param {PlayerMatchUpdateArgs} args - Arguments to update one PlayerMatch.
     * @example
     * // Update one PlayerMatch
     * const playerMatch = await prisma.playerMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerMatchUpdateArgs>(args: SelectSubset<T, PlayerMatchUpdateArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlayerMatches.
     * @param {PlayerMatchDeleteManyArgs} args - Arguments to filter PlayerMatches to delete.
     * @example
     * // Delete a few PlayerMatches
     * const { count } = await prisma.playerMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerMatchDeleteManyArgs>(args?: SelectSubset<T, PlayerMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayerMatches
     * const playerMatch = await prisma.playerMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerMatchUpdateManyArgs>(args: SelectSubset<T, PlayerMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlayerMatch.
     * @param {PlayerMatchUpsertArgs} args - Arguments to update or create a PlayerMatch.
     * @example
     * // Update or create a PlayerMatch
     * const playerMatch = await prisma.playerMatch.upsert({
     *   create: {
     *     // ... data to create a PlayerMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayerMatch we want to update
     *   }
     * })
     */
    upsert<T extends PlayerMatchUpsertArgs>(args: SelectSubset<T, PlayerMatchUpsertArgs<ExtArgs>>): Prisma__PlayerMatchClient<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlayerMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchCountArgs} args - Arguments to filter PlayerMatches to count.
     * @example
     * // Count the number of PlayerMatches
     * const count = await prisma.playerMatch.count({
     *   where: {
     *     // ... the filter for the PlayerMatches we want to count
     *   }
     * })
    **/
    count<T extends PlayerMatchCountArgs>(
      args?: Subset<T, PlayerMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayerMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlayerMatchAggregateArgs>(args: Subset<T, PlayerMatchAggregateArgs>): Prisma.PrismaPromise<GetPlayerMatchAggregateType<T>>

    /**
     * Group by PlayerMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerMatchGroupByArgs} args - Group by arguments.
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
      T extends PlayerMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerMatchGroupByArgs['orderBy'] }
        : { orderBy?: PlayerMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlayerMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlayerMatch model
   */
  readonly fields: PlayerMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayerMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    match<T extends RiotMatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatchDefaultArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PlayerMatch model
   */ 
  interface PlayerMatchFieldRefs {
    readonly id: FieldRef<"PlayerMatch", 'String'>
    readonly playerId: FieldRef<"PlayerMatch", 'String'>
    readonly matchId: FieldRef<"PlayerMatch", 'String'>
    readonly riotTag: FieldRef<"PlayerMatch", 'String'>
    readonly teamId: FieldRef<"PlayerMatch", 'String'>
    readonly characterId: FieldRef<"PlayerMatch", 'String'>
    readonly kills: FieldRef<"PlayerMatch", 'Int'>
    readonly deaths: FieldRef<"PlayerMatch", 'Int'>
    readonly assists: FieldRef<"PlayerMatch", 'Int'>
    readonly tier: FieldRef<"PlayerMatch", 'Int'>
    readonly playerCard: FieldRef<"PlayerMatch", 'String'>
    readonly playerTitle: FieldRef<"PlayerMatch", 'String'>
    readonly teamColor: FieldRef<"PlayerMatch", 'RiotMatchTeamColor'>
    readonly teamWon: FieldRef<"PlayerMatch", 'Boolean'>
    readonly teamRoundsWon: FieldRef<"PlayerMatch", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlayerMatch findUnique
   */
  export type PlayerMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatch to fetch.
     */
    where: PlayerMatchWhereUniqueInput
  }

  /**
   * PlayerMatch findUniqueOrThrow
   */
  export type PlayerMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatch to fetch.
     */
    where: PlayerMatchWhereUniqueInput
  }

  /**
   * PlayerMatch findFirst
   */
  export type PlayerMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatch to fetch.
     */
    where?: PlayerMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatches to fetch.
     */
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerMatches.
     */
    cursor?: PlayerMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerMatches.
     */
    distinct?: PlayerMatchScalarFieldEnum | PlayerMatchScalarFieldEnum[]
  }

  /**
   * PlayerMatch findFirstOrThrow
   */
  export type PlayerMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatch to fetch.
     */
    where?: PlayerMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatches to fetch.
     */
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerMatches.
     */
    cursor?: PlayerMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerMatches.
     */
    distinct?: PlayerMatchScalarFieldEnum | PlayerMatchScalarFieldEnum[]
  }

  /**
   * PlayerMatch findMany
   */
  export type PlayerMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter, which PlayerMatches to fetch.
     */
    where?: PlayerMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerMatches to fetch.
     */
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlayerMatches.
     */
    cursor?: PlayerMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerMatches.
     */
    skip?: number
    distinct?: PlayerMatchScalarFieldEnum | PlayerMatchScalarFieldEnum[]
  }

  /**
   * PlayerMatch create
   */
  export type PlayerMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a PlayerMatch.
     */
    data: XOR<PlayerMatchCreateInput, PlayerMatchUncheckedCreateInput>
  }

  /**
   * PlayerMatch createMany
   */
  export type PlayerMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlayerMatches.
     */
    data: PlayerMatchCreateManyInput | PlayerMatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayerMatch createManyAndReturn
   */
  export type PlayerMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlayerMatches.
     */
    data: PlayerMatchCreateManyInput | PlayerMatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayerMatch update
   */
  export type PlayerMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a PlayerMatch.
     */
    data: XOR<PlayerMatchUpdateInput, PlayerMatchUncheckedUpdateInput>
    /**
     * Choose, which PlayerMatch to update.
     */
    where: PlayerMatchWhereUniqueInput
  }

  /**
   * PlayerMatch updateMany
   */
  export type PlayerMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlayerMatches.
     */
    data: XOR<PlayerMatchUpdateManyMutationInput, PlayerMatchUncheckedUpdateManyInput>
    /**
     * Filter which PlayerMatches to update
     */
    where?: PlayerMatchWhereInput
  }

  /**
   * PlayerMatch upsert
   */
  export type PlayerMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the PlayerMatch to update in case it exists.
     */
    where: PlayerMatchWhereUniqueInput
    /**
     * In case the PlayerMatch found by the `where` argument doesn't exist, create a new PlayerMatch with this data.
     */
    create: XOR<PlayerMatchCreateInput, PlayerMatchUncheckedCreateInput>
    /**
     * In case the PlayerMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerMatchUpdateInput, PlayerMatchUncheckedUpdateInput>
  }

  /**
   * PlayerMatch delete
   */
  export type PlayerMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    /**
     * Filter which PlayerMatch to delete.
     */
    where: PlayerMatchWhereUniqueInput
  }

  /**
   * PlayerMatch deleteMany
   */
  export type PlayerMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerMatches to delete
     */
    where?: PlayerMatchWhereInput
  }

  /**
   * PlayerMatch without action
   */
  export type PlayerMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
  }


  /**
   * Model RiotMatch
   */

  export type AggregateRiotMatch = {
    _count: RiotMatchCountAggregateOutputType | null
    _avg: RiotMatchAvgAggregateOutputType | null
    _sum: RiotMatchSumAggregateOutputType | null
    _min: RiotMatchMinAggregateOutputType | null
    _max: RiotMatchMaxAggregateOutputType | null
  }

  export type RiotMatchAvgAggregateOutputType = {
    roundsPlayed: number | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
  }

  export type RiotMatchSumAggregateOutputType = {
    roundsPlayed: number | null
    teamRedRoundsWon: number | null
    teamBlueRoundsWon: number | null
  }

  export type RiotMatchMinAggregateOutputType = {
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
  }

  export type RiotMatchMaxAggregateOutputType = {
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
  }

  export type RiotMatchCountAggregateOutputType = {
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
    raw: number
    _all: number
  }


  export type RiotMatchAvgAggregateInputType = {
    roundsPlayed?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
  }

  export type RiotMatchSumAggregateInputType = {
    roundsPlayed?: true
    teamRedRoundsWon?: true
    teamBlueRoundsWon?: true
  }

  export type RiotMatchMinAggregateInputType = {
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
  }

  export type RiotMatchMaxAggregateInputType = {
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
  }

  export type RiotMatchCountAggregateInputType = {
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
    raw?: true
    _all?: true
  }

  export type RiotMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatch to aggregate.
     */
    where?: RiotMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchOrderByWithRelationInput | RiotMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiotMatchWhereUniqueInput
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
    _count?: true | RiotMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiotMatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiotMatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiotMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiotMatchMaxAggregateInputType
  }

  export type GetRiotMatchAggregateType<T extends RiotMatchAggregateArgs> = {
        [P in keyof T & keyof AggregateRiotMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiotMatch[P]>
      : GetScalarType<T[P], AggregateRiotMatch[P]>
  }




  export type RiotMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiotMatchWhereInput
    orderBy?: RiotMatchOrderByWithAggregationInput | RiotMatchOrderByWithAggregationInput[]
    by: RiotMatchScalarFieldEnum[] | RiotMatchScalarFieldEnum
    having?: RiotMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiotMatchCountAggregateInputType | true
    _avg?: RiotMatchAvgAggregateInputType
    _sum?: RiotMatchSumAggregateInputType
    _min?: RiotMatchMinAggregateInputType
    _max?: RiotMatchMaxAggregateInputType
  }

  export type RiotMatchGroupByOutputType = {
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
    raw: JsonValue | null
    _count: RiotMatchCountAggregateOutputType | null
    _avg: RiotMatchAvgAggregateOutputType | null
    _sum: RiotMatchSumAggregateOutputType | null
    _min: RiotMatchMinAggregateOutputType | null
    _max: RiotMatchMaxAggregateOutputType | null
  }

  type GetRiotMatchGroupByPayload<T extends RiotMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiotMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiotMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiotMatchGroupByOutputType[P]>
            : GetScalarType<T[P], RiotMatchGroupByOutputType[P]>
        }
      >
    >


  export type RiotMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    raw?: boolean
    players?: boolean | RiotMatch$playersArgs<ExtArgs>
    _count?: boolean | RiotMatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riotMatch"]>

  export type RiotMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    raw?: boolean
  }, ExtArgs["result"]["riotMatch"]>

  export type RiotMatchSelectScalar = {
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
    raw?: boolean
  }

  export type RiotMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | RiotMatch$playersArgs<ExtArgs>
    _count?: boolean | RiotMatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RiotMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RiotMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiotMatch"
    objects: {
      players: Prisma.$PlayerMatchPayload<ExtArgs>[]
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
      raw: Prisma.JsonValue | null
    }, ExtArgs["result"]["riotMatch"]>
    composites: {}
  }

  type RiotMatchGetPayload<S extends boolean | null | undefined | RiotMatchDefaultArgs> = $Result.GetResult<Prisma.$RiotMatchPayload, S>

  type RiotMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiotMatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiotMatchCountAggregateInputType | true
    }

  export interface RiotMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiotMatch'], meta: { name: 'RiotMatch' } }
    /**
     * Find zero or one RiotMatch that matches the filter.
     * @param {RiotMatchFindUniqueArgs} args - Arguments to find a RiotMatch
     * @example
     * // Get one RiotMatch
     * const riotMatch = await prisma.riotMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiotMatchFindUniqueArgs>(args: SelectSubset<T, RiotMatchFindUniqueArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiotMatch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiotMatchFindUniqueOrThrowArgs} args - Arguments to find a RiotMatch
     * @example
     * // Get one RiotMatch
     * const riotMatch = await prisma.riotMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiotMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, RiotMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiotMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchFindFirstArgs} args - Arguments to find a RiotMatch
     * @example
     * // Get one RiotMatch
     * const riotMatch = await prisma.riotMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiotMatchFindFirstArgs>(args?: SelectSubset<T, RiotMatchFindFirstArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiotMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchFindFirstOrThrowArgs} args - Arguments to find a RiotMatch
     * @example
     * // Get one RiotMatch
     * const riotMatch = await prisma.riotMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiotMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, RiotMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiotMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiotMatches
     * const riotMatches = await prisma.riotMatch.findMany()
     * 
     * // Get first 10 RiotMatches
     * const riotMatches = await prisma.riotMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riotMatchWithIdOnly = await prisma.riotMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiotMatchFindManyArgs>(args?: SelectSubset<T, RiotMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiotMatch.
     * @param {RiotMatchCreateArgs} args - Arguments to create a RiotMatch.
     * @example
     * // Create one RiotMatch
     * const RiotMatch = await prisma.riotMatch.create({
     *   data: {
     *     // ... data to create a RiotMatch
     *   }
     * })
     * 
     */
    create<T extends RiotMatchCreateArgs>(args: SelectSubset<T, RiotMatchCreateArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiotMatches.
     * @param {RiotMatchCreateManyArgs} args - Arguments to create many RiotMatches.
     * @example
     * // Create many RiotMatches
     * const riotMatch = await prisma.riotMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiotMatchCreateManyArgs>(args?: SelectSubset<T, RiotMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiotMatches and returns the data saved in the database.
     * @param {RiotMatchCreateManyAndReturnArgs} args - Arguments to create many RiotMatches.
     * @example
     * // Create many RiotMatches
     * const riotMatch = await prisma.riotMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiotMatches and only return the `id`
     * const riotMatchWithIdOnly = await prisma.riotMatch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiotMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, RiotMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiotMatch.
     * @param {RiotMatchDeleteArgs} args - Arguments to delete one RiotMatch.
     * @example
     * // Delete one RiotMatch
     * const RiotMatch = await prisma.riotMatch.delete({
     *   where: {
     *     // ... filter to delete one RiotMatch
     *   }
     * })
     * 
     */
    delete<T extends RiotMatchDeleteArgs>(args: SelectSubset<T, RiotMatchDeleteArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiotMatch.
     * @param {RiotMatchUpdateArgs} args - Arguments to update one RiotMatch.
     * @example
     * // Update one RiotMatch
     * const riotMatch = await prisma.riotMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiotMatchUpdateArgs>(args: SelectSubset<T, RiotMatchUpdateArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiotMatches.
     * @param {RiotMatchDeleteManyArgs} args - Arguments to filter RiotMatches to delete.
     * @example
     * // Delete a few RiotMatches
     * const { count } = await prisma.riotMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiotMatchDeleteManyArgs>(args?: SelectSubset<T, RiotMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiotMatches
     * const riotMatch = await prisma.riotMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiotMatchUpdateManyArgs>(args: SelectSubset<T, RiotMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiotMatch.
     * @param {RiotMatchUpsertArgs} args - Arguments to update or create a RiotMatch.
     * @example
     * // Update or create a RiotMatch
     * const riotMatch = await prisma.riotMatch.upsert({
     *   create: {
     *     // ... data to create a RiotMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiotMatch we want to update
     *   }
     * })
     */
    upsert<T extends RiotMatchUpsertArgs>(args: SelectSubset<T, RiotMatchUpsertArgs<ExtArgs>>): Prisma__RiotMatchClient<$Result.GetResult<Prisma.$RiotMatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiotMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchCountArgs} args - Arguments to filter RiotMatches to count.
     * @example
     * // Count the number of RiotMatches
     * const count = await prisma.riotMatch.count({
     *   where: {
     *     // ... the filter for the RiotMatches we want to count
     *   }
     * })
    **/
    count<T extends RiotMatchCountArgs>(
      args?: Subset<T, RiotMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiotMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiotMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiotMatchAggregateArgs>(args: Subset<T, RiotMatchAggregateArgs>): Prisma.PrismaPromise<GetRiotMatchAggregateType<T>>

    /**
     * Group by RiotMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiotMatchGroupByArgs} args - Group by arguments.
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
      T extends RiotMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiotMatchGroupByArgs['orderBy'] }
        : { orderBy?: RiotMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiotMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiotMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiotMatch model
   */
  readonly fields: RiotMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiotMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiotMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends RiotMatch$playersArgs<ExtArgs> = {}>(args?: Subset<T, RiotMatch$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerMatchPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the RiotMatch model
   */ 
  interface RiotMatchFieldRefs {
    readonly id: FieldRef<"RiotMatch", 'String'>
    readonly mapId: FieldRef<"RiotMatch", 'String'>
    readonly gameVersion: FieldRef<"RiotMatch", 'String'>
    readonly gameStart: FieldRef<"RiotMatch", 'DateTime'>
    readonly gameEnd: FieldRef<"RiotMatch", 'DateTime'>
    readonly isCompleted: FieldRef<"RiotMatch", 'Boolean'>
    readonly queueId: FieldRef<"RiotMatch", 'String'>
    readonly isRanked: FieldRef<"RiotMatch", 'Boolean'>
    readonly seasonId: FieldRef<"RiotMatch", 'String'>
    readonly roundsPlayed: FieldRef<"RiotMatch", 'Int'>
    readonly teamWon: FieldRef<"RiotMatch", 'RiotMatchTeamColor'>
    readonly teamRedRoundsWon: FieldRef<"RiotMatch", 'Int'>
    readonly teamBlueRoundsWon: FieldRef<"RiotMatch", 'Int'>
    readonly raw: FieldRef<"RiotMatch", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * RiotMatch findUnique
   */
  export type RiotMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatch to fetch.
     */
    where: RiotMatchWhereUniqueInput
  }

  /**
   * RiotMatch findUniqueOrThrow
   */
  export type RiotMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatch to fetch.
     */
    where: RiotMatchWhereUniqueInput
  }

  /**
   * RiotMatch findFirst
   */
  export type RiotMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatch to fetch.
     */
    where?: RiotMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchOrderByWithRelationInput | RiotMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatches.
     */
    cursor?: RiotMatchWhereUniqueInput
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
    distinct?: RiotMatchScalarFieldEnum | RiotMatchScalarFieldEnum[]
  }

  /**
   * RiotMatch findFirstOrThrow
   */
  export type RiotMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatch to fetch.
     */
    where?: RiotMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchOrderByWithRelationInput | RiotMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiotMatches.
     */
    cursor?: RiotMatchWhereUniqueInput
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
    distinct?: RiotMatchScalarFieldEnum | RiotMatchScalarFieldEnum[]
  }

  /**
   * RiotMatch findMany
   */
  export type RiotMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter, which RiotMatches to fetch.
     */
    where?: RiotMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiotMatches to fetch.
     */
    orderBy?: RiotMatchOrderByWithRelationInput | RiotMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiotMatches.
     */
    cursor?: RiotMatchWhereUniqueInput
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
    distinct?: RiotMatchScalarFieldEnum | RiotMatchScalarFieldEnum[]
  }

  /**
   * RiotMatch create
   */
  export type RiotMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a RiotMatch.
     */
    data: XOR<RiotMatchCreateInput, RiotMatchUncheckedCreateInput>
  }

  /**
   * RiotMatch createMany
   */
  export type RiotMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiotMatches.
     */
    data: RiotMatchCreateManyInput | RiotMatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatch createManyAndReturn
   */
  export type RiotMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiotMatches.
     */
    data: RiotMatchCreateManyInput | RiotMatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiotMatch update
   */
  export type RiotMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a RiotMatch.
     */
    data: XOR<RiotMatchUpdateInput, RiotMatchUncheckedUpdateInput>
    /**
     * Choose, which RiotMatch to update.
     */
    where: RiotMatchWhereUniqueInput
  }

  /**
   * RiotMatch updateMany
   */
  export type RiotMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiotMatches.
     */
    data: XOR<RiotMatchUpdateManyMutationInput, RiotMatchUncheckedUpdateManyInput>
    /**
     * Filter which RiotMatches to update
     */
    where?: RiotMatchWhereInput
  }

  /**
   * RiotMatch upsert
   */
  export type RiotMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the RiotMatch to update in case it exists.
     */
    where: RiotMatchWhereUniqueInput
    /**
     * In case the RiotMatch found by the `where` argument doesn't exist, create a new RiotMatch with this data.
     */
    create: XOR<RiotMatchCreateInput, RiotMatchUncheckedCreateInput>
    /**
     * In case the RiotMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiotMatchUpdateInput, RiotMatchUncheckedUpdateInput>
  }

  /**
   * RiotMatch delete
   */
  export type RiotMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
    /**
     * Filter which RiotMatch to delete.
     */
    where: RiotMatchWhereUniqueInput
  }

  /**
   * RiotMatch deleteMany
   */
  export type RiotMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiotMatches to delete
     */
    where?: RiotMatchWhereInput
  }

  /**
   * RiotMatch.players
   */
  export type RiotMatch$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerMatch
     */
    select?: PlayerMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerMatchInclude<ExtArgs> | null
    where?: PlayerMatchWhereInput
    orderBy?: PlayerMatchOrderByWithRelationInput | PlayerMatchOrderByWithRelationInput[]
    cursor?: PlayerMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerMatchScalarFieldEnum | PlayerMatchScalarFieldEnum[]
  }

  /**
   * RiotMatch without action
   */
  export type RiotMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiotMatch
     */
    select?: RiotMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiotMatchInclude<ExtArgs> | null
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
    puuid: 'puuid',
    riotEntitlement: 'riotEntitlement',
    riotAuth: 'riotAuth',
    riotTag: 'riotTag',
    newUser: 'newUser'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const PlayerMatchScalarFieldEnum: {
    id: 'id',
    playerId: 'playerId',
    matchId: 'matchId',
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

  export type PlayerMatchScalarFieldEnum = (typeof PlayerMatchScalarFieldEnum)[keyof typeof PlayerMatchScalarFieldEnum]


  export const RiotMatchScalarFieldEnum: {
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
    raw: 'raw'
  };

  export type RiotMatchScalarFieldEnum = (typeof RiotMatchScalarFieldEnum)[keyof typeof RiotMatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


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
    puuid?: StringFilter<"User"> | string
    riotEntitlement?: StringNullableFilter<"User"> | string | null
    riotAuth?: StringNullableFilter<"User"> | string | null
    riotTag?: StringNullableFilter<"User"> | string | null
    newUser?: BoolFilter<"User"> | boolean
    Session?: SessionListRelationFilter
    riotMatches?: PlayerMatchListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    puuid?: SortOrder
    riotEntitlement?: SortOrderInput | SortOrder
    riotAuth?: SortOrderInput | SortOrder
    riotTag?: SortOrderInput | SortOrder
    newUser?: SortOrder
    Session?: SessionOrderByRelationAggregateInput
    riotMatches?: PlayerMatchOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    puuid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    riotEntitlement?: StringNullableFilter<"User"> | string | null
    riotAuth?: StringNullableFilter<"User"> | string | null
    riotTag?: StringNullableFilter<"User"> | string | null
    newUser?: BoolFilter<"User"> | boolean
    Session?: SessionListRelationFilter
    riotMatches?: PlayerMatchListRelationFilter
  }, "puuid">

  export type UserOrderByWithAggregationInput = {
    puuid?: SortOrder
    riotEntitlement?: SortOrderInput | SortOrder
    riotAuth?: SortOrderInput | SortOrder
    riotTag?: SortOrderInput | SortOrder
    newUser?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    puuid?: StringWithAggregatesFilter<"User"> | string
    riotEntitlement?: StringNullableWithAggregatesFilter<"User"> | string | null
    riotAuth?: StringNullableWithAggregatesFilter<"User"> | string | null
    riotTag?: StringNullableWithAggregatesFilter<"User"> | string | null
    newUser?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
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
    user?: XOR<UserRelationFilter, UserWhereInput>
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

  export type PlayerMatchWhereInput = {
    AND?: PlayerMatchWhereInput | PlayerMatchWhereInput[]
    OR?: PlayerMatchWhereInput[]
    NOT?: PlayerMatchWhereInput | PlayerMatchWhereInput[]
    id?: StringFilter<"PlayerMatch"> | string
    playerId?: StringFilter<"PlayerMatch"> | string
    matchId?: StringFilter<"PlayerMatch"> | string
    riotTag?: StringNullableFilter<"PlayerMatch"> | string | null
    teamId?: StringNullableFilter<"PlayerMatch"> | string | null
    characterId?: StringNullableFilter<"PlayerMatch"> | string | null
    kills?: IntNullableFilter<"PlayerMatch"> | number | null
    deaths?: IntNullableFilter<"PlayerMatch"> | number | null
    assists?: IntNullableFilter<"PlayerMatch"> | number | null
    tier?: IntNullableFilter<"PlayerMatch"> | number | null
    playerCard?: StringNullableFilter<"PlayerMatch"> | string | null
    playerTitle?: StringNullableFilter<"PlayerMatch"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"PlayerMatch"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"PlayerMatch"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"PlayerMatch"> | number | null
    player?: XOR<UserRelationFilter, UserWhereInput>
    match?: XOR<RiotMatchRelationFilter, RiotMatchWhereInput>
  }

  export type PlayerMatchOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
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
    player?: UserOrderByWithRelationInput
    match?: RiotMatchOrderByWithRelationInput
  }

  export type PlayerMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    playerId_matchId?: PlayerMatchPlayerIdMatchIdCompoundUniqueInput
    AND?: PlayerMatchWhereInput | PlayerMatchWhereInput[]
    OR?: PlayerMatchWhereInput[]
    NOT?: PlayerMatchWhereInput | PlayerMatchWhereInput[]
    playerId?: StringFilter<"PlayerMatch"> | string
    matchId?: StringFilter<"PlayerMatch"> | string
    riotTag?: StringNullableFilter<"PlayerMatch"> | string | null
    teamId?: StringNullableFilter<"PlayerMatch"> | string | null
    characterId?: StringNullableFilter<"PlayerMatch"> | string | null
    kills?: IntNullableFilter<"PlayerMatch"> | number | null
    deaths?: IntNullableFilter<"PlayerMatch"> | number | null
    assists?: IntNullableFilter<"PlayerMatch"> | number | null
    tier?: IntNullableFilter<"PlayerMatch"> | number | null
    playerCard?: StringNullableFilter<"PlayerMatch"> | string | null
    playerTitle?: StringNullableFilter<"PlayerMatch"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"PlayerMatch"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"PlayerMatch"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"PlayerMatch"> | number | null
    player?: XOR<UserRelationFilter, UserWhereInput>
    match?: XOR<RiotMatchRelationFilter, RiotMatchWhereInput>
  }, "id" | "playerId_matchId">

  export type PlayerMatchOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
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
    _count?: PlayerMatchCountOrderByAggregateInput
    _avg?: PlayerMatchAvgOrderByAggregateInput
    _max?: PlayerMatchMaxOrderByAggregateInput
    _min?: PlayerMatchMinOrderByAggregateInput
    _sum?: PlayerMatchSumOrderByAggregateInput
  }

  export type PlayerMatchScalarWhereWithAggregatesInput = {
    AND?: PlayerMatchScalarWhereWithAggregatesInput | PlayerMatchScalarWhereWithAggregatesInput[]
    OR?: PlayerMatchScalarWhereWithAggregatesInput[]
    NOT?: PlayerMatchScalarWhereWithAggregatesInput | PlayerMatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlayerMatch"> | string
    playerId?: StringWithAggregatesFilter<"PlayerMatch"> | string
    matchId?: StringWithAggregatesFilter<"PlayerMatch"> | string
    riotTag?: StringNullableWithAggregatesFilter<"PlayerMatch"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"PlayerMatch"> | string | null
    characterId?: StringNullableWithAggregatesFilter<"PlayerMatch"> | string | null
    kills?: IntNullableWithAggregatesFilter<"PlayerMatch"> | number | null
    deaths?: IntNullableWithAggregatesFilter<"PlayerMatch"> | number | null
    assists?: IntNullableWithAggregatesFilter<"PlayerMatch"> | number | null
    tier?: IntNullableWithAggregatesFilter<"PlayerMatch"> | number | null
    playerCard?: StringNullableWithAggregatesFilter<"PlayerMatch"> | string | null
    playerTitle?: StringNullableWithAggregatesFilter<"PlayerMatch"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableWithAggregatesFilter<"PlayerMatch"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableWithAggregatesFilter<"PlayerMatch"> | boolean | null
    teamRoundsWon?: IntNullableWithAggregatesFilter<"PlayerMatch"> | number | null
  }

  export type RiotMatchWhereInput = {
    AND?: RiotMatchWhereInput | RiotMatchWhereInput[]
    OR?: RiotMatchWhereInput[]
    NOT?: RiotMatchWhereInput | RiotMatchWhereInput[]
    id?: StringFilter<"RiotMatch"> | string
    mapId?: StringNullableFilter<"RiotMatch"> | string | null
    gameVersion?: StringNullableFilter<"RiotMatch"> | string | null
    gameStart?: DateTimeNullableFilter<"RiotMatch"> | Date | string | null
    gameEnd?: DateTimeNullableFilter<"RiotMatch"> | Date | string | null
    isCompleted?: BoolNullableFilter<"RiotMatch"> | boolean | null
    queueId?: StringNullableFilter<"RiotMatch"> | string | null
    isRanked?: BoolNullableFilter<"RiotMatch"> | boolean | null
    seasonId?: StringNullableFilter<"RiotMatch"> | string | null
    roundsPlayed?: IntNullableFilter<"RiotMatch"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableFilter<"RiotMatch"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableFilter<"RiotMatch"> | number | null
    teamBlueRoundsWon?: IntNullableFilter<"RiotMatch"> | number | null
    raw?: JsonNullableFilter<"RiotMatch">
    players?: PlayerMatchListRelationFilter
  }

  export type RiotMatchOrderByWithRelationInput = {
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
    raw?: SortOrderInput | SortOrder
    players?: PlayerMatchOrderByRelationAggregateInput
  }

  export type RiotMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiotMatchWhereInput | RiotMatchWhereInput[]
    OR?: RiotMatchWhereInput[]
    NOT?: RiotMatchWhereInput | RiotMatchWhereInput[]
    mapId?: StringNullableFilter<"RiotMatch"> | string | null
    gameVersion?: StringNullableFilter<"RiotMatch"> | string | null
    gameStart?: DateTimeNullableFilter<"RiotMatch"> | Date | string | null
    gameEnd?: DateTimeNullableFilter<"RiotMatch"> | Date | string | null
    isCompleted?: BoolNullableFilter<"RiotMatch"> | boolean | null
    queueId?: StringNullableFilter<"RiotMatch"> | string | null
    isRanked?: BoolNullableFilter<"RiotMatch"> | boolean | null
    seasonId?: StringNullableFilter<"RiotMatch"> | string | null
    roundsPlayed?: IntNullableFilter<"RiotMatch"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableFilter<"RiotMatch"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableFilter<"RiotMatch"> | number | null
    teamBlueRoundsWon?: IntNullableFilter<"RiotMatch"> | number | null
    raw?: JsonNullableFilter<"RiotMatch">
    players?: PlayerMatchListRelationFilter
  }, "id">

  export type RiotMatchOrderByWithAggregationInput = {
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
    raw?: SortOrderInput | SortOrder
    _count?: RiotMatchCountOrderByAggregateInput
    _avg?: RiotMatchAvgOrderByAggregateInput
    _max?: RiotMatchMaxOrderByAggregateInput
    _min?: RiotMatchMinOrderByAggregateInput
    _sum?: RiotMatchSumOrderByAggregateInput
  }

  export type RiotMatchScalarWhereWithAggregatesInput = {
    AND?: RiotMatchScalarWhereWithAggregatesInput | RiotMatchScalarWhereWithAggregatesInput[]
    OR?: RiotMatchScalarWhereWithAggregatesInput[]
    NOT?: RiotMatchScalarWhereWithAggregatesInput | RiotMatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiotMatch"> | string
    mapId?: StringNullableWithAggregatesFilter<"RiotMatch"> | string | null
    gameVersion?: StringNullableWithAggregatesFilter<"RiotMatch"> | string | null
    gameStart?: DateTimeNullableWithAggregatesFilter<"RiotMatch"> | Date | string | null
    gameEnd?: DateTimeNullableWithAggregatesFilter<"RiotMatch"> | Date | string | null
    isCompleted?: BoolNullableWithAggregatesFilter<"RiotMatch"> | boolean | null
    queueId?: StringNullableWithAggregatesFilter<"RiotMatch"> | string | null
    isRanked?: BoolNullableWithAggregatesFilter<"RiotMatch"> | boolean | null
    seasonId?: StringNullableWithAggregatesFilter<"RiotMatch"> | string | null
    roundsPlayed?: IntNullableWithAggregatesFilter<"RiotMatch"> | number | null
    teamWon?: EnumRiotMatchTeamColorNullableWithAggregatesFilter<"RiotMatch"> | $Enums.RiotMatchTeamColor | null
    teamRedRoundsWon?: IntNullableWithAggregatesFilter<"RiotMatch"> | number | null
    teamBlueRoundsWon?: IntNullableWithAggregatesFilter<"RiotMatch"> | number | null
    raw?: JsonNullableWithAggregatesFilter<"RiotMatch">
  }

  export type UserCreateInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    Session?: SessionCreateNestedManyWithoutUserInput
    riotMatches?: PlayerMatchCreateNestedManyWithoutPlayerInput
  }

  export type UserUncheckedCreateInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
    riotMatches?: PlayerMatchUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type UserUpdateInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    Session?: SessionUpdateManyWithoutUserNestedInput
    riotMatches?: PlayerMatchUpdateManyWithoutPlayerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
    riotMatches?: PlayerMatchUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type UserCreateManyInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
  }

  export type UserUpdateManyMutationInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
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

  export type PlayerMatchCreateInput = {
    id?: string
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
    player: UserCreateNestedOneWithoutRiotMatchesInput
    match: RiotMatchCreateNestedOneWithoutPlayersInput
  }

  export type PlayerMatchUncheckedCreateInput = {
    id?: string
    playerId: string
    matchId: string
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

  export type PlayerMatchUpdateInput = {
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
    player?: UserUpdateOneRequiredWithoutRiotMatchesNestedInput
    match?: RiotMatchUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerMatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
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

  export type PlayerMatchCreateManyInput = {
    id?: string
    playerId: string
    matchId: string
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

  export type PlayerMatchUpdateManyMutationInput = {
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

  export type PlayerMatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
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

  export type RiotMatchCreateInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
    players?: PlayerMatchCreateNestedManyWithoutMatchInput
  }

  export type RiotMatchUncheckedCreateInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
    players?: PlayerMatchUncheckedCreateNestedManyWithoutMatchInput
  }

  export type RiotMatchUpdateInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
    players?: PlayerMatchUpdateManyWithoutMatchNestedInput
  }

  export type RiotMatchUncheckedUpdateInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
    players?: PlayerMatchUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type RiotMatchCreateManyInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiotMatchUpdateManyMutationInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiotMatchUncheckedUpdateManyInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type PlayerMatchListRelationFilter = {
    every?: PlayerMatchWhereInput
    some?: PlayerMatchWhereInput
    none?: PlayerMatchWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerMatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    puuid?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotTag?: SortOrder
    newUser?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    puuid?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotTag?: SortOrder
    newUser?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    puuid?: SortOrder
    riotEntitlement?: SortOrder
    riotAuth?: SortOrder
    riotTag?: SortOrder
    newUser?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserRelationFilter = {
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type RiotMatchRelationFilter = {
    is?: RiotMatchWhereInput
    isNot?: RiotMatchWhereInput
  }

  export type PlayerMatchPlayerIdMatchIdCompoundUniqueInput = {
    playerId: string
    matchId: string
  }

  export type PlayerMatchCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
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

  export type PlayerMatchAvgOrderByAggregateInput = {
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    teamRoundsWon?: SortOrder
  }

  export type PlayerMatchMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
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

  export type PlayerMatchMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    matchId?: SortOrder
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

  export type PlayerMatchSumOrderByAggregateInput = {
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    tier?: SortOrder
    teamRoundsWon?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RiotMatchCountOrderByAggregateInput = {
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
    raw?: SortOrder
  }

  export type RiotMatchAvgOrderByAggregateInput = {
    roundsPlayed?: SortOrder
    teamRedRoundsWon?: SortOrder
    teamBlueRoundsWon?: SortOrder
  }

  export type RiotMatchMaxOrderByAggregateInput = {
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
  }

  export type RiotMatchMinOrderByAggregateInput = {
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
  }

  export type RiotMatchSumOrderByAggregateInput = {
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type PlayerMatchCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput> | PlayerMatchCreateWithoutPlayerInput[] | PlayerMatchUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutPlayerInput | PlayerMatchCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayerMatchCreateManyPlayerInputEnvelope
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type PlayerMatchUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput> | PlayerMatchCreateWithoutPlayerInput[] | PlayerMatchUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutPlayerInput | PlayerMatchCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayerMatchCreateManyPlayerInputEnvelope
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type PlayerMatchUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput> | PlayerMatchCreateWithoutPlayerInput[] | PlayerMatchUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutPlayerInput | PlayerMatchCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayerMatchUpsertWithWhereUniqueWithoutPlayerInput | PlayerMatchUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayerMatchCreateManyPlayerInputEnvelope
    set?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    disconnect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    delete?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    update?: PlayerMatchUpdateWithWhereUniqueWithoutPlayerInput | PlayerMatchUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayerMatchUpdateManyWithWhereWithoutPlayerInput | PlayerMatchUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
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

  export type PlayerMatchUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput> | PlayerMatchCreateWithoutPlayerInput[] | PlayerMatchUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutPlayerInput | PlayerMatchCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayerMatchUpsertWithWhereUniqueWithoutPlayerInput | PlayerMatchUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayerMatchCreateManyPlayerInputEnvelope
    set?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    disconnect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    delete?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    update?: PlayerMatchUpdateWithWhereUniqueWithoutPlayerInput | PlayerMatchUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayerMatchUpdateManyWithWhereWithoutPlayerInput | PlayerMatchUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutRiotMatchesInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput
    connect?: UserWhereUniqueInput
  }

  export type RiotMatchCreateNestedOneWithoutPlayersInput = {
    create?: XOR<RiotMatchCreateWithoutPlayersInput, RiotMatchUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: RiotMatchCreateOrConnectWithoutPlayersInput
    connect?: RiotMatchWhereUniqueInput
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

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutRiotMatchesNestedInput = {
    create?: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRiotMatchesInput
    upsert?: UserUpsertWithoutRiotMatchesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRiotMatchesInput, UserUpdateWithoutRiotMatchesInput>, UserUncheckedUpdateWithoutRiotMatchesInput>
  }

  export type RiotMatchUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<RiotMatchCreateWithoutPlayersInput, RiotMatchUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: RiotMatchCreateOrConnectWithoutPlayersInput
    upsert?: RiotMatchUpsertWithoutPlayersInput
    connect?: RiotMatchWhereUniqueInput
    update?: XOR<XOR<RiotMatchUpdateToOneWithWhereWithoutPlayersInput, RiotMatchUpdateWithoutPlayersInput>, RiotMatchUncheckedUpdateWithoutPlayersInput>
  }

  export type PlayerMatchCreateNestedManyWithoutMatchInput = {
    create?: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput> | PlayerMatchCreateWithoutMatchInput[] | PlayerMatchUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutMatchInput | PlayerMatchCreateOrConnectWithoutMatchInput[]
    createMany?: PlayerMatchCreateManyMatchInputEnvelope
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
  }

  export type PlayerMatchUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput> | PlayerMatchCreateWithoutMatchInput[] | PlayerMatchUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutMatchInput | PlayerMatchCreateOrConnectWithoutMatchInput[]
    createMany?: PlayerMatchCreateManyMatchInputEnvelope
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PlayerMatchUpdateManyWithoutMatchNestedInput = {
    create?: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput> | PlayerMatchCreateWithoutMatchInput[] | PlayerMatchUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutMatchInput | PlayerMatchCreateOrConnectWithoutMatchInput[]
    upsert?: PlayerMatchUpsertWithWhereUniqueWithoutMatchInput | PlayerMatchUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: PlayerMatchCreateManyMatchInputEnvelope
    set?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    disconnect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    delete?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    update?: PlayerMatchUpdateWithWhereUniqueWithoutMatchInput | PlayerMatchUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: PlayerMatchUpdateManyWithWhereWithoutMatchInput | PlayerMatchUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
  }

  export type PlayerMatchUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput> | PlayerMatchCreateWithoutMatchInput[] | PlayerMatchUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: PlayerMatchCreateOrConnectWithoutMatchInput | PlayerMatchCreateOrConnectWithoutMatchInput[]
    upsert?: PlayerMatchUpsertWithWhereUniqueWithoutMatchInput | PlayerMatchUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: PlayerMatchCreateManyMatchInputEnvelope
    set?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    disconnect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    delete?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    connect?: PlayerMatchWhereUniqueInput | PlayerMatchWhereUniqueInput[]
    update?: PlayerMatchUpdateWithWhereUniqueWithoutMatchInput | PlayerMatchUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: PlayerMatchUpdateManyWithWhereWithoutMatchInput | PlayerMatchUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiotMatchTeamColor | EnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiotMatchTeamColor[] | ListEnumRiotMatchTeamColorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiotMatchTeamColorNullableFilter<$PrismaModel> | $Enums.RiotMatchTeamColor | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type PlayerMatchCreateWithoutPlayerInput = {
    id?: string
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
    match: RiotMatchCreateNestedOneWithoutPlayersInput
  }

  export type PlayerMatchUncheckedCreateWithoutPlayerInput = {
    id?: string
    matchId: string
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

  export type PlayerMatchCreateOrConnectWithoutPlayerInput = {
    where: PlayerMatchWhereUniqueInput
    create: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput>
  }

  export type PlayerMatchCreateManyPlayerInputEnvelope = {
    data: PlayerMatchCreateManyPlayerInput | PlayerMatchCreateManyPlayerInput[]
    skipDuplicates?: boolean
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

  export type PlayerMatchUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PlayerMatchWhereUniqueInput
    update: XOR<PlayerMatchUpdateWithoutPlayerInput, PlayerMatchUncheckedUpdateWithoutPlayerInput>
    create: XOR<PlayerMatchCreateWithoutPlayerInput, PlayerMatchUncheckedCreateWithoutPlayerInput>
  }

  export type PlayerMatchUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PlayerMatchWhereUniqueInput
    data: XOR<PlayerMatchUpdateWithoutPlayerInput, PlayerMatchUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayerMatchUpdateManyWithWhereWithoutPlayerInput = {
    where: PlayerMatchScalarWhereInput
    data: XOR<PlayerMatchUpdateManyMutationInput, PlayerMatchUncheckedUpdateManyWithoutPlayerInput>
  }

  export type PlayerMatchScalarWhereInput = {
    AND?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
    OR?: PlayerMatchScalarWhereInput[]
    NOT?: PlayerMatchScalarWhereInput | PlayerMatchScalarWhereInput[]
    id?: StringFilter<"PlayerMatch"> | string
    playerId?: StringFilter<"PlayerMatch"> | string
    matchId?: StringFilter<"PlayerMatch"> | string
    riotTag?: StringNullableFilter<"PlayerMatch"> | string | null
    teamId?: StringNullableFilter<"PlayerMatch"> | string | null
    characterId?: StringNullableFilter<"PlayerMatch"> | string | null
    kills?: IntNullableFilter<"PlayerMatch"> | number | null
    deaths?: IntNullableFilter<"PlayerMatch"> | number | null
    assists?: IntNullableFilter<"PlayerMatch"> | number | null
    tier?: IntNullableFilter<"PlayerMatch"> | number | null
    playerCard?: StringNullableFilter<"PlayerMatch"> | string | null
    playerTitle?: StringNullableFilter<"PlayerMatch"> | string | null
    teamColor?: EnumRiotMatchTeamColorNullableFilter<"PlayerMatch"> | $Enums.RiotMatchTeamColor | null
    teamWon?: BoolNullableFilter<"PlayerMatch"> | boolean | null
    teamRoundsWon?: IntNullableFilter<"PlayerMatch"> | number | null
  }

  export type UserCreateWithoutSessionInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    riotMatches?: PlayerMatchCreateNestedManyWithoutPlayerInput
  }

  export type UserUncheckedCreateWithoutSessionInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    riotMatches?: PlayerMatchUncheckedCreateNestedManyWithoutPlayerInput
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
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    riotMatches?: PlayerMatchUpdateManyWithoutPlayerNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    riotMatches?: PlayerMatchUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type UserCreateWithoutRiotMatchesInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    Session?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRiotMatchesInput = {
    puuid: string
    riotEntitlement?: string | null
    riotAuth?: string | null
    riotTag?: string | null
    newUser?: boolean
    Session?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRiotMatchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
  }

  export type RiotMatchCreateWithoutPlayersInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiotMatchUncheckedCreateWithoutPlayersInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiotMatchCreateOrConnectWithoutPlayersInput = {
    where: RiotMatchWhereUniqueInput
    create: XOR<RiotMatchCreateWithoutPlayersInput, RiotMatchUncheckedCreateWithoutPlayersInput>
  }

  export type UserUpsertWithoutRiotMatchesInput = {
    update: XOR<UserUpdateWithoutRiotMatchesInput, UserUncheckedUpdateWithoutRiotMatchesInput>
    create: XOR<UserCreateWithoutRiotMatchesInput, UserUncheckedCreateWithoutRiotMatchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRiotMatchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRiotMatchesInput, UserUncheckedUpdateWithoutRiotMatchesInput>
  }

  export type UserUpdateWithoutRiotMatchesInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    Session?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRiotMatchesInput = {
    puuid?: StringFieldUpdateOperationsInput | string
    riotEntitlement?: NullableStringFieldUpdateOperationsInput | string | null
    riotAuth?: NullableStringFieldUpdateOperationsInput | string | null
    riotTag?: NullableStringFieldUpdateOperationsInput | string | null
    newUser?: BoolFieldUpdateOperationsInput | boolean
    Session?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RiotMatchUpsertWithoutPlayersInput = {
    update: XOR<RiotMatchUpdateWithoutPlayersInput, RiotMatchUncheckedUpdateWithoutPlayersInput>
    create: XOR<RiotMatchCreateWithoutPlayersInput, RiotMatchUncheckedCreateWithoutPlayersInput>
    where?: RiotMatchWhereInput
  }

  export type RiotMatchUpdateToOneWithWhereWithoutPlayersInput = {
    where?: RiotMatchWhereInput
    data: XOR<RiotMatchUpdateWithoutPlayersInput, RiotMatchUncheckedUpdateWithoutPlayersInput>
  }

  export type RiotMatchUpdateWithoutPlayersInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiotMatchUncheckedUpdateWithoutPlayersInput = {
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
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PlayerMatchCreateWithoutMatchInput = {
    id?: string
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
    player: UserCreateNestedOneWithoutRiotMatchesInput
  }

  export type PlayerMatchUncheckedCreateWithoutMatchInput = {
    id?: string
    playerId: string
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

  export type PlayerMatchCreateOrConnectWithoutMatchInput = {
    where: PlayerMatchWhereUniqueInput
    create: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput>
  }

  export type PlayerMatchCreateManyMatchInputEnvelope = {
    data: PlayerMatchCreateManyMatchInput | PlayerMatchCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type PlayerMatchUpsertWithWhereUniqueWithoutMatchInput = {
    where: PlayerMatchWhereUniqueInput
    update: XOR<PlayerMatchUpdateWithoutMatchInput, PlayerMatchUncheckedUpdateWithoutMatchInput>
    create: XOR<PlayerMatchCreateWithoutMatchInput, PlayerMatchUncheckedCreateWithoutMatchInput>
  }

  export type PlayerMatchUpdateWithWhereUniqueWithoutMatchInput = {
    where: PlayerMatchWhereUniqueInput
    data: XOR<PlayerMatchUpdateWithoutMatchInput, PlayerMatchUncheckedUpdateWithoutMatchInput>
  }

  export type PlayerMatchUpdateManyWithWhereWithoutMatchInput = {
    where: PlayerMatchScalarWhereInput
    data: XOR<PlayerMatchUpdateManyMutationInput, PlayerMatchUncheckedUpdateManyWithoutMatchInput>
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
  }

  export type PlayerMatchCreateManyPlayerInput = {
    id?: string
    matchId: string
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

  export type PlayerMatchUpdateWithoutPlayerInput = {
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
    match?: RiotMatchUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerMatchUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
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

  export type PlayerMatchUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
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

  export type PlayerMatchCreateManyMatchInput = {
    id?: string
    playerId: string
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

  export type PlayerMatchUpdateWithoutMatchInput = {
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
    player?: UserUpdateOneRequiredWithoutRiotMatchesNestedInput
  }

  export type PlayerMatchUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
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

  export type PlayerMatchUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchCountOutputTypeDefaultArgs instead
     */
    export type RiotMatchCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayerMatchDefaultArgs instead
     */
    export type PlayerMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayerMatchDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiotMatchDefaultArgs instead
     */
    export type RiotMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiotMatchDefaultArgs<ExtArgs>

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