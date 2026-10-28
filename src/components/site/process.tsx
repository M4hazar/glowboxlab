import type { Dictionary } from "@/content/en";
import { ProcessTabs } from "./process-tabs";
import { Section } from "./sections";

export function Process({ dict }: { dict: Dictionary }) {
  const t = dict.process;
  return (
    <Section id="process" title={t.title} lead={t.lead}>
      <ProcessTabs t={t} cta={dict.cta} quoteHref="#quote" />
    </Section>
  );
}
