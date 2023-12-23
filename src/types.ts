import { Subquery, SQL } from "drizzle-orm";
import { MySqlTable, SelectedFields } from "drizzle-orm/mysql-core";
import { MySqlViewBase } from "drizzle-orm/mysql-core/view-base";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";
import type { PoolOptions } from "mysql2";

export interface Mysql2Options {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  pool: PoolOptions;
}

export type From = MySqlTable | Subquery | MySqlViewBase | SQL;

export interface GetDrizzleOptions {
  select?: SelectedFields;
  limit?: number;
  offset?: number;
}


export interface UpsertDrizzleOptions {
  set: Record<string, unknown>;
}

export type Simplify<T> = SelectResultFields<T, true>;