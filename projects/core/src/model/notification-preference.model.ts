export interface BasicNotificationPreferenceList {
  preferences: BasicNotificationPreference[];
}
export interface BasicNotificationPreference {
  channel: string;
  enabled: boolean;
  value: string;
  visible: boolean;
}
export interface NotificationPreferenceList {
  preferences: NotificationPreference[];
}
export interface NotificationPreference {
  channel: string;
  enabled: boolean;
}