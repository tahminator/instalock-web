import { pino } from "pino";

const oldLog_ = console.log;
const oldWarn_ = console.warn;
const oldError_ = console.error;
const oldDebug_ = console.debug;

const logger = pino({
  transport: {
    target:
      process.env.NODE_ENV === "development" ? "pino-pretty" : "pino/file",
    options: {
      colorize: true,
    },
  },
});

console.log = function (...args: any[]) {
  logger.info(args);
};

console.warn = function (...args: any[]) {
  logger.warn(args);
};

console.error = function (...args: any[]) {
  logger.error(args);
};

console.debug = function (...args: any[]) {
  logger.debug(args);
};
