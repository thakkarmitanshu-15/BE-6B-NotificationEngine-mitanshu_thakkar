export interface RoutingResult {
  channels: string[];
}

export function routeEvent(eventType: string): RoutingResult {
  const routingTable: Record<string, string[]> = {
    "TXNX-001": ["email", "push"],
    "TXNX-002": ["email", "push"],
    "RISK-001": ["sms", "email", "push"],
    "RISK-002": ["sms", "email", "push"],
    "MKTX-001": ["push"],
    "REGX-001": ["email"]
  };

  return {
    channels: routingTable[eventType] || ["email"]
  };
}