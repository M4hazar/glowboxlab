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
  const anchor = (href: string) =>
    routeKey === "home" ? href : `${home}${href}`;

  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-10">
      <div className="section">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
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
                loading="lazy"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              {t.tagline}
            </p>
          </div>
          <nav aria-label={t.explore}>
            <p className="text-sm font-semibold">{t.explore}</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {dict.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={anchor(item.href)}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={anchor("#quote")}
                  className="transition-colors hover:text-foreground"
                >
                  {dict.cta}
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-sm font-semibold">{t.findUs}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
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
            <p className="mt-4 font-display text-lg font-bold">{site.handle}</p>
            <a
              href={site.phoneHref}
              className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="hairline mt-14" />
        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {t.rights}
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
                href={`${routes.privacy[locale]}#cookies`}
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
