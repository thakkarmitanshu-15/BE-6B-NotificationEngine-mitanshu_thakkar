const limits = new Map<
  string,
  number
>();

const MAX_PER_MINUTE = 60;

export function allowRequest(
  provider: string
): boolean {

  const count =
    limits.get(provider) || 0;

  if (count >= MAX_PER_MINUTE) {
    return false;
  }

  limits.set(
    provider,
    count + 1
  );

  return true;

}