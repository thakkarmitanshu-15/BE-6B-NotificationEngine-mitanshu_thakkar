interface DeadLetter {

  eventId: string;

  reason: string;

  timestamp: Date;

}

const dlq: DeadLetter[] = [];

export function moveToDLQ(
  eventId: string,
  reason: string
) {

  dlq.push({
    eventId,
    reason,
    timestamp: new Date(),
  });

}

export function getDLQ() {

  return dlq;

}