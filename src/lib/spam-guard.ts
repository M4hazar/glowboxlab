// Ochrona formularza przed spamem bez zewnętrznych usług, ciasteczek i captchy.
// Boty dostają udawany sukces, żeby nie uczyły się, co je zatrzymało.

// Nazwa pola pułapki nie przypomina żadnego pola, które przeglądarka uzupełnia sama
// (np. "company"), bo autouzupełnienie po cichu wyrzucałoby prawdziwe zapytania.
export const HONEYPOT_FIELD = "extra_note";
// Ile milisekund minęło od pokazania formularza do wysłania. Uzupełnia je przeglądarka.
export const ELAPSED_FIELD = "elapsed";
// Człowiek nie wypełni imienia, e-maila, wymiarów i opisu szybciej.
export const MIN_FILL_MS = 3000;

export const RATE_LIMIT = 5;
export const RATE_WINDOW_MS = 10 * 60 * 1000;

export type SpamVerdict = "ok" | "honeypot" | "tooFast";

export function checkSubmission(formData: FormData): SpamVerdict {
  if (formData.get(HONEYPOT_FIELD)) return "honeypot";
  const elapsed = Number(formData.get(ELAPSED_FIELD));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return "tooFast";
  return "ok";
}

// Limit zapytań z jednego adresu IP. Pamięć jednej instancji funkcji, więc to próg
// na serie z jednego źródła, a nie licznik globalny. Adresów nigdzie nie zapisujemy.
const hits = new Map<string, number[]>();

export function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export function resetRateLimit() {
  hits.clear();
}
