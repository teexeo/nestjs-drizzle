import { ConnectionOptions, PoolOptions } from "mysql2";

export type Mysql2Options = { schema: Record<string, unknown>; } &
  ({ connection: ConnectionOptions; pool?: never; } | { pool: PoolOptions; connection?: never; });