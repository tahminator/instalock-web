import z from "zod";

export const MatchEnrichLookupRequestParamSchema = z.object({
  matchId: z.string().trim().uuid({
    message: "This match ID is not valid, please try selecting another match.",
  }),
});

export type MatchEnrichLookupRequestParam = z.infer<
  typeof MatchEnrichLookupRequestParamSchema
>;

export const RiotPlayerLookupRequestParamSchema = z.object({
  puuid: z.string().trim().uuid({
    message: "This PUUID is not valid, please try looking for another player.",
  }),
});

export type RiotPlayerLookupRequestParam = z.infer<
  typeof RiotPlayerLookupRequestParamSchema
>;

function successResponseBody<TPayload extends z.ZodTypeAny>(payload: TPayload) {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    payload,
  });
}

export function toIsoDateOrNull(date: Date | null): string | null {
  return date ? date.toISOString() : null;
}

export const RiotPlayerDataSchema = z.object({
  riotTag: z.string().nullable(),
  puuid: z.string(),
  rank: z.number().nullable(),
  rr: z.number().nullable(),
  rankName: z.string().nullable(),
});

export type RiotPlayerDataDto = z.infer<typeof RiotPlayerDataSchema>;

export const PlayerMatchSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  matchId: z.string(),
  riotTag: z.string().nullable(),
  teamId: z.string().nullable(),
  characterId: z.string().nullable(),
  kills: z.number().nullable(),
  deaths: z.number().nullable(),
  assists: z.number().nullable(),
  tier: z.number().nullable(),
  playerCard: z.string().nullable(),
  playerTitle: z.string().nullable(),
  teamColor: z.enum(["Red", "Blue"]).nullable(),
  teamWon: z.boolean().nullable(),
  teamRoundsWon: z.number().nullable(),
});

export const RiotMatchWithoutRawSchema = z.object({
  id: z.string(),
  mapId: z.string().nullable(),
  gameVersion: z.string().nullable(),
  gameStart: z.iso.datetime().nullable(),
  gameEnd: z.iso.datetime().nullable(),
  isCompleted: z.boolean(),
  queueId: z.string().nullable(),
  isRanked: z.boolean().nullable(),
  seasonId: z.string().nullable(),
  roundsPlayed: z.number().nullable(),
  teamWon: z.enum(["Red", "Blue"]).nullable(),
  teamRedRoundsWon: z.number().nullable(),
  teamBlueRoundsWon: z.number().nullable(),
});

export const RiotMatchEnrichedSchema = z.object({
  playerData: PlayerMatchSchema.nullable(),
  matchData: RiotMatchWithoutRawSchema,
  gameModeName: z.string(),
  players: z.array(PlayerMatchSchema).optional(),
});

export type RiotMatchEnrichedDto = z.infer<typeof RiotMatchEnrichedSchema>;

export const GetMyRiotPlayerDataResponseBodySchema =
  successResponseBody(RiotPlayerDataSchema);

export const GetMyRiotMatchesEnrichedResponseBodySchema = successResponseBody(
  z.array(RiotMatchEnrichedSchema),
);

export const GetRiotMatchEnrichedByMatchIdResponseBodySchema =
  successResponseBody(RiotMatchEnrichedSchema);

export const GetRiotPlayerDataByPuuidResponseBodySchema =
  successResponseBody(RiotPlayerDataSchema);
