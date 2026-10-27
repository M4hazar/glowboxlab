import {
  GaugeIcon,
  PaletteIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: PaletteIcon,
    title: "Design system",
    text: "Tailwind CSS v4 i komponenty shadcn/ui z motywem jasnym i ciemnym.",
  },
  {
    icon: GaugeIcon,
    title: "Wydajność",
    text: "Next.js 16 z Turbopack, React Server Components i Lighthouse CI.",
  },
  {
    icon: WorkflowIcon,
    title: "Automatyzacja",
    text: "Biome, Vitest, Playwright i GitHub Actions przy każdym pushu.",
  },
  {
    icon: SparklesIcon,
    title: "Gotowe na AI",
    text: "AGENTS.md i serwery MCP dla Claude Code, Cursora i Copilota.",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <a href="/" className="font-semibold tracking-tight">
            GlowBox Lab
          </a>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="#kontakt">Kontakt</a>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
        {/* Hero bez animacji wejścia: to element LCP. */}
        <section className="py-20 text-center sm:py-28">
          <Badge variant="secondary" className="mb-6">
            Starter 2026
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Profesjonalne strony,{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              szybciej
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            Zintegrowany zestaw narzędzi do projektowania, budowy i testowania
            nowoczesnych stron internetowych.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg">
              <a href="#funkcje">Zobacz funkcje</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#kontakt">Napisz do nas</a>
            </Button>
          </div>
        </section>

        <section id="funkcje" className="grid gap-4 pb-20 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <f.icon className="mb-2 size-6 text-violet-500" aria-hidden />
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.text}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </section>

        <section id="kontakt" className="mx-auto max-w-lg pb-24">
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
              <CardDescription>
                Formularz z walidacją Zod i Server Action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © GlowBox Lab
      </footer>
    </>
  );
}
