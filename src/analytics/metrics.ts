const metrics = {

  deliveries: new Map<string, number>(),

  failures: new Map<string, number>(),

  latency: new Map<string, number[]>(),

};

export function recordDelivery(
  channel: string
) {

  const count =
    metrics.deliveries.get(channel) || 0;

  metrics.deliveries.set(
    channel,
    count + 1
  );

}

export function recordFailure(
  channel: string
) {

  const count =
    metrics.failures.get(channel) || 0;

  metrics.failures.set(
    channel,
    count + 1
  );

}

export function recordLatency(
  channel: string,
  time: number
) {

  const list =
    metrics.latency.get(channel) || [];

  list.push(time);

  metrics.latency.set(
    channel,
    list
  );

}

export function getMetrics() {

  return metrics;

}