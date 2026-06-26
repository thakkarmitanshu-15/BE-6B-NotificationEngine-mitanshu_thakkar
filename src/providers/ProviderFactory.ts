import { EmailProvider } from "./EmailProvider";
import { SMSProvider } from "./SMSProvider";
import { PushProvider } from "./PushProvider";
import { WhatsAppProvider } from "./WhatsAppProvider";
import { InAppProvider } from "./InAppProvider";
import { DeliveryProvider } from "./DeliveryProvider";

export function getProvider(
  channel: string
): DeliveryProvider {

  switch (channel) {

    case "email":
      return new EmailProvider();

    case "sms":
      return new SMSProvider();

    case "push":
      return new PushProvider();

    case "whatsapp":
      return new WhatsAppProvider();

    case "inapp":
      return new InAppProvider();

    default:
      throw new Error("Unknown provider");
  }

}