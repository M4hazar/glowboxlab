import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/content/en";
import { SectionHeading } from "./sections";

export function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="section grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading id="faq-title" title={t.title} />
        <Accordion
          type="single"
          collapsible
          className="border-t border-white/10"
        >
          {t.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="border-white/10"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg [&>svg]:size-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pr-8 pb-5 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
