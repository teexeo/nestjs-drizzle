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
  useFactory: (...args: any[]) => Promise<{ connection: string; schema: any }>;
  inject?: any[];
};
