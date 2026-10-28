import { jakarta } from "@/app/fonts";
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
    <html
      lang={dict.htmlLang}
      className={`${jakarta.variable} dark`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
