export type NotificationType =
  | "TRANSACTIONAL"
  | "PROMOTIONAL";

export function classifyNotification(
  eventType: string
): NotificationType {

  if (
    eventType.startsWith("TXNX") ||
    eventType.startsWith("RISK") ||
    eventType.startsWith("REGX")
  ) {
    return "TRANSACTIONAL";
  }

  return "PROMOTIONAL";
}