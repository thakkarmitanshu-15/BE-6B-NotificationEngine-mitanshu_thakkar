export function classifyFailure(
  reason: string
) {

  if (
    reason.includes("timeout")
  ) {

    return "TRANSIENT";

  }

  if (
    reason.includes("configuration")
  ) {

    return "CONFIGURATION";

  }

  return "PERMANENT";

}