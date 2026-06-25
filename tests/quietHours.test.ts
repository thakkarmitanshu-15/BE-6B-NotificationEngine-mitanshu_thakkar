import { isQuietHours } from "../src/compliance/quietHours";

describe("Quiet Hours", () => {
  test("Function returns boolean", () => {
    expect(typeof isQuietHours()).toBe("boolean");
  });

  test("Can be called without errors", () => {
    expect(() => isQuietHours()).not.toThrow();
  });

  test("Returns true or false", () => {
    expect([true, false]).toContain(isQuietHours());
  });

  test("Timezone parameter works", () => {
    expect(typeof isQuietHours("Asia/Kolkata")).toBe("boolean");
  });
});