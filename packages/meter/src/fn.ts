import type { F } from "../types";

import { executionWrapper } from "./utils";

/**
 * Apply this to any function to record the execution time of all
 * functions within the method in a histogram.
 *
 * This method can be applied anywhere, even in shared classes that can
 * be used in Node.js and the browser. As long as the `prom-client` doesn't
 * exist, it will run the function as normal.
 */
export function Timed(): MethodDecorator {
  return <T>(
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    const fn = descriptor.value as unknown as F;
    if (!fn) {
      throw new Error("Timed failed due to missing function.");
    }

    const className = target.constructor.name;

    const newFn = executionWrapper(fn, className, propertyKey);

    descriptor.value = newFn as unknown as T;
  };
}
