import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "notification_engine",
  user: "postgres",
  password: "postgres123"
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.error(err));