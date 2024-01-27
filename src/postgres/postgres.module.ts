import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./postgres.service";
import { PostgresAsyncOptions, PostgresOptions } from "./types";
import postgres from "postgres";

@Module({})
export class DrizzleModule {
  static forRoot(options: PostgresOptions): DynamicModule {
    const connection = postgres(options.connection);

    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: () => new DrizzleService(options.schema, connection),
      },
      options.isGlobal
    );
  }

  static forAsyncRoot(options: PostgresAsyncOptions): DynamicModule {
    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: async () => {
          const injects = options.inject ? options.inject : [];
          const { schema, connection } = await options.useFactory(...injects);

          return new DrizzleService(schema, postgres(connection));
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
