export function isQuietHours(
  timezone: string = "Asia/Kolkata"
): boolean {

  const date = new Date();

  const hour = Number(
    date.toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    })
  );

  return hour >= 22 || hour < 7;
}