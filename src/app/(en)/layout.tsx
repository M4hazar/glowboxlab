import { jakarta } from "@/app/fonts";
import { Intro, MotionScript } from "@/components/site/motion";
import { en as dict } from "@/content/en";
import "@/app/globals.css";

export { viewport } from "@/lib/metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Przy przejściu między stronami Next wyłącza płynne przewijanie, żeby nowa strona startowała od góry.
    // Skrypt w <head> dopisuje atrybuty animacji do <html> przed hydratacją, stąd suppressHydrationWarning.
    <html
      lang={dict.htmlLang}
      className={`${jakarta.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <MotionScript />
      </head>
      <body className="min-h-dvh">
        <Intro />
        {children}
      </body>
    </html>
  );
}
