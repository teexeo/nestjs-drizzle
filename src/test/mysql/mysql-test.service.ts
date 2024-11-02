import { DrizzleService } from "../../mysql";
import { users } from "./users.schema";

export class MysqlTestService {
  constructor(
    private readonly drizzle: DrizzleService<{ users: typeof users }>
  ) { }

  async main() {
    const data = await this.drizzle
      .getWithout(users, { id: true });

    return data;
  }
}
