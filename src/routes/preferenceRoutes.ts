import { Router } from "express";

import {
  getPreferences,
  updatePreferences,
} from "../controllers/preferenceController";

const router = Router();

router.get(
  "/users/:id/preferences",
  getPreferences
);

router.put(
  "/users/:id/preferences",
  updatePreferences
);

export default router;