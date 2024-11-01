import 'dotenv/config';
import { Injectable } from "@nestjs/common";
import { drizzle, NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Simplify } from "drizzle-orm";
import type { CreatePgSelectFromBuilderMode, PgInsertValue, PgTable, SelectedFields, } from "drizzle-orm/pg-core";
import { GetSelectTableName } from "drizzle-orm/query-builders/select.types";
import { PostgresOptions } from './types';
import { Pool } from 'pg';

function databaseWithDefault(connectionString?: string) {
  return connectionString || process.env.DATABASE_URL!;
}

@Injectable()
export class DrizzleService<TSchema extends Record<string, unknown> = Record<string, unknown>> {
  public db: NodePgDatabase<TSchema>;

  constructor(options: PostgresOptions) {
    const { schema, connectionString, ...connection } = options;

    if (options?.driver == 'pool') {
      const pool = new Pool({ connectionString: databaseWithDefault(connectionString), });
      this.db = drizzle({ client: pool, schema, connection }) as NodePgDatabase<TSchema> & { $client: Pool; };
      return;
    }

    this.db = drizzle({
      connection: { connectionString: databaseWithDefault(connectionString), ...options },
      schema: options.schema
    }) as NodePgDatabase<TSchema> & { $client: NodePgClient; }
  }

  get<T extends PgTable, TSelect>(from: T, select?: Simplify<T["$inferSelect"]> | TSelect):
    CreatePgSelectFromBuilderMode<"db", GetSelectTableName<T>, TSelect extends SelectedFields ? Simplify<TSelect> : Simplify<T['_']['columns']>, "partial"> {
    return this.db.select(select as SelectedFields).from(from) as any;
  }

  update<T extends PgTable>(table: T, set: Partial<T['$inferSelect']>) {
    return this.db.update(table).set(set);
  }

  insert<T extends PgTable>(table: T, set: PgInsertValue<T> & Partial<T['$inferSelect']>) {
    return this.db.insert(table).values(set);
  }

  delete(table: PgTable) {
    return this.db.delete(table);
  }

  get query() {
    return this.db.query;
  }
}
