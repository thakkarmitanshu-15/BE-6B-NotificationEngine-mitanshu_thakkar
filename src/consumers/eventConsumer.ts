import { kafka } from "../config/kafka";
import { pool } from "../config/database";

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
    eachMessage: async ({ message }) => {
      const event = JSON.parse(
        message.value?.toString() || "{}"
      );

      console.log("Received:", event);

      await pool.query(
        `
        INSERT INTO events (
          event_id,
          event_type,
          payload
        )
        VALUES ($1,$2,$3)
        `,
        [
          event.eventId,
          event.eventType,
          JSON.stringify(event.payload),
        ]
      );

      console.log("Saved to PostgreSQL");
    },
  });
}