import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/content/en";

export function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="section grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="faq-title" className="display mt-4 text-5xl sm:text-7xl">
            {t.title}
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="border-t border-white/10"
        >
          {t.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="border-white/10"
            >
              <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline sm:text-lg [&>svg]:size-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pr-10 pb-6 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
