import { pino } from "pino";

import { wrap } from "@/logger";

const _oldLog = console.log;
const _oldWarn = console.warn;
const _oldError = console.error;
const _oldDebug = console.debug;

const logger = wrap(pino());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldLog(...args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : (logger.info as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldWarn(...args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : (logger.warn as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldError(...args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : (logger.error as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.debug = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldDebug(...args)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : (logger.debug as any)(...args);
};
