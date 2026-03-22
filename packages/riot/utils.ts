import type * as promClient from "prom-client";

export async function withMetrics<T>(
  {
    fnName,
    histogram,
  }: {
    fnName: string;
    histogram: promClient.Histogram | undefined;
  },
  fn: () => Promise<T>,
): Promise<T> {
  if (!histogram) {
    return await fn();
  }

  const end = histogram.startTimer({ functionName: fnName });
  try {
    const result = await fn();
    end({ status: "success" });
    return result;
  } catch (error) {
    end({ status: "error" });
    throw error;
  }
}
