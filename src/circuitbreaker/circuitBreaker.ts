export enum CircuitState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}

export class CircuitBreaker {

  private failures = 0;

  private readonly threshold = 3;

  private state = CircuitState.CLOSED;

  private lastFailure = 0;

  private readonly timeout = 10000;

  async execute<T>(
    operation: () => Promise<T>
  ): Promise<T> {

    if (
      this.state === CircuitState.OPEN
    ) {

      if (
        Date.now() - this.lastFailure >
        this.timeout
      ) {

        this.state =
          CircuitState.HALF_OPEN;

      } else {

        throw new Error(
          "Circuit is OPEN"
        );

      }

    }

    try {

      const result =
        await operation();

      this.failures = 0;

      this.state =
        CircuitState.CLOSED;

      return result;

    } catch (error) {

      this.failures++;

      this.lastFailure =
        Date.now();

      if (
        this.failures >=
        this.threshold
      ) {

        this.state =
          CircuitState.OPEN;

      }

      throw error;

    }

  }

}