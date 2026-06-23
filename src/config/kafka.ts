import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "notification-engine",
  brokers: ["localhost:9092"],
});