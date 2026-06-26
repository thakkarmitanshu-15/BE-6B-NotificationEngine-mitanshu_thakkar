import { Router } from "express";
import { getAnalytics } from "../controllers/analyticsController";

const router = Router();

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