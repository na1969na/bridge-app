import { z } from "zod";

export const emergencyContactSchema = z.object({
  name: z.string().min(1, "Emergency contact name is required"),
  phone: z.string().min(1, "Emergency contact phone number is required"),
  email: z.string().email().optional(),
});

export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
