"use client";

import {
  CheckCircle2Icon,
  FileIcon,
  Loader2Icon,
  MinusIcon,
  PaperclipIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { type QuoteState, submitQuote } from "@/app/actions/quote";
import type { Dictionary } from "@/content/en";
import {
  ACCEPT_ATTR,
  fieldErrors,
  MAX_FILES,
  projectTypes,
  type QuoteErrorKey,
  type QuoteField,
  type QuoteFieldErrors,
  quoteSchema,
  readQuoteForm,
  validateFiles,
} from "@/lib/quote-schema";
import { type Locale, routes } from "@/lib/site";
import { cn } from "@/lib/utils";

const initial: QuoteState = { status: "idle" };

const inputClass =
  "h-12 w-full rounded-lg border border-input bg-white/[0.03] px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors outline-none hover:border-white/25 focus-visible:border-brand-soft focus-visible:ring-[3px] focus-visible:ring-brand/25 aria-invalid:border-destructive disabled:opacity-40";

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function QuoteForm({ dict }: { dict: Dictionary }) {
  const t = dict.quote.form;
  const e = dict.quote.errors;
  const locale = dict.locale as Locale;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [state, action] = useActionState(submitQuote, initial);
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [unsure, setUnsure] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [today, setToday] = useState<string>();

  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const fileMessage = (err: { key: QuoteErrorKey; file?: string }) =>
    e[err.key].replace("{file}", err.file ?? "");

  // Odpowiedź serwera: błędy pól, błąd wysyłki albo sukces.
  // biome-ignore lint/correctness/useExhaustiveDependencies: fileMessage zależy tylko od słownika
  useEffect(() => {
    if (state.status === "error") {
      setErrors(state.errors);
      setFileError(state.fileError ? fileMessage(state.fileError) : null);
      revealErrors();
    } else if (state.status === "failed") {
      setFailed(true);
    } else if (state.status === "success") {
      setDone(state.name);
    }
  }, [state]);

  useEffect(() => {
    if (!showSummary) return;
    const first = formRef.current?.querySelector<HTMLElement>(
      "[aria-invalid='true']",
    );
    first?.focus();
  }, [showSummary]);

  // Ponowne pokazanie podsumowania przenosi fokus na pierwsze błędne pole.
  function revealErrors() {
    setShowSummary(false);
    requestAnimationFrame(() => setShowSummary(true));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
    const known = new Set(files.map(key));
    const added = Array.from(list).filter((f) => !known.has(key(f)));
    const next = [...files, ...added].slice(0, MAX_FILES + 1);
    const err = validateFiles(next);
    setFileError(err ? fileMessage(err) : null);
    if (!err) setFiles(next);
    if (fileInput.current) fileInput.current.value = "";
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.delete("files");
    for (const file of files) data.append("files", file);
    setFailed(false);

    const parsed = quoteSchema.safeParse(readQuoteForm(data));
    const nextErrors = parsed.success ? {} : fieldErrors(parsed.error);
    const fileErr = validateFiles(files);
    setErrors(nextErrors);
    setFileError(fileErr ? fileMessage(fileErr) : null);
    if (!parsed.success || fileErr) {
      revealErrors();
      return;
    }
    setShowSummary(false);
    startTransition(() => action(data));
  }

  function clearError(field: QuoteField) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (done !== null) {
    return (
      <div
        role="status"
        className="flex min-h-[520px] flex-col items-start justify-center gap-5 p-2 sm:p-6"
      >
        <CheckCircle2Icon className="size-12 text-brand" aria-hidden />
        <h3 className="display text-3xl sm:text-4xl">
          {t.successTitle.replace("{name}", done)}
        </h3>
        <p className="max-w-md text-lg text-muted-foreground">
          {t.successText}
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(null);
            setFiles([]);
            setQuantity(1);
            setUnsure(false);
            setErrors({});
          }}
          className="link-underline mt-4"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;
  const err = (field: QuoteField) => errors[field];
  const sizeError = err("width") ?? err("height");
  const errorText = (key?: QuoteErrorKey, field?: string) =>
    key ? (
      <p id={id(`${field}-error`)} className="mt-2 text-sm text-destructive">
        {e[key]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-6"
      aria-describedby={id("summary")}
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Pole pułapka na boty */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div id={id("summary")} aria-live="assertive" className="empty:hidden">
        {showSummary && (Object.values(errors).some(Boolean) || fileError) ? (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {e.summary}
          </p>
        ) : null}
        {failed ? (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {e.generic}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")} text={t.name} />
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            required
            className={inputClass}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? id("name-error") : undefined}
            onChange={() => clearError("name")}
          />
          {errorText(err("name"), "name")}
        </div>
        <div>
          <Label htmlFor={id("email")} text={t.email} />
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={inputClass}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? id("email-error") : undefined}
            onChange={() => clearError("email")}
          />
          {errorText(err("email"), "email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("phone")} text={t.phone} optional={t.optional} />
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            aria-invalid={Boolean(err("phone"))}
            aria-describedby={err("phone") ? id("phone-error") : undefined}
            onChange={() => clearError("phone")}
          />
          {errorText(err("phone"), "phone")}
        </div>
        <div>
          <Label
            htmlFor={id("deadline")}
            text={t.deadline}
            optional={t.optional}
          />
          <input
            id={id("deadline")}
            name="deadline"
            type="date"
            min={today}
            className={cn(inputClass, "[color-scheme:dark]")}
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          {t.projectType}{" "}
          <span className="font-normal text-muted-foreground">
            ({t.optional})
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={type}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 items-center rounded-full border border-white/12 px-4 text-sm text-foreground/85 transition-colors peer-checked:border-brand-soft peer-checked:bg-brand/15 peer-checked:text-foreground peer-focus-visible:ring-[3px] peer-focus-visible:ring-brand/40 hover:border-white/30">
                {t.projectTypes[type]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
        <fieldset aria-describedby={sizeError ? id("size-error") : undefined}>
          <legend className="mb-2 text-sm font-medium">{t.size}</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["width", "height"] as const).map((dim) => (
              <div key={dim} className="relative">
                <label htmlFor={id(dim)} className="sr-only">
                  {t[dim]} ({t.unit})
                </label>
                <input
                  id={id(dim)}
                  name={dim}
                  inputMode="decimal"
                  placeholder={t[dim]}
                  disabled={unsure}
                  className={cn(inputClass, "pr-12")}
                  aria-invalid={Boolean(sizeError)}
                  onChange={() => {
                    clearError("width");
                    clearError("height");
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {t.unit}
                </span>
              </div>
            ))}
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-foreground/85">
            <input
              type="checkbox"
              name="sizeUnsure"
              checked={unsure}
              onChange={(ev) => {
                setUnsure(ev.target.checked);
                clearError("width");
              }}
              className="size-4 accent-[#006fe0]"
            />
            {t.sizeUnsure}
          </label>
          {errorText(sizeError, "size")}
        </fieldset>

        <div>
          <Label htmlFor={id("quantity")} text={t.quantity} />
          <div className="flex h-12 items-center rounded-lg border border-input bg-white/[0.03]">
            <button
              type="button"
              aria-label={t.decrease}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex size-12 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <MinusIcon className="size-4" />
            </button>
            <input
              id={id("quantity")}
              name="quantity"
              inputMode="numeric"
              value={quantity}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                const v = Number.parseInt(
                  ev.target.value.replace(/\D/g, ""),
                  10,
                );
                setQuantity(Number.isNaN(v) ? 0 : Math.min(v, 999));
                clearError("quantity");
              }}
              className="h-full w-14 bg-transparent text-center text-base outline-none"
              aria-invalid={Boolean(err("quantity"))}
              aria-describedby={
                err("quantity") ? id("quantity-error") : undefined
              }
            />
            <button
              type="button"
              aria-label={t.increase}
              onClick={() => setQuantity((q) => Math.min(500, q + 1))}
              className="flex size-12 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          {errorText(err("quantity"), "quantity")}
        </div>
      </div>

      <div>
        <Label htmlFor={id("description")} text={t.description} />
        <textarea
          id={id("description")}
          name="description"
          rows={5}
          placeholder={t.descriptionPlaceholder}
          className={cn(
            inputClass,
            "h-auto min-h-36 resize-y py-3 leading-relaxed",
          )}
          aria-invalid={Boolean(err("description"))}
          aria-describedby={
            err("description") ? id("description-error") : undefined
          }
          onChange={() => clearError("description")}
        />
        {errorText(err("description"), "description")}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium" id={id("files-label")}>
          {t.files}{" "}
          <span className="font-normal text-muted-foreground">
            ({t.optional})
          </span>
        </p>
        <label
          htmlFor={id("files")}
          onDragOver={(ev) => {
            ev.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-lg border border-dashed p-5 transition-colors",
            dragging
              ? "border-brand-soft bg-brand/10"
              : "border-white/20 hover:border-white/35 hover:bg-white/[0.02]",
            fileError && "border-destructive",
          )}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
            <PaperclipIcon className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block font-medium">{t.filesDrop}</span>
            <span className="mt-0.5 block text-sm text-muted-foreground">
              {t.filesHint}
            </span>
          </span>
          <input
            ref={fileInput}
            id={id("files")}
            type="file"
            name="files"
            multiple
            accept={ACCEPT_ATTR}
            className="sr-only"
            aria-describedby={fileError ? id("files-error") : undefined}
            aria-invalid={Boolean(fileError)}
            onChange={(ev) => addFiles(ev.target.files)}
          />
        </label>
        {files.length > 0 && (
          <ul aria-label={t.filesSelected} className="mt-3 grid gap-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-4 py-2.5 text-sm"
              >
                <FileIcon
                  className="size-4 shrink-0 text-brand-soft"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <span className="text-muted-foreground">
                  {formatSize(file.size)}
                </span>
                <button
                  type="button"
                  aria-label={`${t.remove}: ${file.name}`}
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, j) => j !== i));
                    setFileError(null);
                  }}
                  className="-mr-2 flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                >
                  <XIcon className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && (
          <p id={id("files-error")} className="mt-2 text-sm text-destructive">
            {fileError}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground/85">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 size-4 shrink-0 accent-[#006fe0]"
            aria-invalid={Boolean(err("consent"))}
            aria-describedby={err("consent") ? id("consent-error") : undefined}
            onChange={() => clearError("consent")}
          />
          <span>
            {t.consent}{" "}
            <Link
              href={routes.privacy[locale]}
              className="text-brand-soft underline underline-offset-4"
            >
              {t.privacy}
            </Link>
          </span>
        </label>
        {errorText(err("consent"), "consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary px-8 text-base font-semibold text-white shadow-[0_10px_50px_-12px_rgb(0_127_255/0.9)] transition-colors hover:bg-brand-strong disabled:cursor-wait disabled:opacity-80"
      >
        {pending && <Loader2Icon className="size-5 animate-spin" aria-hidden />}
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}

function Label({
  htmlFor,
  text,
  optional,
}: {
  htmlFor: string;
  text: string;
  optional?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
      {text}
      {optional && (
        <span className="font-normal text-muted-foreground"> ({optional})</span>
      )}
    </label>
  );
}
