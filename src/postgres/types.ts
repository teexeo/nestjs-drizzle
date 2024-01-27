import type { DrizzleService } from "./postgres.service";

export interface PostgresOptions {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  connection: string;
}

export type PostgresAsyncOptions = {
  isGlobal?: boolean;
  /**
   *
   * ```ts
   * {
   *   async useFactory(configService: ConfigService) {
   *    return registerAsync(schema, configService.get('DATABASE_URL'))
   *   }
   * }
   * ```
   * @param args any argument
   * @returns DrizzleService
   */
  useFactory: (...args: any[]) => Promise<any>;
};
