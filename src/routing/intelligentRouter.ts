import { scoreChannels } from "./channelScoring";

export function getBestChannel(
  eventType: string
): string {

  const channels = scoreChannels(eventType);

  return channels[0].channel;
}

export function getAllChannels(
  eventType: string
): string[] {

  return scoreChannels(eventType)
    .map(c => c.channel);

}