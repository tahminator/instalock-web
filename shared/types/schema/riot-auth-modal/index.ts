import { z } from "zod";

export const authModalSchema = z.object({
  url: z
    .string()
    .trim()
    .refine((string) => string.startsWith("https://playvalorant.com/"), {
      message: "URL must start with https://playvalorant.com/",
    }),
});

export const localAuthSchema = z.object({
  entitlementToken: z
    .string()
    .trim()
    .startsWith(
      "eyJraWQiOiJrMSIsImFsZyI6IlJTMjU2In0.eyJlbnRpdGxlbWVudHMiOltdLCJhdF9oYXNoIjoi",
    ),
  authToken: z
    .string()
    .trim()
    .startsWith(
      "eyJraWQiOiJyc28tcHJvZC0yMDI0LTExIiwiYWxnIjoiUlMyNTYifQ.eyJwcCI6eyJjIjoi",
    ),
});
