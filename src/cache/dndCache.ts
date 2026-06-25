import { redisClient } from "./redisCache";

export async function getCachedDnd(
  phone: string
) {
  const cache = await redisClient.get(
    `dnd:${phone}`
  );

  if (cache) {
    return JSON.parse(cache);
  }

  return null;
}

export async function cacheDnd(
  phone: string,
  value: boolean
) {
  await redisClient.set(
    `dnd:${phone}`,
    JSON.stringify(value),
    {
      EX: 300,
    }
  );
}