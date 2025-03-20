import { z } from 'zod';
import { emergencyContactSchema } from './emergencyContactSchema';
import { reminderSchema } from './reminderSchema';

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
