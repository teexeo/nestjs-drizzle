import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./mysql.service";
import { Mysql2AsyncOptions, Mysql2Options } from "./types";

@Module({})
export class DrizzleModule {
  static forRoot(options: Mysql2Options): DynamicModule {
    const mysql = require("mysql2/promise");
    const connection = mysql.createPool(options.pool);

    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: () => new DrizzleService(options.schema, connection),
      },
      options.isGlobal
    );
  }

  static forAsyncRoot(options: Mysql2AsyncOptions): DynamicModule {
    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: async () => {
          const { pool, schema } = await options.useFactory(options.inject || []);
          const mysql = require("mysql2/promise");
          const connection = mysql.createPool(pool);

          return new DrizzleService(schema, connection);
        },
      },
      options.isGlobal
    );
  }

  private static createModule(
    provider: {
      provide: typeof DrizzleService;
      useFactory: () =>
        | Promise<DrizzleService<Record<string, never>>>
        | DrizzleService<Record<string, never>>;
    },
    isGlobal: boolean = true
  ) {
    return {
      module: DrizzleModule,
      providers: [provider],
      exports: [DrizzleService],
      global: isGlobal,
    };
  }
}
