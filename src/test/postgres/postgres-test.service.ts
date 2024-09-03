import { DrizzleService, decrement, increment } from "../../postgres";
import { users } from "./users.schema";

export class PostgresTestService {
  constructor(
    private readonly drizzle: DrizzleService<{ users: typeof users }>
  ) { }

  async main() { }

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
