interface Metric {

  timestamp: number;

  value: number;

}

const history: Metric[] = [];

export function addMetric(
  value: number
) {

  history.push({

    timestamp: Date.now(),

    value,

  });

}

export function getLastHour() {

  const oneHour =
    Date.now() - 60 * 60 * 1000;

  return history.filter(
    h => h.timestamp >= oneHour
  );

}