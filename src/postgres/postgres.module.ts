import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./postgres.service";
import { PostgresOptions } from "./types";
import postgres from "postgres";

@Module({})
export class DrizzleModule {
  static forRoot(options: PostgresOptions): DynamicModule {
    const connection = postgres(options.connection);

    return {
      module: DrizzleModule,
      providers: [
        {
          provide: DrizzleService,
          useFactory: () => new DrizzleService(options.schema, connection),
        },
      ],
      exports: [DrizzleService],
      global: options?.isGlobal || true,
    };
  }
}
