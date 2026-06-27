import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function correlationId(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const id = uuid();

  req.headers["x-correlation-id"] = id;

  res.setHeader(
    "x-correlation-id",
    id
  );

  next();

}