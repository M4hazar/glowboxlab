import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { QuoteForm } from "./quote-form";
import { SectionHeading } from "./sections";

const contactLink =
  "inline-flex items-center gap-4 font-medium transition-colors hover:text-brand-soft";
const socialButton =
  "inline-flex h-12 items-center gap-3 rounded-lg border border-white/15 px-5 font-medium transition-colors hover:border-white/30";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const t = dict.quote;
  const c = dict.contact;
  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="border-t border-white/[0.07] py-20 sm:py-28"
    >
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading id="quote-title" title={t.title} lead={t.lead} />

          <ul className="mt-10 flex flex-col gap-5 text-lg">
            <li>
              <a href={`mailto:${site.email}`} className={contactLink}>
                <MailIcon className="size-5 text-brand-soft" aria-hidden />
                <span className="sr-only">{c.email}: </span>
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a href={site.phoneHref} className={contactLink}>
                <PhoneIcon className="size-5 text-brand-soft" aria-hidden />
                <span className="sr-only">{c.call}: </span>
                {site.phone}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener"
                aria-label={c.whatsapp}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#25d366]/60"
              >
                <WhatsAppIcon className="size-5 text-[#25d366]" />
              </a>
            </li>
            <li className="flex gap-4">
              <MapPinIcon
                className="mt-1 size-5 shrink-0 text-brand-soft"
                aria-hidden
              />
              <div>
                <p className="font-medium">{c.location}</p>
                <p className="mt-1 text-base text-muted-foreground">
                  {c.delivery}
                </p>
              </div>
            </li>
          </ul>

          <ul aria-label={c.socials} className="mt-10 flex flex-wrap gap-3">
            <li>
              <a
                href={site.instagram.href}
                target="_blank"
                rel="noopener"
                className={socialButton}
              >
                <InstagramIcon className="size-5" />
                {site.instagram.name}
              </a>
            </li>
            <li>
              <a
                href={site.facebook.href}
                target="_blank"
                rel="noopener"
                className={socialButton}
              >
                <FacebookIcon className="size-5" />
                {site.facebook.name}
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-10">
          <QuoteForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
