import {
  ArrowRightIcon,
  BoxIcon,
  LayersIcon,
  LightbulbIcon,
  PaletteIcon,
  RulerIcon,
  SparklesIcon,
  UploadIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string | string[];
  lead?: string;
  className?: string;
  children?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="display mt-4 text-4xl sm:text-6xl">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {lead && (
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            {lead}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function Work({ dict }: { dict: Dictionary }) {
  const t = dict.work;
  const [first, second, third] = t.items;
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="section">
        <SectionHeading
          id="work-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
          <WorkCard
            item={first}
            className="md:col-span-7"
            ratio="aspect-[16/10] md:aspect-auto md:h-[420px]"
            priority
          />
          <WorkCard
            item={second}
            className="md:col-span-5"
            ratio="aspect-[16/11] md:aspect-auto md:h-[420px]"
          />
          <WorkCard
            item={third}
            className="md:col-span-5"
            ratio="aspect-[4/3] md:aspect-auto md:h-[380px]"
          />
          <Reveal className="md:col-span-7">
            <a
              href="#quote"
              className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 sm:p-10"
            >
              <div
                aria-hidden
                className="glow-blue absolute -right-32 -bottom-40 size-[520px] opacity-60 transition-opacity duration-700 group-hover:opacity-90"
              />
              <SparklesIcon
                className="relative size-7 text-brand"
                aria-hidden
              />
              <div className="relative">
                <p className="display max-w-md text-3xl sm:text-4xl">
                  {t.cta.title}
                </p>
                <p className="mt-4 max-w-md text-muted-foreground">
                  {t.cta.text}
                </p>
                <span className="link-underline mt-8">
                  {t.cta.link}
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{t.note}</p>
      </div>
    </section>
  );
}

function WorkCard({
  item,
  className,
  ratio,
  priority,
}: {
  item: Dictionary["work"]["items"][number];
  className?: string;
  ratio: string;
  priority?: boolean;
}) {
  return (
    <Reveal className={className}>
      <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <div className={cn("relative w-full overflow-hidden", ratio)}>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-3/4 bg-gradient-to-t from-black/95 via-black/60 to-transparent md:block"
          />
        </div>
        {/* Na telefonie podpis pod zdjęciem, żeby nie zasłaniał grafiki */}
        <figcaption className="p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-7">
          <p className="text-xl font-bold tracking-tight">{item.title}</p>
          <p className="mt-1 text-sm text-foreground/75">{item.text}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Personalisation({ dict }: { dict: Dictionary }) {
  const t = dict.personalisation;
  const icons = [UploadIcon, LightbulbIcon];
  return (
    <section
      id="personalisation"
      aria-labelledby="personalisation-title"
      className="relative py-20 sm:py-28"
    >
      <div className="section grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-[2/3] max-w-[440px] overflow-hidden rounded-2xl border border-white/10 lg:mx-0">
            <Image
              src="/images/personalisation.webp"
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            id="personalisation-title"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
          />
          <ul className="mt-12 grid gap-4">
            {t.paths.map((path, i) => {
              const Icon = icons[i];
              return (
                <li key={path.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="flex gap-5 rounded-2xl border border-white/10 bg-surface p-6 sm:p-7">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand-soft ring-1 ring-brand/25">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">
                          {path.title}
                        </h3>
                        <p className="mt-1.5 text-muted-foreground">
                          {path.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <a href="#quote" className="link-underline mt-10">
            {t.link}
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-20 sm:py-28"
    >
      <div className="section">
        <SectionHeading
          id="process-title"
          eyebrow={t.eyebrow}
          title={t.title}
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {t.steps.map((step, i) => (
            <li key={step.title} className="relative bg-background p-8 sm:p-10">
              <Reveal delay={i * 0.1}>
                <span className="font-display text-sm font-bold tracking-[0.2em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Technology({ dict }: { dict: Dictionary }) {
  const t = dict.technology;
  const icons = [BoxIcon, LightbulbIcon, PaletteIcon, RulerIcon];
  return (
    <section
      aria-labelledby="technology-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="section grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <SectionHeading
            id="technology-title"
            eyebrow={t.eyebrow}
            title={t.title}
          />
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.features.map((feature, i) => {
              const Icon = icons[i] ?? LayersIcon;
              return (
                // Reveal jest bezpośrednim dzieckiem <dl>, bo lista dopuszcza tylko jeden poziom <div>.
                <Reveal
                  key={feature.title}
                  delay={i * 0.06}
                  className="border-t border-white/10 pt-6"
                >
                  <dt className="flex items-center gap-3 text-lg font-bold tracking-tight">
                    <Icon className="size-5 text-brand" aria-hidden />
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-muted-foreground">{feature.text}</dd>
                </Reveal>
              );
            })}
          </dl>
        </div>
        <Reveal className="lg:order-1">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/detail.webp"
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Inspiration({ dict }: { dict: Dictionary }) {
  const t = dict.inspiration;
  return (
    <section aria-labelledby="inspiration-title" className="py-20 sm:py-28">
      <div className="section">
        <SectionHeading
          id="inspiration-title"
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-[1.55fr_1fr] md:gap-5">
          {t.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[16/10] md:aspect-auto md:h-[400px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
                  />
                </div>
                <figcaption className="absolute bottom-0 left-0 p-6 text-lg font-bold tracking-tight">
                  {item.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{t.note}</p>
      </div>
    </section>
  );
}
