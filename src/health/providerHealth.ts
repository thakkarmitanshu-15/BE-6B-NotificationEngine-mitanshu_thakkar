import { getProvider } from "../providers/ProviderFactory";

export async function checkProviders() {

  const providers = [
    "email",
    "sms",
    "push",
    "whatsapp",
    "inapp",
  ];

  for (const channel of providers) {

    const provider = getProvider(channel);

    const healthy =
      await provider.healthCheck();

    console.log(
      `${channel}:`,
      healthy
        ? "Healthy"
        : "Unhealthy"
    );

  }

}