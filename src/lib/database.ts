import { Pool } from "pg";

declare global { var synnexPool: Pool | undefined; }

export const database = global.synnexPool ?? new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") global.synnexPool = database;
