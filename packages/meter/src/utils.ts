import { register, Histogram } from "prom-client";

import type { F } from "../types";

export function timedWrapper(
  fn: F,
  className: string,
  propertyKey: string | symbol,
): F {
  const fnName = String(propertyKey);
  const metricName = `${className}.seconds`.replace(".", "_");

  const histogram = (() => {
    const v = register.getSingleMetric(metricName);
    if (v) {
      return v as Histogram;
    }

    return new Histogram({
      name: metricName,
      help: `Duration of ${className} execution in seconds`,
      labelNames: ["functionName", "status"],
    }) as Histogram;
  })();

  return function (this: unknown, ...args: unknown[]) {
    const end = histogram.startTimer({ functionName: fnName });

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
