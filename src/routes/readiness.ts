import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /ready:
 *   get:
 *     summary: Readiness Probe
 *     description: Checks whether the application is ready to receive requests.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Application is ready.
 *         content:
 *           application/json:
 *             example:
 *               ready: true
 */
router.get("/ready", (req, res) => {

  res.json({

    ready: true,

  });

});

export default router;