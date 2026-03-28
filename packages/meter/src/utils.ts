import type { Histogram } from "prom-client";

import type { F } from "../types";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type Prom = Awaited<typeof import("prom-client")> | null;

let prom: Prom | null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  prom = require("prom-client") as Prom;
} catch (_) {
  prom = null;
}

export function executionWrapper(
  fn: F,
  className: string,
  propertyKey: string | symbol,
): F {
  const fnName = String(propertyKey);
  const metricName = `execution.seconds`.replace(".", "_");

  if (!prom) {
    console.debug("No timer, skipping registration");
    return function (this: unknown, ...args: unknown[]) {
      const result = (fn as unknown as F).apply(this, args) as unknown;
      if (result instanceof Promise) {
        return result
          .then((v) => {
            return v as unknown;
          })
          .catch((e) => {
            throw e;
          });
      }

      return result;
    };
  }

  const histogram: Histogram = (() => {
    const v = prom.register.getSingleMetric(metricName);
    if (v) {
      return v as Histogram;
    }

    return new prom.Histogram({
      name: metricName,
      help: `Duration of function executions in seconds`,
      labelNames: ["className", "functionName", "status"],
    });
  })();

  return function (this: unknown, ...args: unknown[]) {
    const end = histogram.startTimer({ className, functionName: fnName });

    try {
      const result = (fn as unknown as F).apply(this, args) as unknown;
      if (result instanceof Promise) {
        return result
          .then((v) => {
            end({ status: "success" });
            return v as unknown;
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
