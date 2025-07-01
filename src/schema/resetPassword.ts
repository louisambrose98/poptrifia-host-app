import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  code: z.string().min(4, { message: "Code is required" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
