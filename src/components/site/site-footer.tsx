import Link from "next/link";
import type { Dictionary } from "@/content/en";
import { type Locale, type RouteKey, routes, site } from "@/lib/site";
import { CurrentYear } from "./current-year";
import { LanguageSwitch } from "./site-header";

export function SiteFooter({
  dict,
  routeKey,
}: {
  dict: Dictionary;
  routeKey: RouteKey;
}) {
  const t = dict.footer;
  const locale = dict.locale as Locale;
  const home = routes.home[locale];

  return (
    <footer className="border-t border-white/[0.07] py-12">
      <div className="section flex flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href={home}
              aria-label={dict.a11y.home}
              className="inline-block"
            >
              {/* biome-ignore lint/performance/noImgElement: logo SVG */}
              <img
                src="/brand/logo.svg"
                alt=""
                width={744}
                height={225}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t.tagline}</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${site.email}`}
                className="text-foreground transition-colors hover:text-brand-soft"
              >
                {site.email}
              </a>
              <span>{dict.contact.location}</span>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {site.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-foreground"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {t.rights}, {site.owner}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link
                href={routes.privacy[locale]}
                className="hover:text-foreground"
              >
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={routes.cookies[locale]}
                className="hover:text-foreground"
              >
                {t.cookies}
              </Link>
            </li>
            <li>
              <Link
                href={routes.terms[locale]}
                className="hover:text-foreground"
              >
                {t.terms}
              </Link>
            </li>
          </ul>
          <LanguageSwitch dict={dict} routeKey={routeKey} />
        </div>
      </div>
    </footer>
  );
}
