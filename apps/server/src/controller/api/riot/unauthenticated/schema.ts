import z from "zod";

import { RiotMatchEnrichedSchema } from "@/controller/api/riot/query/schema";

export const QueryByRiotNameRequestQuerySchema = z.object({
  query: z
    .string({ message: "You must pass in a query." })
    .trim()
    .min(1, "You must pass in a query.")
    .max(24, "This query is longer than possible according to the Riot API."),
});

export type QueryByRiotNameRequestQuery = z.infer<
  typeof QueryByRiotNameRequestQuerySchema
>;

function successResponseBody<TPayload extends z.ZodTypeAny>(payload: TPayload) {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    payload,
  });
}

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

export const GetRiotPlayerDataDetailedByPuuidResponseBodySchema =
  successResponseBody(RiotPlayerDataDetailedSchema);
