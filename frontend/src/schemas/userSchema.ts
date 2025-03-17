import { z } from 'zod';
import { emergencyContactSchema } from './emergencyContactSchema';
import { notificationSettingsSchema } from './notificationSettingsSchema';

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  emergencyContact: z.array(emergencyContactSchema).min(1, "At least one emergency contact is required"),
  notificationSettings: notificationSettingsSchema,
});

export type UserFormInputs = z.infer<typeof userSchema>;
