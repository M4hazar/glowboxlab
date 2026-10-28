import { describe, expect, it } from "vitest";
import {
  fieldErrors,
  MAX_TOTAL_BYTES,
  quoteSchema,
  readQuoteForm,
  validateFiles,
} from "@/lib/quote-schema";

const valid = {
  name: "Paweł",
  email: "pawel@example.com",
  phone: "+44 7749 789776",
  width: "40",
  height: "30,5",
  depth: "6",
  sizeUnsure: false,
  quantity: "2",
  deadline: "",
  description: "Logo kawiarni na ścianę za ladą, białe światło.",
  consent: true,
  locale: "pl",
};

function errorsFor(input: Record<string, unknown>) {
  const parsed = quoteSchema.safeParse(input);
  return parsed.success ? {} : fieldErrors(parsed.error);
}

describe("quoteSchema", () => {
  it("przyjmuje poprawne zapytanie i normalizuje wymiary", () => {
    const parsed = quoteSchema.parse(valid);
    expect(parsed.quantity).toBe(2);
    expect(parsed.height).toBe("30.5");
  });

  it("wymaga wszystkich trzech wymiarów, chyba że klient zaznaczy, że ich nie zna", () => {
    expect(errorsFor({ ...valid, width: "", height: "" })).toEqual({
      width: "size",
    });
    expect(errorsFor({ ...valid, depth: "" })).toEqual({ width: "size" });
    expect(
      errorsFor({ ...valid, width: "", height: "", sizeUnsure: true }),
    ).toEqual({});
  });

  it("przy „Nie znam wymiarów” przyjmuje te wymiary, które klient zna", () => {
    expect(errorsFor({ ...valid, depth: "", sizeUnsure: true })).toEqual({});
    expect(errorsFor({ ...valid, depth: "300", sizeUnsure: true })).toEqual({
      depth: "size",
    });
  });

  it("dopuszcza wymiary do 256 mm, czyli maksimum drukarki", () => {
    expect(
      errorsFor({ ...valid, width: "256", height: "256", depth: "256" }),
    ).toEqual({});
    expect(errorsFor({ ...valid, width: "257" })).toEqual({ width: "size" });
    expect(errorsFor({ ...valid, depth: "257" })).toEqual({ depth: "size" });
  });

  it("odrzuca wymiary spoza zakresu", () => {
    expect(errorsFor({ ...valid, width: "0" })).toMatchObject({
      width: "size",
    });
    expect(errorsFor({ ...valid, height: "900" })).toMatchObject({
      height: "size",
    });
  });

  it("ogranicza liczbę sztuk do zakresu 1 do 500", () => {
    expect(errorsFor({ ...valid, quantity: "0" })).toEqual({
      quantity: "quantity",
    });
    expect(errorsFor({ ...valid, quantity: "501" })).toEqual({
      quantity: "quantity",
    });
    expect(errorsFor({ ...valid, quantity: "1.5" })).toEqual({
      quantity: "quantity",
    });
  });

  it("zwraca klucze komunikatów dla brakujących pól", () => {
    expect(
      errorsFor({
        ...valid,
        name: "",
        email: "nie-email",
        phone: "abc",
        description: "za krótko",
        consent: false,
      }),
    ).toEqual({
      name: "name",
      email: "email",
      phone: "phone",
      description: "description",
      consent: "consent",
    });
  });

  it("pokazuje brak wymiarów razem z innymi błędami", () => {
    expect(errorsFor({ ...valid, name: "", width: "" })).toEqual({
      name: "name",
      width: "size",
    });
  });

  it("telefon jest opcjonalny", () => {
    expect(errorsFor({ ...valid, phone: "" })).toEqual({});
  });
});

describe("readQuoteForm", () => {
  it("czyta pola formularza i checkboxy", () => {
    const data = new FormData();
    data.set("name", "Ola");
    data.set("sizeUnsure", "on");
    data.set("consent", "on");
    const out = readQuoteForm(data);
    expect(out).toMatchObject({
      name: "Ola",
      email: "",
      sizeUnsure: true,
      consent: true,
    });
  });
});

describe("validateFiles", () => {
  it("przyjmuje grafiki i pliki wektorowe", () => {
    expect(
      validateFiles([
        { name: "logo.SVG", size: 1000 },
        { name: "szkic.jpg", size: 1000 },
        { name: "projekt.ai", size: 1000 },
      ]),
    ).toBeNull();
  });

  it("odrzuca nieobsługiwany typ pliku i podaje jego nazwę", () => {
    expect(validateFiles([{ name: "wirus.exe", size: 10 }])).toEqual({
      key: "fileType",
      file: "wirus.exe",
    });
  });

  it("pilnuje limitu liczby i rozmiaru plików", () => {
    const small = { name: "a.png", size: 10 };
    expect(validateFiles([small, small, small, small])).toEqual({
      key: "fileCount",
    });
    expect(
      validateFiles([
        { name: "a.png", size: MAX_TOTAL_BYTES },
        { name: "b.png", size: 1 },
      ]),
    ).toEqual({ key: "fileSize" });
  });
});
