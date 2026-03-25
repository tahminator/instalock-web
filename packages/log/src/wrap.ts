// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * https://github.com/pinojs/pino/issues/673#issuecomment-506979971
 */
export function wrap(logger) {
  const { error, child } = logger;
  function errorRearranger(...args) {
    if (typeof args[0] === "string" && args.length > 1) {
      for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (arg instanceof Error) {
          const [err] = args.splice(i, 1);
          args.unshift(err);
        }
      }
    }
    return error.apply(this, args);
  }
  function childModifier(...args) {
    const c = child.apply(this, args);
    c.error = errorRearranger;
    c.child = childModifier;
    return c;
  }
  logger.error = errorRearranger;
  logger.child = childModifier;
  return logger;
}
