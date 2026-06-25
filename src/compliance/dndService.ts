import { pool } from "../config/database";

export async function isDndEnabled(
  phone: string
) {
  const result = await pool.query(
    `
    SELECT dnd_enabled
    FROM dnd_registry
    WHERE phone_number=$1
    `,
    [phone]
  );

  if (result.rows.length === 0) {
    return false;
  }

  return result.rows[0].dnd_enabled;
}