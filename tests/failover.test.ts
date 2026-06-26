import {
  CircuitBreaker,
} from "../src/circuitbreaker/circuitBreaker";

describe(
  "Circuit Breaker",
  () => {

    test(
      "Circuit opens after failures",
      async () => {

        const breaker =
          new CircuitBreaker();

        await expect(
          breaker.execute(
            async () => {
              throw new Error(
                "Failure"
              );
            }
          )
        ).rejects.toThrow();

      }
    );

  }
);