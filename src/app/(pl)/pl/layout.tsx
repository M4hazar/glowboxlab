import { jakarta } from "@/app/fonts";
import { Intro, MotionScript } from "@/components/site/motion";
import { ThemeScript } from "@/components/site/theme-script";
import { pl as dict } from "@/content/pl";
import "@/app/globals.css";

export { viewport } from "@/lib/metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Przy przejściu między stronami Next wyłącza płynne przewijanie, żeby nowa strona startowała od góry.
    // Skrypty w <head> dopisują atrybuty motywu i animacji do <html> przed hydratacją, stąd suppressHydrationWarning.
    <html
      lang={dict.htmlLang}
      className={jakarta.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <MotionScript />
      </head>
      <body className="min-h-dvh">
        <Intro />
        {children}
      </body>
    </html>
  );
}
