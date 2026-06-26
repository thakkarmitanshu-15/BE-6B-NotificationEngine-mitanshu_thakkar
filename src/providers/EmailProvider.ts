import nodemailer from "nodemailer";
import { DeliveryProvider } from "./DeliveryProvider";

export class EmailProvider
  implements DeliveryProvider {

  private transporter =
    nodemailer.createTransport({
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
  ) {

    await this.transporter.sendMail({
      from: "notification@demo.com",
      to: recipient,
      subject,
      text: message,
    });

    console.log(
      "Email sent successfully"
    );
  }

  async healthCheck() {
    return true;
  }
}