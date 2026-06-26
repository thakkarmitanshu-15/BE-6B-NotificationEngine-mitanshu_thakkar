import { DeliveryProvider } from "./DeliveryProvider";
import { DeliveryAck } from "./deliveryAck";

export class SMSProvider implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck> {

    console.log(`SMS sent to ${recipient}`);
    console.log(message);

    return {
      provider: "SMS",
      status: "SUCCESS",
      timestamp: new Date(),
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}