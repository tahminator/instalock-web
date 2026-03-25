// @typescript-eslint/no-unsafe-function-type
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type F = Function;

export type Type = "s" | "ns";

export type Method = {
  name: string | symbol;
  type: Type;
};
