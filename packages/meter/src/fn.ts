import type { F } from "../types";

import { timedWrapper } from "./utils";

/**
 * Apply this to any function to record the execution time of all
 * functions within the method in a histogram.
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

    const newFn = timedWrapper(fn, className, propertyKey);

    descriptor.value = newFn as unknown as T;
  };
}
