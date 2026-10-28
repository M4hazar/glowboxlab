import {
  BadgeCheckIcon,
  ClockIcon,
  LanguagesIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import type { Dictionary } from "@/content/en";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "./icons";
import { QuoteForm } from "./quote-form";
import { SectionHeading } from "./sections";

const contactLink =
  "inline-flex items-center gap-4 font-medium transition-colors hover:text-brand-soft";
const socialLink =
  "flex h-11 items-center justify-center gap-2.5 rounded-lg border text-sm font-medium transition-colors";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const t = dict.quote;
  const c = dict.contact;
  const socials = [
    { ...site.instagram, Icon: InstagramIcon },
    { ...site.facebook, Icon: FacebookIcon },
    { ...site.tiktok, Icon: TikTokIcon },
    { ...site.youtube, Icon: YouTubeIcon },
  ];
  const promiseIcons = [ClockIcon, BadgeCheckIcon, LanguagesIcon];
  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="border-t border-white/[0.07] py-20 sm:py-28"
    >
      {/* Kolumny mają równą wysokość: zapewnienia lądują na dole, na wysokości końca formularza. */}
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading id="quote-title" title={t.title} lead={t.lead} />

          <ul className="mt-10 flex flex-col gap-5 text-lg">
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

          {/* WhatsApp na całą szerokość, bo to najszybszy kontakt, pod nim reszta po dwa. */}
          <ul
            aria-label={c.socials}
            className="mt-10 mb-10 grid max-w-sm grid-cols-2 gap-2.5"
          >
            <li className="col-span-2">
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener"
                className={cn(
                  socialLink,
                  "border-brand/50 bg-brand/10 hover:border-brand-soft hover:bg-brand/20",
                )}
              >
                <WhatsAppIcon className="size-4" />
                {site.whatsapp.name}
              </a>
            </li>
            {socials.map(({ name, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    socialLink,
                    "border-white/15 hover:border-white/40 hover:text-brand-soft",
                  )}
                >
                  <Icon className="size-4" />
                  {name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid gap-3 border-t border-white/[0.07] pt-8 text-muted-foreground lg:mt-auto">
            {c.promises.map((text, i) => {
              const Icon = promiseIcons[i];
              return (
                <li key={text} className="flex items-center gap-3">
                  <Icon
                    className="size-5 shrink-0 text-brand-soft"
                    aria-hidden
                  />
                  {text}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-5 sm:p-8">
          <QuoteForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
