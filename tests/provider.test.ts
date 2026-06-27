import nodemailer from "nodemailer";

import { EmailProvider } from "../src/providers/EmailProvider";
import { SMSProvider } from "../src/providers/SMSProvider";
import { PushProvider } from "../src/providers/PushProvider";
import { WhatsAppProvider } from "../src/providers/WhatsAppProvider";
import { InAppProvider } from "../src/providers/InAppProvider";

jest.mock("nodemailer", () => ({
  createTransport: () => ({
    sendMail: jest.fn().mockResolvedValue(true),
  }),
}));

describe("Notification Providers", () => {

  test("EmailProvider send()", async () => {

    const provider = new EmailProvider();

    const result = await provider.send(
      "demo@test.com",
      "Subject",
      "Message"
    );

    expect(result.provider).toBe("Email");
    expect(result.status).toBe("SUCCESS");

  });

  test("EmailProvider healthCheck()", async () => {

    const provider = new EmailProvider();

    expect(
      await provider.healthCheck()
    ).toBe(true);

  });

  test("SMSProvider send()", async () => {

    const provider = new SMSProvider();

    const result = await provider.send(
      "9999999999",
      "",
      "Hello"
    );

    expect(result.provider).toBe("SMS");
    expect(result.status).toBe("SUCCESS");

  });

  test("SMSProvider healthCheck()", async () => {

    const provider = new SMSProvider();

    expect(
      await provider.healthCheck()
    ).toBe(true);

  });

  test("PushProvider send()", async () => {

    const provider = new PushProvider();

    const result = await provider.send(
      "user-123",
      "",
      "Push"
    );

    expect(result.provider).toBe("Push");
    expect(result.status).toBe("SUCCESS");

  });

  test("PushProvider healthCheck()", async () => {

    const provider = new PushProvider();

    expect(
      await provider.healthCheck()
    ).toBe(true);

  });

  test("WhatsAppProvider send()", async () => {

    const provider =
      new WhatsAppProvider();

    const result =
      await provider.send(
        "9999999999",
        "",
        "WhatsApp"
      );

    expect(result.provider)
      .toBe("WhatsApp");

    expect(result.status)
      .toBe("SUCCESS");

  });

  test("WhatsAppProvider healthCheck()", async () => {

    const provider =
      new WhatsAppProvider();

    expect(
      await provider.healthCheck()
    ).toBe(true);

  });

  test("InAppProvider send()", async () => {

    const provider =
      new InAppProvider();

    const result =
      await provider.send(
        "user-123",
        "",
        "Hello"
      );

    expect(result.provider)
      .toBe("InApp");

    expect(result.status)
      .toBe("SUCCESS");

  });

  test("InAppProvider healthCheck()", async () => {

    const provider =
      new InAppProvider();

    expect(
      await provider.healthCheck()
    ).toBe(true);

  });

});