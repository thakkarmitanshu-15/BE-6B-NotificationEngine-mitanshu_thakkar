export interface Preference {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  whatsappEnabled: boolean;
  digestMode: boolean;
  language: string;
}

const systemDefaults: Preference = {
  emailEnabled: true,
  smsEnabled: true,
  pushEnabled: true,
  whatsappEnabled: false,
  digestMode: false,
  language: "en",
};

const premiumSegment: Partial<Preference> = {
  pushEnabled: true,
  whatsappEnabled: true,
};

const regulatoryOverride: Partial<Preference> = {
  smsEnabled: false,
};

export function resolvePreferences(
  userPreference: Partial<Preference>,
  isPremium: boolean,
  regulatoryBlock: boolean
): Preference {

  let finalPreference = {
    ...systemDefaults,
  };

  if (isPremium) {
    finalPreference = {
      ...finalPreference,
      ...premiumSegment,
    };
  }

  finalPreference = {
    ...finalPreference,
    ...userPreference,
  };

  if (regulatoryBlock) {
    finalPreference = {
      ...finalPreference,
      ...regulatoryOverride,
    };
  }

  return finalPreference;
}