import { z } from "zod";

export const notificationSettingsSchema = z.object({
  isEnabled: z.boolean(),
  timeOfDay: z.enum(["morning", "afternoon", "evening"]),
  notificationMethod: z.enum(["sms", "email"]),
});

export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;
