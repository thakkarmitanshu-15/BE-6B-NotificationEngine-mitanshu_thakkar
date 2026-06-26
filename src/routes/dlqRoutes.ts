import { Router } from "express";
import { getDeadLetters } from "../controllers/dlqController";

const router = Router();

router.get(
  "/dlq",
  getDeadLetters
);

export default router;