export async function enrichEvent(event: any) {
  return {
    ...event,
    userContext: {
      userId: event.userId,
      preferredChannels: ["email", "push"],
      language: "en"
    }
  };
}