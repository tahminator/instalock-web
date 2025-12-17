import { ResponseEntity } from "@tahminator/sapling";
import z from "zod";

export type UnwrapResponseEntity<T> =
  T extends Promise<ResponseEntity<infer U>> ? U : never;

export type InferSchemaTypes<T> = T extends {
  readonly queryParams: infer Q;
  readonly pathParams: infer P;
  readonly requestBody: infer R;
}
  ? {
      readonly queryParams: z.infer<Q>;
      readonly pathParams: z.infer<P>;
      readonly requestBody: z.infer<R>;
    }
  : never;
