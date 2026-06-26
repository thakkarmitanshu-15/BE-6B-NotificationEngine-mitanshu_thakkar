import { getProvider } from "../src/providers/ProviderFactory";

describe("Provider Factory", () => {

  test("Email Provider", () => {
    expect(
      getProvider("email")
    ).toBeDefined();
  });

  test("SMS Provider", () => {
    expect(
      getProvider("sms")
    ).toBeDefined();
  });

  test("Push Provider", () => {
    expect(
      getProvider("push")
    ).toBeDefined();
  });

  test("WhatsApp Provider", () => {
    expect(
      getProvider("whatsapp")
    ).toBeDefined();
  });

  test("InApp Provider", () => {
    expect(
      getProvider("inapp")
    ).toBeDefined();
  });

});