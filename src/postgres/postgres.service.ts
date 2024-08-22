import { Injectable } from "@nestjs/common";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { PostgresOptions } from "./types";
import { Simplify } from "drizzle-orm";
import type {
  CreatePgSelectFromBuilderMode,
  PgTable,
  SelectedFields,
} from "drizzle-orm/pg-core";
import { GetSelectTableName } from "drizzle-orm/query-builders/select.types";
import { Sql } from "postgres";

@Injectable()
export class DrizzleService<
  TSchema extends Record<string, unknown> = Record<string, never>
> {
  public db: PostgresJsDatabase<TSchema>;

  constructor(schema: PostgresOptions["schema"], connection: Sql) {
    this.db = drizzle(connection, { schema }) as PostgresJsDatabase<TSchema>;
  }

  get<T extends PgTable, TSelect extends SelectedFields>(
    from: T,
    select: Simplify<T["$inferSelect"]> | TSelect | undefined = undefined
  ): CreatePgSelectFromBuilderMode<
    "db",
    GetSelectTableName<T>,
    Simplify<TSelect>,
    "partial"
  > {
    return this.db.select(select as SelectedFields).from(from) as any;
  }

  update<T extends PgTable>(table: T, set: Partial<T["$inferInsert"]>) {
    return this.db.update(table).set(set);
  }

  insert<T extends PgTable>(table: T, set: T['$inferSelect']) {
    return this.db.insert(table).values(set);
  }

  delete(table: PgTable) {
    return this.db.delete(table);
  }

  query<TKey extends keyof typeof this.db.query>(
    query: TKey
  ): (typeof this.db.query)[TKey] {
    return this.db.query[query];
  }
}
