import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").notNull().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  surname: varchar("surname", { length: 255 }),
  age: integer("age"),
  created_at: timestamp("created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
});
