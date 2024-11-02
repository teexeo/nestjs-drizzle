import type { PoolOptions } from "mysql2";

export interface Mysql2Options {
  schema: Record<string, unknown>;
  pool: PoolOptions;
}

export type Mysql2AsyncOptions = {
  isGlobal?: boolean;
  useFactory: (...args: any[]) => Promise<{
    pool: PoolOptions;
    schema: any;
  }>;
  inject?: any[];
};
