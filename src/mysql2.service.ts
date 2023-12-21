import { Injectable } from '@nestjs/common';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import { GetDrizzleOptions, Mysql2Options, UpsertDrizzleOptions } from './types';

@Injectable()
export class DrizzleService<TSchema extends Record<string, unknown> = Record<string, never>> {
  private db: MySql2Database<TSchema>;

  constructor(
    schema: Mysql2Options['schema'],
    connection: any,
  ) {
    this.db = drizzle(connection, {
      mode: 'default',
      schema,
    }) as MySql2Database<TSchema>;
  }

  query() {
    return this.db.query;
  }

  get(props: GetDrizzleOptions) {
    return this.db.select(props.select).from(props.from);
  }

  update(props: UpsertDrizzleOptions) {
    return this.db.update(props.table).set(props.set)
  }

  insert(props: UpsertDrizzleOptions) {
    return this.db.insert(props.table).values(props.set);
  }

  delete(props: Pick<UpsertDrizzleOptions, 'table'>) {
    return this.db.delete(props.table);
  }
}