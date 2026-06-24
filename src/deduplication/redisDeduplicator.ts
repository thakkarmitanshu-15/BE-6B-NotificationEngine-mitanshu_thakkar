import { createClient } from "redis";

const redis = createClient();

export async function isDuplicate(
  eventId: string
): Promise<boolean> {
  await redis.connect();

  const exists = await redis.get(eventId);

  if (exists) {
    return true;
  }

  await redis.set(eventId, "processed", {
    EX: 300
  });

  return false;
}