export function fanOut(
  channels: string[]
): string[] {

  return [...new Set(channels)];

}