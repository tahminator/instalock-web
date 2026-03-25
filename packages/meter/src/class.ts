import type { F, Method } from "../types";

import { executionWrapper } from "./utils";

/**
 * Apply this to any class to record the execution time of all
 * functions within the method in a histogram.
 *
 * This method can be applied anywhere, even in shared classes that can
 * be used in Node.js and the browser. As long as the `prom-client` doesn't
 * exist, it will run the function as normal.
 */
export function TimedAll(): ClassDecorator {
  return (target: F) => {
    const className = target.name;
    const prototype = target.prototype;
    const classProto = target;

    const propertyNames = Object.getOwnPropertyNames(prototype).filter(
      (p) => p !== "constructor",
    );
    const propertySymbols = Object.getOwnPropertySymbols(prototype);

    const staticPropertyNames = Object.getOwnPropertyNames(classProto).filter(
      (p) => {
        const descriptor = Object.getOwnPropertyDescriptor(classProto, p);
        return (
          typeof descriptor?.value === "function" &&
          p !== "length" &&
          p !== "name" &&
          p !== "prototype" &&
          p !== "constructor"
        );
      },
    );
    const staticPropertySymbols = Object.getOwnPropertySymbols(classProto);

    const allMethods: Method[] = [
      ...propertyNames.map((name) => ({
        name,
        type: "ns" as const,
      })),
      ...propertySymbols.map((name) => ({
        name,
        type: "ns" as const,
      })),
      ...staticPropertyNames.map((name) => ({
        name,
        type: "s" as const,
      })),
      ...staticPropertySymbols.map((name) => ({
        name,
        type: "s" as const,
      })),
    ];

    for (const { name, type } of allMethods) {
      const descriptor = Object.getOwnPropertyDescriptor(
        type === "ns" ? prototype : classProto,
        name,
      );
      if (descriptor && typeof descriptor.value === "function") {
        const originalMethod = descriptor.value;
        descriptor.value = executionWrapper(originalMethod, className, name);

        Object.defineProperty(
          type === "ns" ? prototype : classProto,
          name,
          descriptor,
        );
      }
    }
  };
}
