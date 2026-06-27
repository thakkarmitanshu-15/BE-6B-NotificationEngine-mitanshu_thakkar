import {
  Request,
  Response,
  NextFunction,
} from "express";

import { logger } from "../logger/logger";

export function errorHandler(

  err: any,

  req: Request,

  res: Response,

  next: NextFunction

) {

  logger.error({

    message: err.message,

    correlationId:
      req.headers["x-correlation-id"],

  });

  res.status(500).json({

    success: false,

    error: err.message,

  });

}