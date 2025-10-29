type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type SuccessType<T = unknown, TDebug = never> = {
  success: true;
  message: string;
  payload: T;
  _debug: TDebug;
};

export type ErrorType<TDebug = never> = {
  success: false;
  message: string;
  _debug: TDebug;
};

/**
 * Default API standard response.
 * If you are in development, simply pass a debug object type.
 */
export type ApiDefault<T = unknown, TDebug = never> = Prettify<
  SuccessType<T, TDebug> | ErrorType<TDebug>
>;

export type DebugDefault<T = any> = Prettify<
  { message: string; date: Date } & Record<string, T>
>;
