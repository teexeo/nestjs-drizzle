import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./mysql.service";
import { Mysql2Options } from "./types";

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
    );
  }

  private static createModule(
    provider: {
      provide: typeof DrizzleService;
      useFactory: () => | Promise<DrizzleService<Record<string, never>>> | DrizzleService<Record<string, never>>;
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
