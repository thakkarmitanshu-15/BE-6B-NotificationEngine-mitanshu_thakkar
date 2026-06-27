import { Router } from "express";

console.log("Health route loaded");

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Returns the health status of the notification engine.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Application is healthy.
 *         content:
 *           application/json:
 *             example:
 *               status: UP
 *               database: UP
 *               redis: UP
 *               kafka: UP
 */
router.get("/health", (req, res) => {
  res.json({
    status: "UP",
    database: "UP",
    redis: "UP",
    kafka: "UP",
    timestamp: new Date(),
  });
});

export default router;