import z from "zod";

export const AuthModalSchema = z.object({
  url: z
    .string()
    .trim()
    .refine((string) => string.startsWith("https://playvalorant.com/"), {
      message: "URL must start with https://playvalorant.com/",
    }),
});

export type AuthModalDto = z.infer<typeof AuthModalSchema>;

function successResponseBody<TPayload extends z.ZodTypeAny>(payload: TPayload) {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    payload,
  });
}

/**
 * Validates a real `Date` instance (what the DB layer actually returns) while
 * representing itself as an ISO-8601 string for OpenAPI/JSON Schema purposes.
 * `z.date()` alone cannot be represented in JSON Schema.
 */
const IsoDateTimeSchema = z.codec(z.date(), z.iso.datetime(), {
  decode: (date) => date.toISOString(),
  encode: (iso) => new Date(iso),
});

export const UserSchema = z.object({
  puuid: z.string(),
  riotEntitlement: z.string().nullable(),
  riotAuth: z.string().nullable(),
  riotTag: z.string().nullable(),
  newUser: z.boolean(),
});

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: IsoDateTimeSchema,
  tainted: z.boolean(),
});

export const GetMeResponseBodySchema = successResponseBody(
  z.object({
    user: UserSchema,
    session: SessionSchema,
  }),
);

export const AuthenticateResponseBodySchema = successResponseBody(z.object({}));

export const LogoutResponseBodySchema = successResponseBody(z.object({}));
