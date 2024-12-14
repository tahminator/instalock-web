type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type SuccessType<T = unknown, debug = never> = {
  success: true;
  message: string;
  data: T;
  _debug: debug;
};

export type ErrorType<debug = never> = {
  success: false;
  message: string;
  _debug: debug;
};

/**
 * Default API standard response.
 * If you are in development, simply pass a debug object type.
 */
export type ApiDefault<T = unknown, debug = never> = Prettify<
  SuccessType<T, debug> | ErrorType<debug>
>;

export type DebugDefault<T = any> = Prettify<
  { message: string; date: Date } & Record<string, T>
>;
