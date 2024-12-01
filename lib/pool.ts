import { createClient, createPool } from "@vercel/postgres";

// const pool = createPool({
//   connectionString: process.env.POSTGRES_URL,
// });
const client = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export const sql = client.sql;