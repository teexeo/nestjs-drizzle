import { Subquery, SQL } from "drizzle-orm";
import { MySqlTable, SelectedFields } from "drizzle-orm/mysql-core";
import { MySqlViewBase } from "drizzle-orm/mysql-core/view-base";
import type { PoolOptions } from "mysql2";

export interface Mysql2Options {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  pool: PoolOptions;
}

type From = MySqlTable | Subquery | MySqlViewBase | SQL;

export interface GetDrizzleOptions {
  select?: SelectedFields;
  from: From;
}

export interface UpsertDrizzleOptions {
  table: MySqlTable;
  set: Record<string, unknown>;
}