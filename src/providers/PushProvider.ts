import { DeliveryProvider } from "./DeliveryProvider";

export class PushProvider
  implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ) {

    console.log(
      `Push Notification sent to ${recipient}`
    );

    console.log(message);
  }

  async healthCheck() {
    return true;
  }
}