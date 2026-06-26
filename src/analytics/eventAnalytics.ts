import { pool } from "../config/database";

export async function getDeliveryCount() {

  const result =
    await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM notification_state_log
      `
    );

  return result.rows[0];

}