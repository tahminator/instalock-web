import type postgres from "postgres";

export type Db = postgres.Sql;

export * from "./models";
export * from "./repository";
