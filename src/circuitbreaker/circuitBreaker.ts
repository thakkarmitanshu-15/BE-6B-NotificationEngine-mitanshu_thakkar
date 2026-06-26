export class CircuitBreaker {

  private failures = 0;

  private readonly threshold = 3;

  async execute(
    operation: () => Promise<void>
  ) {

    if (
      this.failures >= this.threshold
    ) {
      throw new Error(
        "Circuit Open"
      );
    }

    try {

      await operation();

      this.failures = 0;

    } catch (error) {

      this.failures++;

      throw error;

    }

  }

}