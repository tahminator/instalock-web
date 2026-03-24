import { register, Histogram } from "prom-client";

import type { F } from "../types";

export function executionWrapper(
  fn: F,
  className: string,
  propertyKey: string | symbol,
): F {
  const fnName = String(propertyKey);
  const metricName = `execution.seconds`.replace(".", "_");

  const histogram = (() => {
    const v = register.getSingleMetric(metricName);
    if (v) {
      return v as Histogram<"className" | "functionName" | "status">;
    }

    return new Histogram({
      name: metricName,
      help: `Duration of ${className} execution in seconds`,
      labelNames: ["className", "functionName", "status"],
    });
  })();

  return function (this: unknown, ...args: unknown[]) {
    const end = histogram.startTimer({ className, functionName: fnName });

    try {
      const result = (fn as unknown as F).apply(this, args);
      if (result instanceof Promise) {
        return result
          .then((v) => {
            end({ status: "success" });
            return v;
          })
          .catch((e) => {
            end({ status: "error" });
            throw e;
          });
      }

      end({ status: "success" });
      return result;
    } catch (error) {
      end({ status: "error" });
      throw error;
    }
  };
}
