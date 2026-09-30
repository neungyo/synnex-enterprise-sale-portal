declare module "pg" {
  export interface PoolConfig {
    connectionString?: string;
  }

  export interface QueryResult<Row = unknown> {
    rows: Row[];
  }

  export class Pool {
    constructor(config?: PoolConfig);
    query<Row = unknown>(text: string, values?: unknown[]): Promise<QueryResult<Row>>;
  }
}
