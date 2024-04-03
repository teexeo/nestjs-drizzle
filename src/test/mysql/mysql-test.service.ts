import { sql } from "drizzle-orm";
import { DrizzleService } from "../../mysql";
import { users } from "./users.schema";

export class MysqlTestService {
  constructor(
    private readonly drizzle: DrizzleService<{ users: typeof users }>
  ) {}

  async main() {
    const data = await this.drizzle
      .get(
        users,
        {
          id: users.id,
          name: users.name,
          age: users.age,
          full_name: sql<string>`concat(${users.name}, ' ', ${users.age})`,
        },
        "without"
      )
      .limit(10);

    return data;
  }
}
