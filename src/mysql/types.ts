import type { PoolOptions } from "mysql2";

export interface Mysql2Options {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  pool: PoolOptions;
}

export type Mysql2AsyncOptions = {
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
