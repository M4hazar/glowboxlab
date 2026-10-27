import { PhoneIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { QuoteForm } from "./quote-form";
import { SectionHeading } from "./sections";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const t = dict.quote;
  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="border-t border-white/[0.07] py-20 sm:py-28"
    >
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading id="quote-title" title={t.title} lead={t.lead} />
          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="text-sm text-muted-foreground">{t.chat}</p>
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 text-2xl font-semibold tracking-tight"
            >
              <PhoneIcon className="size-5 text-brand-soft" aria-hidden />
              <span className="sr-only">{t.call}: </span>
              {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-3 rounded-lg border border-white/15 px-5 font-medium transition-colors hover:border-white/30"
            >
              <WhatsAppIcon className="size-5 text-[#25d366]" />
              {t.whatsapp}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-10">
          <QuoteForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
