import type { QuoteErrorKey, QuoteFieldErrors } from "@/lib/quote-schema";

export type QuoteState =
  | { status: "idle" }
  | {
      status: "error";
      errors: QuoteFieldErrors;
      fileError?: { key: QuoteErrorKey; file?: string };
    }
  | { status: "failed" }
  | { status: "success"; name: string };

// Adres skryptu PHP na serwerze (hosting/api/quote.php), który sprawdza i wysyła zapytanie.
export const QUOTE_ENDPOINT = "/api/quote.php";

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // PHP zachowuje tylko ostatni z kilku plików o tej samej nazwie pola,
  // a wszystkie dopiero przy nazwie z nawiasami (files[]).
  const body = new FormData();
  for (const [key, value] of formData) {
    body.append(key === "files" ? "files[]" : key, value);
  }
  try {
    const response = await fetch(QUOTE_ENDPOINT, { method: "POST", body });
    if (!response.ok) return { status: "failed" };
    return (await response.json()) as QuoteState;
  } catch {
    return { status: "failed" };
  }
}
