import { logger } from "../logger/logger";

export function criticalAlert(
  message: string
) {

  logger.error({

    alert: true,

    message,

  });

}