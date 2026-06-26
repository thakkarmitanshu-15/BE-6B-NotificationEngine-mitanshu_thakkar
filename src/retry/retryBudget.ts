const retryCounter =
  new Map<string, number>();

const MAX_RETRIES = 100;

export function consumeRetryBudget(
  eventId: string
): boolean {

  const retries =
    retryCounter.get(eventId) || 0;

  if (retries >= MAX_RETRIES) {
    return false;
  }

  retryCounter.set(
    eventId,
    retries + 1
  );

  return true;

}