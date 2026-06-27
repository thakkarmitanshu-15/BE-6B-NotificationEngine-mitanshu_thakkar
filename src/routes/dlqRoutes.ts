import { Router } from "express";
import { getDeadLetters } from "../controllers/dlqController";

const router = Router();

/**
 * @openapi
 * /api/dlq:
 *   get:
 *     summary: Dead Letter Queue
 *     tags:
 *       - DLQ
 *     responses:
 *       200:
 *         description: Returns failed notifications.
 */
router.get(
  "/dlq",
  getDeadLetters
);

export default router;