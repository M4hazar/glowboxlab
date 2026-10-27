import { PhoneIcon } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/content/en";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { QuoteForm } from "./quote-form";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const t = dict.quote;
  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="glow-blue absolute -bottom-60 -left-60 -z-10 size-[900px] opacity-50"
      />
      <div className="section grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="flex flex-col">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="quote-title" className="display mt-4 text-5xl sm:text-6xl">
            {t.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-lg text-pretty text-muted-foreground">
            {t.lead}
          </p>

          <div className="mt-10">
            <p className="text-sm text-muted-foreground">{t.chat}</p>
            <a
              href={site.phoneHref}
              className="mt-2 flex items-center gap-3 font-display text-3xl font-bold tracking-tight"
            >
              <PhoneIcon className="size-5 text-brand" aria-hidden />
              <span className="sr-only">{t.call}: </span>
              {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex h-12 items-center gap-3 rounded-lg border border-white/15 px-5 font-medium transition-colors hover:border-[#25d366]/60 hover:bg-[#25d366]/10"
            >
              <WhatsAppIcon className="size-5 text-[#25d366]" />
              {t.whatsapp}
            </a>
          </div>

          <div className="relative mt-12 hidden aspect-square w-full max-w-[380px] lg:block">
            <Image
              src="/images/hero-on.webp"
              alt=""
              fill
              sizes="380px"
              className="object-cover [mask-image:radial-gradient(closest-side,black_60%,transparent)]"
            />
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-[0_40px_120px_-50px_rgb(0_127_255/0.45)] backdrop-blur sm:p-10">
          <QuoteForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
