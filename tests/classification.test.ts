import { classifyNotification } from "../src/compliance/classificationEngine";
describe("Notification Classification", () => {

  test("TXNX is transactional", () => {
    expect(
      classifyNotification("TXNX-001")
    ).toBe("TRANSACTIONAL");
  });

  test("RISK is transactional", () => {
    expect(
      classifyNotification("RISK-001")
    ).toBe("TRANSACTIONAL");
  });

  test("REGX is transactional", () => {
    expect(
      classifyNotification("REGX-001")
    ).toBe("TRANSACTIONAL");
  });

  test("ALRT is promotional", () => {
    expect(
      classifyNotification("ALRT-001")
    ).toBe("PROMOTIONAL");
  });

});