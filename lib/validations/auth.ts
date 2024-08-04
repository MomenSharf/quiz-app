import { z } from "zod";

export const regiseterSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type regiseterSchemaType = z.infer<typeof regiseterSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
