import express from "express";
import { publishEvent } from "./producers/eventProducer";
import { startConsumer } from "./consumers/eventConsumer";
import preferenceRoutes from "./routes/preferenceRoutes";
import { connectRedis } from "./cache/redisCache";
import { checkProviders } from "./health/providerHealth";
import dlqRoutes from "./routes/dlqRoutes";
import metricsRoute from "./routes/metricsRoute";
import analyticsRoutes from "./routes/analyticsRoutes";
import { logger } from "./logger/logger";
import { correlationId } from "./middleware/correlationId";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import healthRoute from "./routes/healthRoute";
import readiness from "./routes/readiness";
import liveness from "./routes/liveness";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();


app.use(healthRoute)
app.use(correlationId);
app.use(requestLogger);
app.use(express.json());
app.use(preferenceRoutes);
app.use("/api", dlqRoutes);
app.use(metricsRoute);
app.use("/api", analyticsRoutes);
app.use(readiness);
app.use(liveness);
app.use(errorHandler);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

async function main() {

await connectRedis();
// Start Kafka consumer
await startConsumer();

await checkProviders();

// Start Express server
app.listen(3000, () => {
logger.info(
  "Server running on http://localhost:3000"
);});

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

process.on("SIGINT", async () => {

  logger.info(
    "Gracefully shutting down..."
  );

  process.exit(0);

});

process.on("SIGTERM", async () => {

  logger.info(
    "Gracefully shutting down..."
  );

  process.exit(0);

});
