import { pool } from "../config/database";
import { redisClient } from "../cache/redisCache";
import { recordPreferenceChange } from "./analyticsService";

export async function getUserPreferences(userId: string) {

  const cache = await redisClient.get(
    `preferences:${userId}`
  );

  if (cache) {
    console.log("Loaded from Redis");
    return JSON.parse(cache);
  }

  const result = await pool.query(
    `
    SELECT *
    FROM user_preferences
    WHERE user_id = $1
    `,
    [userId]
  );

  if (result.rows.length > 0) {
    await redisClient.set(
      `preferences:${userId}`,
      JSON.stringify(result.rows[0]),
      {
        EX: 300,
      }
    );
  }

  if (result.rows.length === 0) {

  const defaultPreference = await pool.query(
    `
    INSERT INTO user_preferences
    (
      user_id,
      email_enabled,
      sms_enabled,
      push_enabled,
      whatsapp_enabled,
      digest_mode,
      language
    )
    VALUES
    (
      $1,
      true,
      true,
      true,
      false,
      false,
      'en'
    )
    RETURNING *;
    `,
    [userId]
  );

  await redisClient.set(
    `preferences:${userId}`,
    JSON.stringify(defaultPreference.rows[0]),
    {
      EX: 300,
    }
  );

  return defaultPreference.rows[0];
}

return result.rows[0];
}

export async function updateUserPreferences(
  userId: string,
  preferences: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    whatsappEnabled: boolean;
    digestMode: boolean;
    language: string;
  }
) {
  const result = await pool.query(
    `
    UPDATE user_preferences
    SET
      email_enabled = $2,
      sms_enabled = $3,
      push_enabled = $4,
      whatsapp_enabled = $5,
      digest_mode = $6,
      language = $7,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *;
    `,
    [
      userId,
      preferences.emailEnabled,
      preferences.smsEnabled,
      preferences.pushEnabled,
      preferences.whatsappEnabled,
      preferences.digestMode,
      preferences.language,
    ]
  );

  const updatedPreference = result.rows[0];

  if (updatedPreference) {
    // Remove old cache
    await redisClient.del(`preferences:${userId}`);

    // Store updated preferences in Redis for 5 minutes
    await redisClient.set(
      `preferences:${userId}`,
      JSON.stringify(updatedPreference),
      {
        EX: 300,
      }
    );
  }

  return updatedPreference;
}


recordPreferenceChange("email");
recordPreferenceChange("sms");
recordPreferenceChange("push");
recordPreferenceChange("whatsapp");