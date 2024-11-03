import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./mysql.service";
import { Mysql2Options } from "./types";
import "dotenv/config";
import { Connection, Pool } from "mysql2";
import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";

@Module({})
export class DrizzleModule {
  static forRoot(options: Mysql2Options): DynamicModule {
    let client: Connection | Pool;

    if (options.connection) client = mysql.createConnection(options.connection)
    else client = mysql.createPool(options.pool);

    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: () => new DrizzleService(drizzle(client, options.schema)),
      },
    );
  }

  private static createModule(
    provider: {
      provide: typeof DrizzleService;
      useFactory: () => DrizzleService<Record<string, never>>;
    },
  ) {
    return {
      module: DrizzleModule,
      providers: [provider],
      exports: [DrizzleService],
      global: true,
    };
  }
}
