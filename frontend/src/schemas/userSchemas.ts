import { z } from 'zod';

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Emergency contact phone number is required'),
  email: z.string().email().optional().nullable(),
});

export type EmergencyContact = z.infer<typeof emergencyContactSchema>;

// Reminder Schema
export const reminderSchema = z.object({
  method: z.enum(['sms', 'email']).nullable(),
  timeOfDay: z.enum(['morning', 'afternoon', 'evening']),
});

export type ReminderSchema = z.infer<typeof reminderSchema>;

// User Schema
export const userSchema = z.object({
  firstname: z.string().min(1, 'First Name is required'),
  lastname: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  emergencyContact: z
    .array(emergencyContactSchema)
    .min(1, 'At least one emergency contact is required'),
  reminder: reminderSchema,
});

export type UserFormInputs = z.infer<typeof userSchema>;
