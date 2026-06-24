import { routeEvent } from "../src/routing/notificationRouter";

describe("Routing Engine", () => {
  test("RISK event routes to all channels", () => {
    const result = routeEvent("RISK-001");

    expect(result.channels).toContain("sms");
    expect(result.channels).toContain("email");
    expect(result.channels).toContain("push");
  });

  test("Market event routes to push", () => {
    const result = routeEvent("MKTX-001");

    expect(result.channels).toContain("push");
  });
});