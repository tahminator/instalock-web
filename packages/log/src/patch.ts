/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pino } from "pino";

import { wrap } from "./wrap";

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
    : logger.info(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldWarn(...args)
    : logger.warn(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldError(...args)
    : logger.error(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.debug = function (...args: any[]) {
  const _ =
    process.env.NODE_ENV === "development" ?
      _oldDebug(...args)
    : logger.debug(...args);
};
