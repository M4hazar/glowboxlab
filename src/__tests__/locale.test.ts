import { describe, expect, it } from "vitest";
import { preferredLocale } from "@/lib/locale";

describe("preferredLocale", () => {
  it("wybiera polski dla przeglądarki po polsku", () => {
    expect(preferredLocale("pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7")).toBe("pl");
    expect(preferredLocale("pl")).toBe("pl");
  });

  it("zostaje przy angielskim, gdy angielski jest wyżej niż polski", () => {
    expect(preferredLocale("en-GB,en;q=0.9,pl;q=0.8")).toBe("en");
  });

  it("pomija nieobsługiwane języki i bierze pierwszy obsługiwany", () => {
    expect(preferredLocale("de-DE,de;q=0.9,pl;q=0.8")).toBe("pl");
    expect(preferredLocale("de-DE,fr;q=0.8")).toBe("en");
  });

  it("uwzględnia wagi q niezależnie od kolejności", () => {
    expect(preferredLocale("en;q=0.5,pl;q=0.9")).toBe("pl");
    expect(preferredLocale("pl;q=0,en")).toBe("en");
  });

  it("domyślnie zwraca angielski", () => {
    expect(preferredLocale(null)).toBe("en");
    expect(preferredLocale("")).toBe("en");
    expect(preferredLocale("*")).toBe("en");
  });
});
