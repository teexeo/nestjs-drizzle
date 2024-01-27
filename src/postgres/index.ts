import postgres from "postgres";
import { DrizzleService } from "./postgres.service";

export * from "./postgres.module";
export * from "./postgres.service";

export function registerAsync(schema: any, connection: string) {
  return new DrizzleService(schema, postgres(connection));
}
