import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { QuoteForm } from "./quote-form";
import { SectionHeading } from "./sections";

const contactLink =
  "inline-flex items-center gap-4 font-medium transition-colors hover:text-brand-soft";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const t = dict.quote;
  const c = dict.contact;
  const socials = [
    {
      label: site.instagram.name,
      href: site.instagram.href,
      Icon: InstagramIcon,
    },
    { label: site.facebook.name, href: site.facebook.href, Icon: FacebookIcon },
    { label: c.whatsapp, href: site.whatsapp, Icon: WhatsAppIcon },
  ];
  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="border-t border-white/[0.07] py-20 sm:py-28"
    >
      <div className="section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading id="quote-title" title={t.title} lead={t.lead} />

          <div className="flex flex-col gap-8 lg:pt-2">
            <ul className="grid gap-5 text-lg sm:grid-cols-2">
              <li>
                <a href={site.phoneHref} className={contactLink}>
                  <PhoneIcon className="size-5 text-brand-soft" aria-hidden />
                  <span className="sr-only">{c.call}: </span>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={contactLink}>
                  <MailIcon className="size-5 text-brand-soft" aria-hidden />
                  <span className="sr-only">{c.email}: </span>
                  {site.email}
                </a>
              </li>
              <li className="flex gap-4 sm:col-span-2">
                <MapPinIcon
                  className="mt-0.5 size-5 shrink-0 text-brand-soft"
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

            <ul aria-label={c.socials} className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40 hover:text-brand-soft"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-surface p-6 sm:p-10 lg:mt-16">
          <QuoteForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
