const cost = {

  email: 0.10,

  sms: 0.50,

  push: 0.02,

  whatsapp: 0.30,

};

export function calculateCost(
  channel: string,
  count: number
) {

  return (
    (cost[
      channel as keyof typeof cost
    ] || 0) * count
  );

}