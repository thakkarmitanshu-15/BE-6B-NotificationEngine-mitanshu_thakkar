export interface UserPreference {
  userId: string;

  emailEnabled: boolean;

  smsEnabled: boolean;

  pushEnabled: boolean;

  whatsappEnabled: boolean;

  digestMode: boolean;

  language: string;
}