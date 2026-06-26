import { DeliveryProvider } from "./DeliveryProvider";

export class InAppProvider
  implements DeliveryProvider {

  async send(
    recipient: string,
    subject: string,
    message: string
  ) {

    console.log(
      `In-App Notification sent to ${recipient}`
    );

    console.log(message);
  }

  async healthCheck() {
    return true;
  }
}