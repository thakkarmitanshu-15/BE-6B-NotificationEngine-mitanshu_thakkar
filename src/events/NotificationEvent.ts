export interface NotificationEvent {
  eventId: string;
  eventType: string;
  userId: string;
  timestamp: string;
  payload: Record<string, unknown>;
}