import { Injectable } from "@nestjs/common";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { Mysql2Options } from "./types";
import {
  CreateMySqlSelectFromBuilderMode,
  MySqlTable,
  SelectedFields,
} from "drizzle-orm/mysql-core";
import { getTableColumns, Simplify } from "drizzle-orm";
import { GetSelectTableName } from "drizzle-orm/query-builders/select.types";

@Injectable()
export class DrizzleService<
  TSchema extends Record<string, unknown> = Record<string, never>
> {
  public db: MySql2Database<TSchema>;

  constructor(schema: Mysql2Options["schema"], connection: any) {
    this.db = drizzle(connection, {
      mode: "default",
      schema,
    }) as MySql2Database<TSchema>;
  }

  get<
    T extends MySqlTable,
    TSelect extends SelectedFields,
    U extends "select" | "without" = "select"
  >(
    from: T,
    select: U extends "select"
      ? Simplify<T["$inferSelect"]> | TSelect | undefined
      : keyof Simplify<T["$inferSelect"]>[],
    type: "select" | "without" = "select"
  ): CreateMySqlSelectFromBuilderMode<
    "db",
    GetSelectTableName<T>,
    Simplify<TSelect>,
    "partial",
    any
  > {
    if (type === "without") {
      const columns = getTableColumns(from);
      const keysOfSelect = Object.keys(select);
      const FilteredSelect = Object.keys(columns)
        .filter((x) => !keysOfSelect.includes(x))
        .reduce((acc, key) => {
          acc[key] = columns[key];
          return acc;
        }, {}) as SelectedFields;

      return this.db.select(FilteredSelect).from(from) as any;
    }
    return this.db.select(select as SelectedFields).from(from) as any;
  }

  update<T extends MySqlTable>(table: T, set: Partial<T["$inferInsert"]>) {
    return this.db.update(table).set(set);
  }

  insert<T extends MySqlTable>(table: T, set: T["$inferInsert"]) {
    return this.db.insert(table).values(set);
  }

  delete(table: MySqlTable) {
    return this.db.delete(table);
  }

  query<TKey extends keyof typeof this.db.query>(
    query: TKey
  ): (typeof this.db.query)[TKey] {
    return this.db.query[query];
  }
}
