import { afterEach, describe, expect, it } from "vitest";
import {
  checkSubmission,
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  RATE_LIMIT,
  RATE_WINDOW_MS,
  rateLimited,
  resetRateLimit,
} from "@/lib/spam-guard";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("checkSubmission", () => {
  it("przepuszcza formularz wypełniony w ludzkim tempie", () => {
    expect(checkSubmission(form({ [ELAPSED_FIELD]: "45000" }))).toBe("ok");
  });

  it("zatrzymuje wypełnione pole pułapkę", () => {
    expect(
      checkSubmission(
        form({ [ELAPSED_FIELD]: "45000", [HONEYPOT_FIELD]: "spam" }),
      ),
    ).toBe("honeypot");
  });

  it("zatrzymuje zbyt szybkie wysłanie i wysłanie z pominięciem strony", () => {
    expect(
      checkSubmission(form({ [ELAPSED_FIELD]: String(MIN_FILL_MS - 1) })),
    ).toBe("tooFast");
    expect(checkSubmission(form({}))).toBe("tooFast");
    expect(checkSubmission(form({ [ELAPSED_FIELD]: "abc" }))).toBe("tooFast");
  });
});

describe("rateLimited", () => {
  afterEach(resetRateLimit);

  it("blokuje serię z jednego adresu i odblokowuje po czasie", () => {
    const start = 1_000_000;
    for (let i = 0; i < RATE_LIMIT; i++) {
      expect(rateLimited("1.2.3.4", start + i)).toBe(false);
    }
    expect(rateLimited("1.2.3.4", start + RATE_LIMIT)).toBe(true);
    expect(rateLimited("5.6.7.8", start + RATE_LIMIT)).toBe(false);
    expect(rateLimited("1.2.3.4", start + RATE_WINDOW_MS + RATE_LIMIT)).toBe(
      false,
    );
  });
});
