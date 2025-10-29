import { z } from "zod";

export const queryByRiotNameSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "You must pass in a query.")
    .max(24, "This query is longer than possible according to the Riot API."),
});

export const clientQueryByRiotNameSchema = z.intersection(
  queryByRiotNameSchema,
  z.object({
    fetchStatus: z
      .string()
      .trim()
      .refine((str): boolean => str === "success"),
  }),
);
