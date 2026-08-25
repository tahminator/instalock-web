import z from "zod";

/**
 * Request-body/query validation schemas shared between the server (runtime
 * validation via `@RequestBody`/`@RequestQuery`) and client (pre-flight form
 * validation via `zodResolver`) so both sides stay in lockstep.
 */

export const AuthModalSchema = z.object({
  url: z
    .string()
    .trim()
    .refine((string) => string.startsWith("https://playvalorant.com/"), {
      message: "URL must start with https://playvalorant.com/",
    }),
});

export type AuthModalDto = z.infer<typeof AuthModalSchema>;

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
