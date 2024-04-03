import { sql } from "drizzle-orm";
import { DrizzleService, decrement, increment } from "../../postgres";
import { users } from "./users.schema";

export class PostgresTestService {
  constructor(
    private readonly drizzle: DrizzleService<{ users: typeof users }>
  ) { }

  async main() {
    const other = await this.drizzle.query("users").findFirst({
      columns: {
        id: true,
        name: true,
      },
    });

    const data = await this.drizzle
      .get(users, {
        id: users.id,
        name: users.name,
        age: users.age,
        full_name: sql<string>`concat(${users.name}, ' ', ${users.age})`,
      })
      .limit(10);

    return [data, other];
  }

  // test increment / decrement
  async Increment_Decrement() {
    const [incResult] = await this.drizzle.update(users, {
      age: increment(users.age)
    })
    .returning({ age: users.age });

    const [decResult] = await this.drizzle.update(users, {
      age: decrement(users.age)
    })
    .returning({ age: users.age });
  }
}
