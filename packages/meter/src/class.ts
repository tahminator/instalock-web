import type { F } from "../types";

import { timedWrapper } from "./utils";

/**
 * Apply this to any class to record the execution time of all
 * functions within the method in a histogram.
 */
export function TimedAll(): ClassDecorator {
  return (target: F) => {
    const className = target.name;
    const prototype = target.prototype;

    const propertyNames = Object.getOwnPropertyNames(prototype);
    const propertySymbols = Object.getOwnPropertySymbols(prototype);

    for (const key of [...propertyNames, ...propertySymbols]) {
      if (key === "constructor") continue;

      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      if (descriptor && typeof descriptor.value === "function") {
        const originalMethod = descriptor.value;
        descriptor.value = timedWrapper(originalMethod, className, key);

        Object.defineProperty(prototype, key, descriptor);
      }
    }
  };
}
