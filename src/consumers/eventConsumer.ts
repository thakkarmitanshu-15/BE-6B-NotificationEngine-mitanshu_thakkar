import { kafka } from "../config/kafka";
import { pool } from "../config/database";
import { enrichEvent } from "../enrichment/eventEnrichment";
import { routeEvent } from "../routing/notificationRouter";
import { isDuplicate } from "../deduplication/redisDeduplicator";

const consumer = kafka.consumer({
  groupId: "notification-group",
});

export async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "financial-events",
    fromBeginning: true,
  });

  await consumer.run({
autoCommit: false,
eachMessage: async ({
topic,
partition,
message,
}) => {
const event = JSON.parse(
message.value?.toString() || "{}"
);


const duplicate = await isDuplicate(
  event.eventId
);

if (duplicate) {
  console.log("Duplicate event ignored");

  await consumer.commitOffsets([
    {
      topic,
      partition,
      offset: (
        Number(message.offset) + 1
      ).toString(),
    },
  ]);

  return;
}

const enrichedEvent =
  await enrichEvent(event);

const routing =
  routeEvent(event.eventType);

console.log(
  "Channels:",
  routing.channels
);

await pool.query(
  `
  INSERT INTO events(
    event_id,
    event_type,
    payload
  )
  VALUES($1,$2,$3)
  `,
  [
    event.eventId,
    event.eventType,
    JSON.stringify(enrichedEvent),
  ]
);

console.log("Saved to PostgreSQL");

await consumer.commitOffsets([
  {
    topic,
    partition,
    offset: (
      Number(message.offset) + 1
    ).toString(),
  },
]);

console.log(
  `Offset committed: ${message.offset}`
);


},
});

}