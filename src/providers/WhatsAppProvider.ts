import { DeliveryProvider } from "./DeliveryProvider";

export class WhatsAppProvider
  implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ) {

    console.log(
      `WhatsApp sent to ${recipient}`
    );

    console.log(message);
  }

  async healthCheck() {
    return true;
  }
}