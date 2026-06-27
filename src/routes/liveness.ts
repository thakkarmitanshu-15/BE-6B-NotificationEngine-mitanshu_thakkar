import { Router } from "express";

const router = Router();

router.get("/live", (req, res) => {

  res.json({

    alive: true,

  });

});

export default router;