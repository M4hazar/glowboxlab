import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/content/en";
import { Section } from "./sections";

export function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const items = t.items.map((item, i) => ({ ...item, value: `item-${i}` }));
  const half = Math.ceil(items.length / 2);
  // Dwie kolumny na szerokim ekranie, w kolejności czytania: najpierw lewa, potem prawa.
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <Section id="faq" title={t.title}>
      <Accordion
        type="single"
        collapsible
        className="mt-12 grid border-t border-ink/10 lg:grid-cols-2 lg:gap-x-16 lg:border-t-0"
      >
        {columns.map((column, i) => (
          <div
            key={column[0]?.value}
            data-reveal={i + 1}
            className="lg:border-t lg:border-ink/10"
          >
            {column.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-ink/10 last:border-b"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg [&>svg]:size-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-5 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        ))}
      </Accordion>
    </Section>
  );
}
