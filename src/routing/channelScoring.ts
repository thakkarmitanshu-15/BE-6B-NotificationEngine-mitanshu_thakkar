export interface ChannelScore {
  channel: string;
  score: number;
}

export function scoreChannels(
  eventType: string
): ChannelScore[] {

  const scores: ChannelScore[] = [
    { channel: "push", score: 90 },
    { channel: "email", score: 80 },
    { channel: "sms", score: 70 },
    { channel: "whatsapp", score: 60 },
    { channel: "inapp", score: 50 },
  ];

  if (eventType.startsWith("RISK")) {
    scores.find(c => c.channel === "sms")!.score = 100;
  }

  return scores.sort(
    (a, b) => b.score - a.score
  );
}