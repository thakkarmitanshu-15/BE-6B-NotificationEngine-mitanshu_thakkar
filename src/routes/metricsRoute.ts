import { Router } from "express";
import { getMetrics } from "../analytics/metrics";

const router = Router();

router.get(
  "/metrics",
  (req, res) => {

    res.json(getMetrics());

  }
);

export default router;