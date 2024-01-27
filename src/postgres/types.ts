export interface PostgresOptions {
  /**
   * @default true
   */
  isGlobal?: boolean;
  schema: Record<string, unknown>;
  connection: string;
}