import nodemailer from "nodemailer";
import { DeliveryProvider } from "./DeliveryProvider";
import { DeliveryAck } from "./deliveryAck";

export class EmailProvider implements DeliveryProvider {

  private transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "YOUR_ETHEREAL_EMAIL",
      pass: "YOUR_ETHEREAL_PASSWORD",
    },
  });

  async send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<DeliveryAck> {

    await this.transporter.sendMail({
      from: "notification@demo.com",
      to: recipient,
      subject,
      text: message,
    });

    return {
      provider: "Email",
      status: "SUCCESS",
      timestamp: new Date(),
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}