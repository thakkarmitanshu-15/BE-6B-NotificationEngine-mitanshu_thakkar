const delivered =
  new Set<string>();

export function alreadyDelivered(
  eventId: string
) {

  if (
    delivered.has(eventId)
  ) {
    return true;
  }

  delivered.add(eventId);

  return false;

}