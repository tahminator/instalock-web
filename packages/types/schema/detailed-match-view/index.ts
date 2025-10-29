import { z } from "zod";

export const checkIdSchema = z.object({
  uuid: z.string().trim().uuid({
    message: "This match ID is not valid, please try selecting another match.",
  }),
});
