import { getRetryPolicy } from "../src/retry/retryPolicy";

describe("Retry Policy", () => {

  test("Critical gets 10 retries", () => {
    expect(
      getRetryPolicy("CRITICAL").maxRetries
    ).toBe(10);
  });

  test("Low gets 2 retries", () => {
    expect(
      getRetryPolicy("LOW").maxRetries
    ).toBe(2);
  });

});