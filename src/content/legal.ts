import type { Locale } from "@/lib/site";

// Treści prawne napisane prosto. Przed startem warto, by sprawdził je prawnik lub księgowy.
export type LegalDoc = {
  title: string;
  description: string;
  intro: string;
  sections: { id?: string; heading: string; body: string[] }[];
};

export const privacy: Record<Locale, LegalDoc> = {
  en: {
    title: "Privacy policy",
    description:
      "How GlowBox Lab uses the details you send with a quote request.",
    intro:
      "We only collect what we need to answer your inquiry and make your lightbox. This page explains what that is and what your rights are.",
    sections: [
      {
        heading: "Who we are",
        body: [
          "GlowBox Lab makes custom LED lightboxes and is based in the United Kingdom. You can contact us through the quote form, by phone or on WhatsApp at +44 7749 789776.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "When you send a quote request we receive your name, email address, optional phone number, the details of your project (type, size, quantity, deadline and description) and any files you attach.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "We use these details only to prepare your quote, discuss the design and, if you place an order, to make and deliver it. The legal basis is taking steps at your request before entering into a contract, and your consent given in the form.",
          "We do not sell your data and we do not use it for marketing without asking you first.",
        ],
      },
      {
        heading: "Who processes it",
        body: [
          "The website is hosted by Vercel and quote requests are delivered to us by email through Resend. These providers process data on our behalf and only as needed to provide their service.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "If you do not place an order, we delete your inquiry and files within 12 months. If you do, we keep order records for as long as the law requires for accounting purposes.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us for a copy of your data, ask us to correct or delete it, or withdraw your consent at any time. Just contact us. If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ico.org.uk) or, in Poland, to UODO (uodo.gov.pl).",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        body: [
          "This website does not use analytics, advertising or tracking cookies. Your language choice and the page itself work without them, so there is no cookie banner.",
        ],
      },
    ],
  },
  pl: {
    title: "Polityka prywatności",
    description:
      "Jak GlowBox Lab wykorzystuje dane przesłane w zapytaniu o wycenę.",
    intro:
      "Zbieramy tylko to, czego potrzebujemy, żeby odpowiedzieć na Twoje zapytanie i wykonać lightbox. Tutaj wyjaśniamy, co to za dane i jakie masz prawa.",
    sections: [
      {
        heading: "Kim jesteśmy",
        body: [
          "GlowBox Lab wykonuje lightboxy LED na zamówienie i działa w Wielkiej Brytanii. Możesz skontaktować się z nami przez formularz wyceny, telefonicznie lub na WhatsApp pod numerem +44 7749 789776.",
        ],
      },
      {
        heading: "Jakie dane zbieramy",
        body: [
          "Wysyłając zapytanie, przekazujesz nam imię, adres e-mail, opcjonalnie numer telefonu, szczegóły projektu (rodzaj, wymiary, liczbę sztuk, termin i opis) oraz dołączone pliki.",
        ],
      },
      {
        heading: "W jakim celu",
        body: [
          "Wykorzystujemy te dane wyłącznie do przygotowania wyceny, uzgodnienia projektu oraz, jeśli złożysz zamówienie, do jego wykonania i dostarczenia. Podstawą jest podjęcie działań na Twoje żądanie przed zawarciem umowy oraz zgoda wyrażona w formularzu.",
          "Nie sprzedajemy danych i nie wykorzystujemy ich do marketingu bez Twojej zgody.",
        ],
      },
      {
        heading: "Kto przetwarza dane",
        body: [
          "Strona jest hostowana przez Vercel, a zapytania trafiają do nas e-mailem za pośrednictwem usługi Resend. Te firmy przetwarzają dane w naszym imieniu i tylko w zakresie potrzebnym do świadczenia usługi.",
        ],
      },
      {
        heading: "Jak długo przechowujemy dane",
        body: [
          "Jeśli nie złożysz zamówienia, usuwamy zapytanie i pliki w ciągu 12 miesięcy. Jeśli złożysz, przechowujemy dokumentację zamówienia tak długo, jak wymagają tego przepisy księgowe.",
        ],
      },
      {
        heading: "Twoje prawa",
        body: [
          "Możesz poprosić o kopię swoich danych, ich poprawienie lub usunięcie, a także w każdej chwili wycofać zgodę. Wystarczy się z nami skontaktować. Możesz też złożyć skargę do brytyjskiego ICO (ico.org.uk) lub do polskiego UODO (uodo.gov.pl).",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        body: [
          "Strona nie używa plików cookies analitycznych, reklamowych ani śledzących. Wybór języka i działanie strony ich nie wymagają, dlatego nie wyświetlamy banera cookies.",
        ],
      },
    ],
  },
};

export const terms: Record<Locale, LegalDoc> = {
  en: {
    title: "Quote terms",
    description: "How quotes for custom GlowBox Lab lightboxes work.",
    intro:
      "Every lightbox is made to order, so every quote is individual. Here is how the process works.",
    sections: [
      {
        heading: "Sending an inquiry",
        body: [
          "Sending the quote form does not commit you to anything. It simply gives us what we need to prepare a price and a design proposal.",
        ],
      },
      {
        heading: "What the price depends on",
        body: [
          "The quote depends mainly on the size, the complexity of the shape, the number of print colours on the front (up to four) and the quantity. Extra options, such as adjustable LED colour, are listed separately.",
        ],
      },
      {
        heading: "Design and approval",
        body: [
          "With the quote you receive a visual of your lightbox. You can ask for changes before you approve it. Production starts only after you approve the design.",
        ],
      },
      {
        heading: "Your files",
        body: [
          "By sending a graphic you confirm that you have the right to use it. We use your files only to make your order.",
        ],
      },
      {
        heading: "Lead time and delivery",
        body: [
          "We agree the production time and the delivery method together with the quote, because they depend on the project and on where you are.",
        ],
      },
    ],
  },
  pl: {
    title: "Zasady wyceny",
    description: "Jak wygląda wycena lightboxów GlowBox Lab na zamówienie.",
    intro:
      "Każdy lightbox powstaje na zamówienie, dlatego każda wycena jest indywidualna. Oto jak przebiega cały proces.",
    sections: [
      {
        heading: "Wysłanie zapytania",
        body: [
          "Wysłanie formularza do niczego nie zobowiązuje. Dzięki niemu mamy wszystko, czego potrzebujemy, żeby przygotować cenę i propozycję projektu.",
        ],
      },
      {
        heading: "Od czego zależy cena",
        body: [
          "Wycena zależy głównie od rozmiaru, złożoności kształtu, liczby kolorów druku na froncie (maksymalnie cztery) i liczby sztuk. Dodatkowe opcje, na przykład regulację koloru LED, podajemy osobno.",
        ],
      },
      {
        heading: "Projekt i akceptacja",
        body: [
          "Razem z wyceną otrzymujesz wizualizację lightboxa. Przed akceptacją możesz poprosić o zmiany. Produkcję zaczynamy dopiero po akceptacji projektu.",
        ],
      },
      {
        heading: "Twoje pliki",
        body: [
          "Wysyłając grafikę, potwierdzasz, że masz prawo do jej wykorzystania. Używamy Twoich plików wyłącznie do realizacji zamówienia.",
        ],
      },
      {
        heading: "Termin i dostawa",
        body: [
          "Czas realizacji i sposób dostawy ustalamy razem z wyceną, bo zależą od projektu i od tego, gdzie jesteś.",
        ],
      },
    ],
  },
};
