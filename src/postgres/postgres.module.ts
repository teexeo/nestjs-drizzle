import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./postgres.service";
import { PostgresOptions } from "./types";

@Module({})
export class DrizzleModule {
  static forRoot(options: PostgresOptions): DynamicModule {
    return this.createModule(
      {
        provide: DrizzleService,
        useFactory: () => new DrizzleService(options),
      }
    );
  }

  private static createModule(
    provider: {
      provide: typeof DrizzleService;
      useFactory: () => Promise<DrizzleService> | DrizzleService;
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
