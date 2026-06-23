export async function waitUntil(
  predicate: () => Promise<boolean>,
  ms: number,
  timeoutMs = 10000,
) {
  const startTime = Date.now();

  while (!(await predicate())) {
    if (Date.now() - startTime > timeoutMs) {
      throw new Error(`waitUntil timed out after ${timeoutMs}ms`);
    }

    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
