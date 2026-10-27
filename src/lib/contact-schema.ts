import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię (min. 2 znaki)"),
  email: z.email("Podaj poprawny adres e-mail"),
  message: z.string().trim().min(10, "Wiadomość powinna mieć min. 10 znaków"),
});

export type ContactInput = z.infer<typeof contactSchema>;
