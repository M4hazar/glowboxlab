import { CheckIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

// Wspólny układ sekcji: ten sam rytm odstępów i jeden styl nagłówków.
export function Section({
  id,
  title,
  lead,
  className,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-28", className)}
    >
      <div className="section">
        <SectionHeading id={`${id}-title`} title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  lead,
}: {
  id: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="display text-4xl sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}

export function Work({ dict }: { dict: Dictionary }) {
  const t = dict.work;
  return (
    <Section id="work" title={t.title} lead={t.lead}>
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {t.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.08}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="text-xl font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-muted-foreground">{item.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted-foreground">{t.note}</p>
    </Section>
  );
}

export function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;
  return (
    <Section id="process" title={t.title}>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
        {t.steps.map((step, i) => (
          <li key={step.title} className="border-t border-white/10 pt-6">
            <Reveal delay={i * 0.08}>
              <span className="text-sm font-semibold text-brand-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-foreground/85">
        {t.facts.map((fact) => (
          <li key={fact} className="flex items-center gap-2.5">
            <CheckIcon className="size-4 text-brand-soft" aria-hidden />
            {fact}
          </li>
        ))}
      </ul>
    </Section>
  );
}
