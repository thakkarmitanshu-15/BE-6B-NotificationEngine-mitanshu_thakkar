import { getDLQ } from "./deadLetterQueue";

export function checkDLQDepth() {

  if (
    getDLQ().length > 10
  ) {

    console.log(
      "ALERT: DLQ threshold exceeded"
    );

  }

}