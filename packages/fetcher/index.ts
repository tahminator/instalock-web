import type { Fetcher, Location } from "./types";

export { ApiURL } from "./ApiURL";

let f: Fetcher | null;
let l: Location | null;

export function init(fetcherImpl: Fetcher, loc: Location): void {
  f = fetcherImpl;
  l = loc;
}

export function fetcher(): Fetcher {
  if (f == null) {
    throw Error(
      "Fetcher is not defined. Please call `init()` in the entry file and define fetchers first.",
    );
  }

  return f;
}

export function location(): Location {
  if (l == null) {
    throw Error(
      "Location is not defined. Please call `init()` in the entry file and define the location first.",
    );
  }

  return l;
}
