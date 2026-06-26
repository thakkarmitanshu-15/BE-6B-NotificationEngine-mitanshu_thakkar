import { Request, Response } from "express";
import { getMetrics } from "../analytics/metrics";

export function getAnalytics(
  req: Request,
  res: Response
) {

  res.json(
    getMetrics()
  );

}