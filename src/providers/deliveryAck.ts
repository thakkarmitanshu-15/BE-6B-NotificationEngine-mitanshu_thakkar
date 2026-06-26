export interface DeliveryAck {
  provider: string;
  status: "SUCCESS" | "FAILED";
  timestamp: Date;
}