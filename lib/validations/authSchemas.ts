import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ResetPasswordShema = z.object({
  email: z.string().email("Invalid email address"),
});
