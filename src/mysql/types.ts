import type { PoolOptions } from "mysql2";

export interface Mysql2Options {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  pool: PoolOptions;
}