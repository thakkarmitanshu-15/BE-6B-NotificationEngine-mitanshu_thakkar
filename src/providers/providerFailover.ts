const providerMap = {

  sms: [
    "MSG91",
    "Twilio",
  ],

  push: [
    "FCM",
    "APNS",
  ],

};

export function getBackupProvider(
  channel: string
) {

  return (
    providerMap[
      channel as keyof typeof providerMap
    ] || []
  );

}