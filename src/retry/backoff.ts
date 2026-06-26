export function getRetryDelay(
  attempt: number
): number {

  const base = 1000;

  const jitter =
    Math.floor(Math.random() * 500);

  return (
    Math.pow(2, attempt) *
      base +
    jitter
  );

}