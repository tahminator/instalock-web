import { pino } from "pino";

const _oldLog = console.log;
const _oldWarn = console.warn;
const _oldError = console.error;
const _oldDebug = console.debug;

const logger = pino({
  transport: {
    target:
      process.env.NODE_ENV === "development" ? "pino-pretty" : "pino/file",
    options: {
      colorize: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log = function (...args: any[]) {
  logger.info(args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = function (...args: any[]) {
  logger.warn(args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = function (...args: any[]) {
  logger.error(args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.debug = function (...args: any[]) {
  logger.debug(args);
};
