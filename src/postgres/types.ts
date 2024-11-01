import { Pool, PoolConfig } from "pg";

export interface BasePostgresOptions extends PoolConfig {
  schema: Record<string, unknown>;
}

export interface PostgresOptionsWithPool extends BasePostgresOptions {
  driver: "pool";
  connectionString: string; // Required when driver is "pool"
}

export interface PostgresOptionsWithPg extends BasePostgresOptions {
  driver?: "pg";
  connectionString?: string; // Optional when driver is "pg" or undefined
}

export type PostgresOptions = PostgresOptionsWithPool | PostgresOptionsWithPg;