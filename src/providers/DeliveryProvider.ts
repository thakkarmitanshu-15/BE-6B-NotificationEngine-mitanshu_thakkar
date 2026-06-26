import { DeliveryAck } from "./deliveryAck";

export interface DeliveryProvider {
  send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck>;

  healthCheck(): Promise<boolean>;
}