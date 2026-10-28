import { z } from "zod";

// Komunikaty błędów to klucze z `quote.errors` w słownikach, tłumaczone w UI.
export type QuoteErrorKey =
  | "name"
  | "email"
  | "phone"
  | "size"
  | "quantity"
  | "description"
  | "consent"
  | "fileType"
  | "fileSize"
  | "fileCount";

// Największy lightbox, jaki mieści drukarka: 256 × 256 × 256 mm.
const MAX_SIZE_MM = 256;
export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "svg",
  "pdf",
  "ai",
  "eps",
] as const;
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(
  ",",
);

const dimension = z
  .string()
  .trim()
  .transform((v) => v.replace(",", "."))
  .refine(
    (v) => v === "" || (Number(v) > 0 && Number(v) <= MAX_SIZE_MM),
    "size",
  );

export const quoteSchema = z
  .object({
    name: z.string().trim().min(2, "name").max(80, "name"),
    email: z.email("email").max(160, "email"),
    phone: z
      .string()
      .trim()
      .max(30, "phone")
      .refine((v) => v === "" || /^[+()\d\s-]{7,}$/.test(v), "phone"),
    width: dimension,
    height: dimension,
    depth: dimension,
    sizeUnsure: z.boolean(),
    quantity: z.coerce
      .number({ error: "quantity" })
      .int("quantity")
      .min(1, "quantity")
      .max(500, "quantity"),
    deadline: z.string().trim().max(20),
    description: z
      .string()
      .trim()
      .min(20, "description")
      .max(3000, "description"),
    consent: z.literal(true, { error: "consent" }),
    locale: z.enum(["en", "pl"]),
  })
  // Brak wymiarów sprawdzamy także wtedy, gdy inne pola mają błędy,
  // żeby klient zobaczył wszystkie błędy od razu, a nie w dwóch rundach.
  .refine(
    (data) =>
      data.sizeUnsure || ![data.width, data.height, data.depth].includes(""),
    { path: ["width"], message: "size", when: () => true },
  );

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput | "files";
export type QuoteFieldErrors = Partial<Record<QuoteField, QuoteErrorKey>>;

export function readQuoteForm(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    width: text("width"),
    height: text("height"),
    depth: text("depth"),
    sizeUnsure: formData.get("sizeUnsure") === "on",
    quantity: text("quantity"),
    deadline: text("deadline"),
    description: text("description"),
    consent: formData.get("consent") === "on",
    locale: text("locale"),
  };
}

export function readQuoteFiles(formData: FormData) {
  return formData
    .getAll("files")
    .filter(
      (f): f is File => typeof f === "object" && f !== null && f.size > 0,
    );
}

export function validateFiles(
  files: { name: string; size: number }[],
): { key: QuoteErrorKey; file?: string } | null {
  if (files.length > MAX_FILES) return { key: "fileCount" };
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) {
      return { key: "fileType", file: file.name };
    }
  }
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) return { key: "fileSize" };
  return null;
}

export function fieldErrors(error: z.ZodError): QuoteFieldErrors {
  const out: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as QuoteField | undefined;
    if (field && !out[field]) out[field] = issue.message as QuoteErrorKey;
  }
  return out;
}
