import { DeliveryProvider } from "./DeliveryProvider";
import { DeliveryAck } from "./deliveryAck";

export class PushProvider implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck> {

    console.log(`Push Notification sent to ${recipient}`);
    console.log(message);

    return {
      provider: "Push",
      status: "SUCCESS",
      timestamp: new Date(),
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}