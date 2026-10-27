import { jakarta } from "@/app/fonts";
import { en as dict } from "@/content/en";
import "@/app/globals.css";

export { viewport } from "@/lib/metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={dict.htmlLang} className={`${jakarta.variable} dark`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
