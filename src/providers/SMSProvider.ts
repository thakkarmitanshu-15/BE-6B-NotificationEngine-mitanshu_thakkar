import { DeliveryProvider } from "./DeliveryProvider";

export class SMSProvider
  implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ) {

    console.log(
      `SMS sent to ${recipient}`
    );

    console.log(message);
  }

  async healthCheck() {
    return true;
  }
}