## Nest.js Drizzle

### Todo List

- [x] mysql2
- [x] node-postgres
- [x] supabase
- [ ] sqlite
- [ ] planetscale
- [ ] neon
- [ ] vercel postgres
- [ ] turso

```bash
npm install nestjs-drizzle
```

### For schema
```ts
// drizzle/schemas/users.ts
import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').unique().primaryKey().defaultRandom(),

  username: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),

  // more schema
});

// drizzle/schema.ts
export * from './schemas/users.ts'
```

### app.module.ts

```ts
import { DrizzleModule } from 'nestjs-drizzle/mysql';

@Module({
  imports: [
    // in default DrizzleModule gets url from .env DATABASE_URL
    DrizzleModule.forRoot(),
    // or
    DrizzleModule.forRoot({ connectionString: process.env.DATABASE_URL })
  ]
})
```

> I recomend to use `global.d.ts` file for env type safety.

```ts
// For quering data
declare type ISchema = typeof import('your/path/schema');

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    DATABASE_URL: string;
    // add more environment variables and their types here
  }
}
```

### any.service.ts

```ts
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "nestjs-drizzle/mysql";
import { users } from "./drizzle";
import { isNull } from "drizzle-orm";

@Injectable()
export class AppService {
  constructor(private readonly drizzle: DrizzleService<ISchema>) {}

  async getManyUsers() {
    const users = await this.drizzle.get(users, {
      id: users.id,
      username: users.username,
    });

    return users;
  }

  async getOneUser(id: string) {
    const [user] = await this.drizzle
      .get(users, {
        id: users.id,
        username: users.username,
      })
      .where(eq(users.id, id));

    return user;
  }
}
```

### All function in nestjs-drizzle

```ts
// main drizzle db
this.drizzle.db;
// insertion
this.drizzle.insert(users, values);
this.drizzle.insert(users, values).$dynamic;
// update
this.drizzle.update(users, values).where(eq(users.id, 10));
// Increment | Decrement
this.drizzle.update(users, { age: increment(users.age, 20) }).where(eq(users.id, 10));
// Delete
this.drizzle.delete(users).where(eq(users.id, 10));
// Query
this.drizzle.query.users.findFirst();
this.drizzle.query.users.findMany();
// Get
this.drizzle.get(users);
this.drizzle.get(users, { id: users.id, username: users.username })
// or without function
this.drizzle.getWithout(users, { password: true })
```

### Using query

```ts
import { DrizzleService } from "nestjs-drizzle/postgres";
import * as schema from '/your/path/schema';

@Injectable()
export class AppService {
  constructor(
    private readonly drizzle: DrizzleService<ISchema> // <- put here <ISchema>
    // or
    private readonly drizzle: DrizzleService<typeof schema> // <- or put here <typeof schema>
  ) {}

  getUsers() {
    this.drizzle.query.users.findMany({
      columns: {
        id: true,
        name: true,
      },
      limit: 10,
    });
  }
}
```