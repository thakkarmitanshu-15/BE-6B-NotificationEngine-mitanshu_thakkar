import { publishEvent } from "./producers/eventProducer";
import { startConsumer } from "./consumers/eventConsumer";

async function main() {
  await startConsumer();

  setTimeout(async () => {
    await publishEvent({
      eventId: "evt-001",
      eventType: "TXNX-001",
      userId: "user-123",
      timestamp: new Date().toISOString(),
      payload: {
        stock: "TCS",
        quantity: 10,
        price: 3500
      }
    });
  }, 3000);
}

main();