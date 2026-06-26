import { Request, Response } from "express";
import { getDLQ } from "../dlq/deadLetterQueue";

export function getDeadLetters(
  req: Request,
  res: Response
) {

  res.json(getDLQ());

}