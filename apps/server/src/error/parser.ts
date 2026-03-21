import { HttpStatus, ResponseStatusError } from "@tahminator/sapling";
import { z } from "zod";

export class ZodParserError extends ResponseStatusError {
  constructor(zodError: z.ZodError) {
    super(HttpStatus.BAD_REQUEST, z.prettifyError(zodError));
  }
}
