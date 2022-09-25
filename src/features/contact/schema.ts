import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email().max(100),
  message: z.string().min(1).min(10).max(2000),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
