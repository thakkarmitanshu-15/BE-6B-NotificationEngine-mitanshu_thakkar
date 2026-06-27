import { Router } from "express";

console.log("Health route loaded");

const router = Router();

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