import { z } from "zod";

export const confirmEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  code: z.string().min(4, { message: "Code is required" }),
});

export type ConfirmEmailFormData = z.infer<typeof confirmEmailSchema>;
