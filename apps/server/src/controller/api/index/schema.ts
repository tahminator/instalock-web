import z from "zod";

export const ApiResponseSchema = z.object({
  author: z.string(),
  version: z.string(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
