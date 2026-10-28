import { describe, expect, it } from "vitest";
import { en } from "@/content/en";
import { cookies, privacy, terms } from "@/content/legal";
import { pl } from "@/content/pl";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(strings);
  return [];
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, shape(v)]),
    );
  return typeof value;
}

describe("treści strony", () => {
  const all = [en, pl, privacy, cookies, terms];

  it("nie zawierają długich ani średnich myślników", () => {
    const offending = all.flatMap(strings).filter((s) => /[–—]/.test(s));
    expect(offending).toEqual([]);
  });

  it("wersja polska ma te same klucze i liczbę elementów co angielska", () => {
    expect(shape(pl)).toEqual(shape(en));
    expect(shape(privacy.pl)).toEqual(shape(privacy.en));
    expect(shape(cookies.pl)).toEqual(shape(cookies.en));
    expect(shape(terms.pl)).toEqual(shape(terms.en));
  });

  it("nie ma pustych tekstów", () => {
    expect(all.flatMap(strings).filter((s) => s.trim() === "")).toEqual([]);
  });
});
