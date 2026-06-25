const analytics = {
  email: 0,
  sms: 0,
  push: 0,
  whatsapp: 0,
};

export function recordPreferenceChange(
  field: keyof typeof analytics
) {
  analytics[field]++;
}

export function getAnalytics() {
  return analytics;
}