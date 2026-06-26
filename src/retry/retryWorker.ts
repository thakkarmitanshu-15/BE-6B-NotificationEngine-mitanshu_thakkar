import { redis } from "../config/redis";

export async function processRetries() {

  const now = Date.now();

  const events = await redis.zRangeByScore(
    "retry-queue",
    0,
    now
  );

  for (const eventId of events) {

    console.log(
      `Retrying ${eventId}`
    );

    await redis.zRem(
      "retry-queue",
      eventId
    );


  }

}