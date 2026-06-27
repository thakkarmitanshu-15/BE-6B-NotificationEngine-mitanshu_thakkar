import { Router } from "express";

import {
  getPreferences,
  updatePreferences,
} from "../controllers/preferenceController";

const router = Router();

/**
 * @openapi
 * /preferences/{userId}:
 *   get:
 *     summary: Get User Preferences
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User preferences returned successfully.
 */
router.get(
  "/users/:id/preferences",
  getPreferences
);

/**
 * @openapi
 * /preferences/{userId}:
 *   put:
 *     summary: Update User Preferences
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             emailEnabled: true
 *             smsEnabled: false
 *             pushEnabled: true
 *     responses:
 *       200:
 *         description: Preferences updated successfully.
 */
router.put(
  "/users/:id/preferences",
  updatePreferences
);

export default router;