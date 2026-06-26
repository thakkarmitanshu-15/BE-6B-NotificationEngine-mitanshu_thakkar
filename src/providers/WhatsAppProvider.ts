import { DeliveryProvider } from "./DeliveryProvider";
import { DeliveryAck } from "./deliveryAck";

export class WhatsAppProvider implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck> {

    console.log(`WhatsApp sent to ${recipient}`);
    console.log(message);

    return {
      provider: "WhatsApp",
      status: "SUCCESS",
      timestamp: new Date(),
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}