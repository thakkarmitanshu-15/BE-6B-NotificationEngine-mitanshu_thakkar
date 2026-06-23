import { kafka } from "../config/kafka";

const producer = kafka.producer();

export async function publishEvent(event: unknown) {
  await producer.connect();

  await producer.send({
    topic: "financial-events",
    messages: [
      {
        value: JSON.stringify(event),
      },
    ],
  });

  console.log("Event Published");
}