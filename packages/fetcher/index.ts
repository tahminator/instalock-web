import { Fetcher } from "./types";

let f: Fetcher | null;

export function init(fetcher: Fetcher): void {
  f = fetcher;
}

export function fetcher(): Fetcher {
  if (f == null) {
    throw Error(
      "Fetcher is not defined. Please call `init()` in the entry file and define fetchers first.",
    );
  }

  return f;
}
