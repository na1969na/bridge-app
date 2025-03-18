import { z } from "zod";

export const emergencyContactSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Emergency contact phone number is required"),
  email: z.string().email().optional(),
});

export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
