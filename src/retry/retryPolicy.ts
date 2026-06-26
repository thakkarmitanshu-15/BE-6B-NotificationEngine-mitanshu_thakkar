export interface RetryPolicy {
  maxRetries: number;
}

export function getRetryPolicy(
  priority: string
): RetryPolicy {

  switch (priority) {

    case "CRITICAL":
      return { maxRetries: 10 };

    case "HIGH":
      return { maxRetries: 5 };

    case "MEDIUM":
      return { maxRetries: 3 };

    case "LOW":
    default:
      return { maxRetries: 2 };

  }

}