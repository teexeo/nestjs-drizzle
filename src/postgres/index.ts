import { AnyColumn, sql } from "drizzle-orm";

export * from "./postgres.module";
export * from "./postgres.service";

export function increment(column: AnyColumn, value: number = 1): number {
  return sql<number>`${column} + ${value}` as unknown as number;
}

export function decrement(column: AnyColumn, value: number = 1): number {
  return sql<number>`${column} - ${value}` as unknown as number;
}
