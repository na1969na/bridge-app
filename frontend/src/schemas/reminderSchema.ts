import { z } from "zod";

export const reminderSchema = z.object({
  method: z.enum(["sms", "email"]).nullable(),
  timeOfDay: z.enum(["morning", "afternoon", "evening"]),
});

export type ReminderSchema = z.infer<typeof reminderSchema>;
