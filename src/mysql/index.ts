import { PoolOptions } from "mysql2";
import { DrizzleService } from "./mysql.service";

export * from "./mysql.module";
export * from "./mysql.service";

export function registerAsync(schema: any, pool: PoolOptions) {
  const mysql = require("mysql2/promise");
  const connection = mysql.createPool(pool);

  return new DrizzleService(schema, connection);
}
