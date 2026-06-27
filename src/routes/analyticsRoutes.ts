import { Router } from "express";
import { getAnalytics } from "../controllers/analyticsController";

const router = Router();

/**
 * @openapi
 * /api/analytics:
 *   get:
 *     summary: Notification Analytics
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Returns analytics information.
 */
router.get(
  "/analytics/delivery-rates",
  getAnalytics
);

router.get(
  "/analytics/channel-performance",
  getAnalytics
);

router.get(
  "/analytics/opt-out-trends",
  getAnalytics
);

export default router;