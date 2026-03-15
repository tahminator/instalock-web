import { pino } from "pino";

const _oldLog = console.log;
const _oldWarn = console.warn;
const _oldError = console.error;
const _oldDebug = console.debug;

const logger = pino(
  process.env.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : undefined,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log = function (...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (logger.info as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = function (...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (logger.warn as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = function (...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (logger.error as any)(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.debug = function (...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (logger.debug as any)(...args);
};
