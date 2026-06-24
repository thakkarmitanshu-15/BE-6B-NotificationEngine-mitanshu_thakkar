export function getTemplateVersion(
  userId: string
) {
  const lastDigit =
    Number(
      userId.replace(/\D/g, "").slice(-1)
    );

  return lastDigit % 2 === 0
    ? "versionA"
    : "versionB";
}