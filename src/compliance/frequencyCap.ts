import { redisClient } from "../cache/redisCache";

const LIMIT = 5;
const WINDOW = 3600; // 1 hour

export async function canSendNotification(
  userId: string
): Promise<boolean> {
  const key = `frequency:${userId}`;

  const count = await redisClient.incr(key);

  if (count === 1) {
    await redisClient.expire(key, WINDOW);
  }

  return count <= LIMIT;
}