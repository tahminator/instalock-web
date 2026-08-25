import z from "zod";

import { successResponseBody } from "@/lib/api";

import { RiotMatchEnrichedSchema } from "../query/schema";

export {
  QueryByRiotNameRequestQuerySchema,
  type QueryByRiotNameRequestQuery,
} from "@instalock/fetcher/validation";

export const GetMetricsResponseBodySchema = successResponseBody(
  z.object({
    totalUsers: z.number(),
    registeredUsers: z.number(),
    totalMatches: z.number(),
  }),
);

export const RiotPlayerDataShallowSchema = z.object({
  puuid: z.string(),
  riotTag: z.string().nullable(),
});

export type RiotPlayerDataShallowDto = z.infer<
  typeof RiotPlayerDataShallowSchema
>;

export const GetUsersShallowResponseBodySchema = successResponseBody(
  z.array(RiotPlayerDataShallowSchema),
);

export const RiotPlayerDataDetailedSchema = z.object({
  riotTag: z.string().nullable(),
  puuid: z.string(),
  name: z.string().nullable(),
  rank: z.number().nullable(),
  rankName: z.string().nullable(),
  matches: z.array(RiotMatchEnrichedSchema),
});

export type RiotPlayerDataDetailedDto = z.infer<
  typeof RiotPlayerDataDetailedSchema
>;

export const GetRiotPlayerDataDetailedByPuuidResponseBodySchema =
  successResponseBody(RiotPlayerDataDetailedSchema);
