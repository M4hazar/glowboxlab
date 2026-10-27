"use server";

import { contactSchema } from "@/lib/contact-schema";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string[] | undefined> }
  | { status: "success"; message: string };

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  // Tu podłącz wysyłkę (np. Resend, baza danych, webhook).
  return {
    status: "success",
    message: `Dzięki, ${parsed.data.name}! Odezwiemy się wkrótce.`,
  };
}
