export function personalize(
  event: any,
  userContext: any
) {
  return {
    ...event,
    userName:
      userContext.userName,
    language:
      userContext.language
  };
}