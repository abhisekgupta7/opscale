import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

let pool: Pool | null = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
  });
}

export const db = pool ? drizzle(pool) : ({} as any);
