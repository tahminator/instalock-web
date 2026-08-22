import z from "zod";

import { successResponseBody } from "@/lib/api";

export {
  AuthModalSchema,
  type AuthModalDto,
} from "@instalock/fetcher/validation";

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
