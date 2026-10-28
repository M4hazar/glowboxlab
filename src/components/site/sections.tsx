import type { ReactNode } from "react";
import type { Dictionary } from "@/content/en";
import { type Locale, routes } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { WorkCarousel } from "./work-carousel";

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
    <section
      id="work"
      aria-labelledby="work-title"
      aria-roledescription={t.controls.roledescription}
      className="py-20 sm:py-28"
    >
      <WorkCarousel
        t={t}
        allHref={routes.portfolio[dict.locale as Locale]}
        heading={
          <SectionHeading id="work-title" title={t.title} lead={t.lead} />
        }
      />
    </section>
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
    </Section>
  );
}
