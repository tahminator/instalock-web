import type { paths } from "../../../../../generated";

export type RiotMatchEnriched =
  paths["/api/riot/query/me/match"]["get"]["responses"]["200"]["content"]["application/json"]["payload"][number];

export type PlayerMatch = NonNullable<RiotMatchEnriched["playerData"]>;
