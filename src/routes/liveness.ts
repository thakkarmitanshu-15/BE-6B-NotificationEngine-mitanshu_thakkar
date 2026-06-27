import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /live:
 *   get:
 *     summary: Liveness Probe
 *     description: Checks whether the application process is alive.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Application is alive.
 *         content:
 *           application/json:
 *             example:
 *               alive: true
 */
router.get("/live", (req, res) => {

  res.json({

    alive: true,

  });

});

export default router;