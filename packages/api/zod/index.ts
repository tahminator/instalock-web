import { z } from "zod";

export const authModalSchema = z.object({
  url: z
    .string()
    .trim()
    .refine((string) => string.startsWith("https://playvalorant.com/"), {
      message: "URL must start with https://playvalorant.com/",
    }),
});

export const checkIdSchema = z.string().trim().uuid({
  message: "This match ID is not valid, please try selecting another match.",
});

export const checkIdObjSchema = z.object({
  uuid: checkIdSchema,
});

export const queryByRiotNameSchema = z.object({
  query: z
    .string({ message: "You must pass in a query." })
    .trim()
    .min(1, "You must pass in a query.")
    .max(24, "This query is longer than possible according to the Riot API."),
});
