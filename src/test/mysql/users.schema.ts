import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: int('id', { unsigned: true }).notNull().autoincrement(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  surname: varchar('surname', { length: 255 }),
  age: int('age', { unsigned: true }),
  created_at: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});