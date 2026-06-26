import express from "express";
import { publishEvent } from "./producers/eventProducer";
import { startConsumer } from "./consumers/eventConsumer";
import preferenceRoutes from "./routes/preferenceRoutes";
import { connectRedis } from "./cache/redisCache";
import { checkProviders } from "./health/providerHealth";
import dlqRoutes from "./routes/dlqRoutes";

const app = express();

app.use(express.json());
app.use(preferenceRoutes);
app.use("/api", dlqRoutes);

async function main() {

await connectRedis();
// Start Kafka consumer
await startConsumer();

await checkProviders();

// Start Express server
app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});

// Publish a sample event after 3 seconds
setTimeout(async () => {
await publishEvent({
eventId: "evt-002",
eventType: "TXNX-001",
userId: "user-123",
timestamp: new Date().toISOString(),
payload: {
stock: "TCS",
quantity: 10,
price: 3500,
},
});
}, 3000);
}

main().catch((err) => {
console.error("Application failed to start:", err);
});
