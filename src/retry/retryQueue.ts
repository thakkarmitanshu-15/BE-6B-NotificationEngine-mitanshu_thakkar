import { redis } from "../config/redis";

export async function scheduleRetry(
  eventId: string,
  delay: number
) {
  const retryAt = Date.now() + delay;

  await redis.zAdd("retry-queue", [
    {
      score: retryAt,
      value: eventId,
    },
  ]);
}