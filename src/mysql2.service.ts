import { Injectable } from '@nestjs/common';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import { From, GetDrizzleOptions, Mysql2Options } from './types';
import { MySqlTable } from 'drizzle-orm/mysql-core';

@Injectable()
export class DrizzleService<TSchema extends Record<string, unknown> = Record<string, never>> {
  public db: MySql2Database<TSchema>;

  constructor(
    schema: Mysql2Options['schema'],
    connection: any,
  ) {
    this.db = drizzle(connection, {
      mode: 'default',
      schema,
    }) as MySql2Database<TSchema>;
  }

  get(from: From, props?: GetDrizzleOptions) {
    return this.db
      .select(props?.select)
      .from(from)
      .limit(props?.limit)
      .offset(props?.offset);
  }

  update<T extends MySqlTable>(table: T, set: T['_']['inferInsert']) {
    return this.db.update(table).set(set)
  }

  insert<T extends MySqlTable>(table: T, set: T['_']['inferInsert']) {
    return this.db.insert(table).values(set);
  }

  delete(table: MySqlTable) {
    return this.db.delete(table);
  }
}