import { DeliveryProvider } from "./DeliveryProvider";
import { DeliveryAck } from "./deliveryAck";

export class InAppProvider implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck> {

    console.log(`In-App notification sent to ${recipient}`);
    console.log(message);

    return {
      provider: "InApp",
      status: "SUCCESS",
      timestamp: new Date(),
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}