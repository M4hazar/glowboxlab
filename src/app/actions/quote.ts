"use server";

import { Resend } from "resend";
import {
  fieldErrors,
  type QuoteErrorKey,
  type QuoteFieldErrors,
  type QuoteInput,
  quoteSchema,
  readQuoteFiles,
  readQuoteForm,
  validateFiles,
} from "@/lib/quote-schema";

export type QuoteState =
  | { status: "idle" }
  | {
      status: "error";
      errors: QuoteFieldErrors;
      fileError?: { key: QuoteErrorKey; file?: string };
    }
  | { status: "failed" }
  | { status: "success"; name: string };

const typeLabels: Record<string, string> = {
  logo: "Logo / business sign",
  gift: "Personal gift",
  gaming: "Gaming / setup",
  other: "Other",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function summary(data: QuoteInput) {
  const size = data.sizeUnsure
    ? "Not sure, wants advice"
    : `${data.width} × ${data.height} cm`;
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "n/a"],
    ["Language", data.locale.toUpperCase()],
    ["Type", data.projectType ? typeLabels[data.projectType] : "n/a"],
    ["Size", size],
    ["Quantity", String(data.quantity)],
    ["Needed by", data.deadline || "n/a"],
  ] as const;
}

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Pole pułapka: boty wypełniają je, ludzie go nie widzą.
  if (formData.get("company")) return { status: "success", name: "" };

  const parsed = quoteSchema.safeParse(readQuoteForm(formData));
  const files = readQuoteFiles(formData);
  const fileError = validateFiles(files) ?? undefined;

  if (!parsed.success || fileError) {
    return {
      status: "error",
      errors: parsed.success ? {} : fieldErrors(parsed.error),
      fileError,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from =
    process.env.QUOTE_FROM_EMAIL ?? "GlowBox Lab <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.QUOTE_DRY_RUN === "1"
    ) {
      // Lokalnie i w testach e2e pokazujemy zapytanie w konsoli zamiast wysyłki.
      console.info(
        "[quote] Email not configured. Inquiry:",
        summary(data),
        files.map((f) => f.name),
      );
      return { status: "success", name: data.name };
    }
    console.error("[quote] RESEND_API_KEY or QUOTE_TO_EMAIL is missing.");
    return { status: "failed" };
  }

  const rows = summary(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#667"><b>${label}</b></td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">
<h2 style="margin:0 0 12px">New quote request</h2>
<table>${rows}</table>
<h3 style="margin:20px 0 6px">Idea</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(data.description)}</p>
<p style="color:#667;margin-top:20px">${files.length} attachment(s). Reply to this email to answer the client.</p>
</div>`;
  const text = `${summary(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")}\n\nIdea:\n${data.description}`;

  try {
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `Quote request: ${data.name}${data.projectType ? ` (${typeLabels[data.projectType]})` : ""}`,
      html,
      text,
      attachments,
    });
    if (error) {
      console.error("[quote] Resend error", error);
      return { status: "failed" };
    }
  } catch (error) {
    console.error("[quote] Sending failed", error);
    return { status: "failed" };
  }

  return { status: "success", name: data.name };
}
