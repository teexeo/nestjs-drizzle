## Nest.js Drizzle

### Todo List

- [x] mysql2
- [x] postgresjs
- [ ] node-postgres
- [ ] supabase
- [ ] sqlite
- [ ] planetscale
- [ ] neon
- [ ] vercel postgres
- [ ] turso

```bash
npm install nestjs-drizzle
```

### app.module.ts

```ts
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'nestjs-drizzle/mysql';
// import { DrizzleModule } from 'nestjs-drizzle/postgres'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule.forRoot({
      isGlobal: true,
      schema,
      pool: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      }
    }),
  ]
})
```

> I recomend to use `environment.d.ts` file for env type safety.

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    DATABASE: string;
    USER: string;
    PASSWORD: string;
    PORT: number;
    HOST: string;
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
  constructor(private readonly drizzle: DrizzleService) {}

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

### Other helper functions

```ts
// values is basicly set
this.drizzle.insert(users, values);

this.drizzle.update(users, values).where(eq(users.id, 10));

this.drizzle.delete(users).where(eq(users.id, 10));

this.drizzle.query("users").findFirst();
```

### if you need to other features

```ts
this.drizzle.db; // main db

this.drizzle.delete(users).where(eq(users.id, 10)).prepare();

this.drizzle.insert(users, values).$dynamic;
```

### Using query

```ts
// first make DrizzleService to type safe
import * as schema from "SCHEMA_PATH";
import { DrizzleService } from "nestjs-drizzle/mysql";

@Injectable()
export class AppService {
  constructor(
    private readonly drizzle: DrizzleService<typeof schema> // <- put here <typeof schema>
  ) {}

  getUsers() {
    this.drizzle.query("users").findMany({
      columns: {
        id: true,
        name: true,
      },
      limit: 10,
    });
  }
}
```

### Bugs showcase

> npm ERR! Found: reflect-metadata@0.2.1

in package.json `reflect-metadata` change version to `^0.1.14`
