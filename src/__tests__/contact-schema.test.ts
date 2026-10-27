import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("akceptuje poprawne dane", () => {
    const r = contactSchema.safeParse({
      name: "Ala",
      email: "ala@example.com",
      message: "Dzień dobry, mam pytanie.",
    });
    expect(r.success).toBe(true);
  });

  it("odrzuca błędny e-mail", () => {
    const r = contactSchema.safeParse({
      name: "Ala",
      email: "nie-email",
      message: "Dzień dobry, mam pytanie.",
    });
    expect(r.success).toBe(false);
  });
});
