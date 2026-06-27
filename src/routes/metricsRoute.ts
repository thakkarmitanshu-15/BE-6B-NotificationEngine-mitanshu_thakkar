import { Router } from "express";
import { getMetrics } from "../analytics/metrics";

const router = Router();

/**
 * @openapi
 * /metrics:
 *   get:
 *     summary: Prometheus Metrics
 *     tags:
 *       - Monitoring
 *     responses:
 *       200:
 *         description: Prometheus metrics.
 */
router.get(
  "/metrics",
  (req, res) => {

    res.json(getMetrics());

  }
);

export default router;