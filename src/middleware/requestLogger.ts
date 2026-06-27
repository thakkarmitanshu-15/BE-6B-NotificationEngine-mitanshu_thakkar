import {
  Request,
  Response,
  NextFunction,
} from "express";

import { logger } from "../logger/logger";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {

  logger.info({

    correlationId:
      req.headers["x-correlation-id"],

    method: req.method,

    url: req.originalUrl,

    timestamp: new Date(),

  });

  next();

}