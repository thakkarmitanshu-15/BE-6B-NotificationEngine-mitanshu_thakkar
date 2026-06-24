export function truncateSMS(
  message: string
) {
  if (message.length <= 160) {
    return message;
  }

  return (
    message.substring(0, 157) + "..."
  );
}