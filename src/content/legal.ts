import { type Locale, site } from "@/lib/site";

// Treści prawne napisane prosto. Przed startem warto, by sprawdził je prawnik lub księgowy.
export type LegalDoc = {
  title: string;
  description: string;
  intro: string;
  sections: {
    id?: string;
    heading: string;
    body: string[];
    table?: { head: string[]; rows: string[][] };
  }[];
};

export const privacy: Record<Locale, LegalDoc> = {
  en: {
    title: "Privacy policy",
    description:
      "How GlowBox Lab uses the personal data you send with a quote request or when you contact us.",
    intro:
      "We only collect what we need to answer your inquiry and make your lightbox. This page explains what we collect, why, who else sees it and what your rights are.",
    sections: [
      {
        heading: "Who we are",
        body: [
          `GlowBox Lab is the trading name of ${site.owner}, who makes custom LED lightboxes in ${site.city}, United Kingdom. ${site.owner} is the controller of the personal data described on this page. You can contact us through the quote form, by email at ${site.email}, or by phone and WhatsApp at ${site.phone}.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Quote form: your name, email address, optional phone number, the details of your project (size, quantity, deadline and description) and any files you attach.",
          "Email, phone and WhatsApp: whatever you choose to send us. If you place an order with delivery, also your delivery address.",
          "Visiting the website: our hosting provider processes technical data such as your IP address, browser type and the pages you request, to deliver the website and keep it secure. We do not use analytics or tracking.",
        ],
      },
      {
        heading: "Why we use it and on what legal basis",
        body: [
          "To answer your inquiry, prepare a quote and design and, if you order, to make and deliver your lightbox. The legal basis is taking steps at your request before entering into a contract, and performing that contract (Article 6(1)(b) of the UK GDPR and the EU GDPR).",
          "To keep order and accounting records. The legal basis is our legal obligation under tax law (Article 6(1)(c)).",
          "To run the website securely and protect the quote form from spam and abuse. The legal basis is our legitimate interest in a safe, working website (Article 6(1)(f)).",
          "To prepare a quote we need your name, email address, the quantity, a description of the project and its dimensions (or a tick saying you are not sure about the size). The form cannot be sent without them. Your phone number, deadline and files are optional. We do not sell your data, use it for marketing without asking you first, or make automated decisions about you.",
        ],
      },
      {
        heading: "Who receives it",
        body: [
          "Vercel hosts the website and Resend delivers quote requests to our mailbox by email. Our email provider stores our correspondence, and if you order with delivery, the courier receives your name, address and phone number. They process data only as needed to provide their service.",
          "If you contact us on WhatsApp, Meta processes your messages under its own privacy policy.",
        ],
      },
      {
        heading: "Transfers outside the UK and the EEA",
        body: [
          "Vercel and Resend are based in the United States. Both are certified under the EU-US Data Privacy Framework, which the European Commission recognises as providing adequate protection, and the UK recognises it through its UK Extension. Their data processing terms with us also include the EU Standard Contractual Clauses with the UK Addendum. You can check the certifications at dataprivacyframework.gov, and we will send you a copy of the contractual safeguards if you ask.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "If you do not place an order, we delete your inquiry and files within 12 months. If you do, we keep order records for as long as tax law requires, usually six years. Server logs are kept by the hosting provider only for a short time.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us for a copy of your data, ask us to correct or delete it, to restrict its use or to send it to you in a portable format, and you can object to processing based on our legitimate interest. Just contact us; we reply within one month.",
          "If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office in the UK (ico.org.uk) or to the data protection authority in your EU country, in Poland UODO (uodo.gov.pl).",
        ],
      },
      {
        heading: "Security",
        body: [
          "The website uses an encrypted connection (HTTPS), and your inquiries and files are kept in accounts that only we can access.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        body: [
          "The website uses two cookies, only after you choose a language or a light or dark theme yourself, and no analytics, advertising or tracking cookies. The details are in our cookie policy.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If we change how we use personal data, we will update this page and the date below.",
        ],
      },
    ],
  },
  pl: {
    title: "Polityka prywatności",
    description:
      "Jak GlowBox Lab wykorzystuje dane osobowe przesłane w zapytaniu o wycenę lub w kontakcie z nami.",
    intro:
      "Zbieramy tylko to, czego potrzebujemy, żeby odpowiedzieć na zapytanie i wykonać lightbox. Tutaj wyjaśniamy, jakie to dane, w jakim celu je wykorzystujemy, komu je przekazujemy i jakie masz prawa.",
    sections: [
      {
        heading: "Kim jesteśmy",
        body: [
          `GlowBox Lab to nazwa, pod którą ${site.owner} wykonuje lightboxy LED na zamówienie w ${site.city} w Wielkiej Brytanii. ${site.owner} jest administratorem danych osobowych opisanych na tej stronie. Możesz skontaktować się z nami przez formularz wyceny, e-mailem pod adresem ${site.email} albo telefonicznie i na WhatsApp pod numerem ${site.phone}.`,
        ],
      },
      {
        heading: "Jakie dane zbieramy",
        body: [
          "Formularz wyceny: imię, adres e-mail, opcjonalnie numer telefonu, szczegóły projektu (wymiary, liczbę sztuk, termin i opis) oraz dołączone pliki.",
          "E-mail, telefon i WhatsApp: to, co sam nam przekażesz. Przy zamówieniu z dostawą także adres dostawy.",
          "Odwiedziny strony: firma hostingowa przetwarza dane techniczne, takie jak adres IP, rodzaj przeglądarki i odwiedzane podstrony, żeby wyświetlić stronę i zapewnić jej bezpieczeństwo. Nie używamy narzędzi analitycznych ani śledzących.",
        ],
      },
      {
        heading: "Cele i podstawy prawne",
        body: [
          "Odpowiedź na zapytanie, przygotowanie wyceny i projektu oraz, jeśli złożysz zamówienie, wykonanie i dostarczenie lightboxa. Podstawą jest podjęcie działań na Twoje żądanie przed zawarciem umowy oraz wykonanie umowy (art. 6 ust. 1 lit. b RODO i UK GDPR).",
          "Prowadzenie dokumentacji zamówień i rozliczeń. Podstawą jest obowiązek prawny wynikający z przepisów podatkowych (art. 6 ust. 1 lit. c).",
          "Bezpieczne działanie strony i ochrona formularza przed spamem i nadużyciami. Podstawą jest nasz prawnie uzasadniony interes, czyli bezpieczna i sprawna strona (art. 6 ust. 1 lit. f).",
          "Do przygotowania wyceny potrzebujemy imienia, adresu e-mail, liczby sztuk, opisu projektu i wymiarów (albo zaznaczenia, że ich nie znasz). Bez tych danych formularza nie da się wysłać. Numer telefonu, termin i pliki są dobrowolne. Nie sprzedajemy danych, nie wykorzystujemy ich do marketingu bez Twojej zgody i nie podejmujemy wobec Ciebie zautomatyzowanych decyzji.",
        ],
      },
      {
        heading: "Komu przekazujemy dane",
        body: [
          "Vercel hostuje stronę, a Resend dostarcza zapytania z formularza na naszą skrzynkę e-mail. Nasz dostawca poczty przechowuje korespondencję, a przy zamówieniu z dostawą kurier otrzymuje imię i nazwisko, adres oraz numer telefonu. Te firmy przetwarzają dane tylko w zakresie potrzebnym do świadczenia usługi.",
          "Jeśli piszesz do nas na WhatsApp, wiadomości przetwarza Meta zgodnie z własną polityką prywatności.",
        ],
      },
      {
        heading: "Przekazywanie danych poza Wielką Brytanię i EOG",
        body: [
          "Vercel i Resend mają siedzibę w Stanach Zjednoczonych. Obie firmy mają certyfikat EU-US Data Privacy Framework, który Komisja Europejska uznaje za zapewniający odpowiedni poziom ochrony, a Wielka Brytania uznaje go w ramach brytyjskiego rozszerzenia. Umowy powierzenia danych z tymi firmami zawierają też standardowe klauzule umowne UE z brytyjskim aneksem. Certyfikaty sprawdzisz na dataprivacyframework.gov, a kopię zabezpieczeń umownych wyślemy Ci na prośbę.",
        ],
      },
      {
        heading: "Jak długo przechowujemy dane",
        body: [
          "Jeśli nie złożysz zamówienia, usuwamy zapytanie i pliki w ciągu 12 miesięcy. Jeśli złożysz, przechowujemy dokumentację zamówienia tak długo, jak wymagają tego przepisy podatkowe, zwykle sześć lat. Logi serwera firma hostingowa przechowuje tylko przez krótki czas.",
        ],
      },
      {
        heading: "Twoje prawa",
        body: [
          "Możesz poprosić o kopię swoich danych, ich sprostowanie, usunięcie lub ograniczenie przetwarzania, a także o przekazanie ich w formacie umożliwiającym przeniesienie. Możesz też wnieść sprzeciw wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie. Wystarczy się z nami skontaktować; odpowiadamy w ciągu miesiąca.",
          "Jeśli uważasz, że przetwarzamy dane niezgodnie z prawem, możesz złożyć skargę do brytyjskiego ICO (ico.org.uk) lub do organu ochrony danych w swoim kraju UE, w Polsce do Prezesa UODO (uodo.gov.pl).",
        ],
      },
      {
        heading: "Bezpieczeństwo",
        body: [
          "Strona korzysta z szyfrowanego połączenia (HTTPS), a zapytania i pliki przechowujemy na kontach, do których dostęp mamy tylko my.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        body: [
          "Strona używa dwóch plików cookie, i to dopiero wtedy, gdy sam wybierzesz język albo jasny lub ciemny motyw. Nie używamy cookies analitycznych, reklamowych ani śledzących. Szczegóły znajdziesz w polityce cookies.",
        ],
      },
      {
        heading: "Zmiany polityki",
        body: [
          "Jeśli zmienimy sposób wykorzystywania danych osobowych, zaktualizujemy tę stronę i datę poniżej.",
        ],
      },
    ],
  },
};

export const cookies: Record<Locale, LegalDoc> = {
  en: {
    title: "Cookie policy",
    description:
      "Which cookies the GlowBox Lab website uses: two, to remember the language and the theme you choose.",
    intro:
      "We keep cookies to a minimum: the website uses two cookies, and only after you choose a language or a theme yourself.",
    sections: [
      {
        heading: "What cookies are",
        body: [
          "Cookies are small text files that a website saves in your browser. This policy also covers similar technologies, such as storage in your browser.",
        ],
      },
      {
        heading: "What we use",
        body: [],
        table: {
          head: ["Name", "Purpose", "Duration", "Type"],
          rows: [
            [
              "NEXT_LOCALE",
              "Remembers the language you chose with the EN and PL switch, so the website opens in that language next time.",
              "12 months",
              "Cookie, functional",
            ],
            [
              "theme",
              "Remembers the light or dark theme you chose with the theme switch. Without it the website follows the setting of your device.",
              "12 months",
              "Cookie, functional",
            ],
          ],
        },
      },
      {
        heading: "What we do not use",
        body: [
          "We do not use analytics, advertising or social media cookies, and the website does not load content from other services. Links to Instagram, Facebook, TikTok, YouTube and WhatsApp only take you to those services, which have their own cookie policies.",
        ],
      },
      {
        heading: "Consent",
        body: [
          "These cookies are set only when you use the language or theme switch, and without them the website could not keep the choice you asked for, so the law does not require your consent and we do not show a cookie banner. If we ever add other cookies, we will ask for your consent first.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can delete or block cookies in your browser settings. Without these cookies the website simply chooses the language based on your browser settings and the theme based on your device settings.",
        ],
      },
    ],
  },
  pl: {
    title: "Polityka cookies",
    description:
      "Jakich plików cookies używa strona GlowBox Lab: dwóch, które zapamiętują wybrany język i motyw.",
    intro:
      "Ograniczamy cookies do minimum: strona używa dwóch plików cookie, i to dopiero wtedy, gdy sam wybierzesz język albo motyw.",
    sections: [
      {
        heading: "Czym są cookies",
        body: [
          "Cookies to małe pliki tekstowe, które strona zapisuje w przeglądarce. Ta polityka obejmuje też podobne technologie, takie jak pamięć przeglądarki.",
        ],
      },
      {
        heading: "Czego używamy",
        body: [],
        table: {
          head: ["Nazwa", "Cel", "Czas przechowywania", "Rodzaj"],
          rows: [
            [
              "NEXT_LOCALE",
              "Zapamiętuje język wybrany przełącznikiem EN i PL, żeby przy kolejnej wizycie strona otworzyła się w tym języku.",
              "12 miesięcy",
              "Cookie, funkcjonalne",
            ],
            [
              "theme",
              "Zapamiętuje jasny lub ciemny motyw wybrany przełącznikiem motywu. Bez niego strona wygląda tak, jak ustawiono w urządzeniu.",
              "12 miesięcy",
              "Cookie, funkcjonalne",
            ],
          ],
        },
      },
      {
        heading: "Czego nie używamy",
        body: [
          "Nie używamy cookies analitycznych, reklamowych ani mediów społecznościowych, a strona nie wczytuje treści z innych serwisów. Linki do Instagrama, Facebooka, TikToka, YouTube i WhatsApp tylko przenoszą do tych serwisów, które mają własne polityki cookies.",
        ],
      },
      {
        heading: "Zgoda",
        body: [
          "Te pliki zapisują się tylko wtedy, gdy użyjesz przełącznika języka lub motywu, a bez nich strona nie mogłaby zachować Twojego wyboru, dlatego przepisy nie wymagają zgody i nie wyświetlamy banera cookies. Jeśli kiedyś dodamy inne cookies, najpierw poprosimy o zgodę.",
        ],
      },
      {
        heading: "Zarządzanie cookies",
        body: [
          "Cookies możesz usunąć lub zablokować w ustawieniach przeglądarki. Bez tych plików strona po prostu wybiera język na podstawie ustawień przeglądarki, a motyw na podstawie ustawień urządzenia.",
        ],
      },
    ],
  },
};

export const terms: Record<Locale, LegalDoc> = {
  en: {
    title: "Quote and order terms",
    description:
      "How quotes and orders for custom GlowBox Lab lightboxes work: approval, payment, delivery and your rights.",
    intro:
      "Every lightbox is made to order, so every quote is individual. These terms explain how quotes and orders work and what your rights are.",
    sections: [
      {
        heading: "Seller",
        body: [
          `GlowBox Lab is the trading name of ${site.owner}, ${site.city}, United Kingdom. Contact: ${site.email}, phone and WhatsApp ${site.phone}.`,
          `Please send complaints and any other notices about your order by email to ${site.email}.`,
        ],
      },
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
        heading: "Design, approval and order",
        body: [
          "With the quote you receive a visual of your lightbox. You can ask for changes before you approve it. The order is placed when you approve the design and the quote in writing, by email or WhatsApp, and production starts only after that.",
        ],
      },
      {
        heading: "Price and payment",
        body: [
          "The quote states the total price of the lightbox and, if you choose delivery, the delivery cost. The payment method and due date are given in the quote as well.",
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
          `We ship across Europe, or you can collect your order in person in ${site.city}. We agree the production time and the delivery method together with the quote, because they depend on the project and on where you are.`,
          "Deliveries outside the United Kingdom may be subject to import VAT or customs duty in the destination country. This is confirmed together with the quote.",
        ],
      },
      {
        heading: "Right to cancel",
        body: [
          "Every lightbox is made to your specification, so the 14-day right to cancel a distance contract does not apply (in the UK under regulation 28(1)(b) of the Consumer Contracts Regulations 2013, in the EU under the rules implementing Article 16(c) of Directive 2011/83/EU). Until you approve the design and the quote you can withdraw at any time, at no cost.",
        ],
      },
      {
        heading: "Look and finish",
        body: [
          "Lightboxes are made by 3D printing, layer by layer. Fine layer lines, small surface irregularities and slight differences in shade between material batches, or compared with colours on screen, are a natural feature of this technology and not a defect. We make every lightbox according to the approved design: its size, shape, colours and graphic.",
        ],
      },
      {
        heading: "Damaged or faulty lightbox",
        body: [
          "If your lightbox arrives damaged, does not work or is not as agreed, contact us as soon as possible, ideally with photos. You keep all your statutory rights as a consumer, including repair, replacement or a refund under the Consumer Rights Act 2015 in the UK or the consumer law of your EU country. These terms do not limit them.",
        ],
      },
    ],
  },
  pl: {
    title: "Zasady wyceny i zamówień",
    description:
      "Jak wyglądają wycena i zamówienie lightboxa GlowBox Lab: akceptacja, płatność, dostawa i Twoje prawa.",
    intro:
      "Każdy lightbox powstaje na zamówienie, dlatego każda wycena jest indywidualna. Tutaj wyjaśniamy, jak przebiegają wycena i zamówienie oraz jakie masz prawa.",
    sections: [
      {
        heading: "Sprzedawca",
        body: [
          `GlowBox Lab to nazwa, pod którą działa ${site.owner}, ${site.city}, Wielka Brytania. Kontakt: ${site.email}, telefon i WhatsApp ${site.phone}.`,
          `Reklamacje i inne zgłoszenia dotyczące zamówienia przesyłaj e-mailem na adres ${site.email}.`,
        ],
      },
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
        heading: "Projekt, akceptacja i zamówienie",
        body: [
          "Razem z wyceną otrzymujesz wizualizację lightboxa. Przed akceptacją możesz poprosić o zmiany. Zamówienie zostaje złożone, gdy zaakceptujesz projekt i wycenę na piśmie, e-mailem lub na WhatsApp, i dopiero wtedy zaczynamy produkcję.",
        ],
      },
      {
        heading: "Cena i płatność",
        body: [
          "Wycena podaje łączną cenę lightboxa oraz, jeśli wybierzesz dostawę, jej koszt. Sposób i termin płatności również podajemy w wycenie.",
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
          `Wysyłamy w całej Europie, a zamówienie możesz też odebrać osobiście w ${site.city}. Czas realizacji i sposób dostawy ustalamy razem z wyceną, bo zależą od projektu i od tego, gdzie jesteś.`,
          "Przy dostawie poza Wielką Brytanię kraj odbiorcy może naliczyć VAT importowy lub cło. Potwierdzamy to razem z wyceną.",
        ],
      },
      {
        heading: "Odstąpienie od umowy",
        body: [
          "Każdy lightbox jest wykonywany według Twojej specyfikacji, dlatego 14-dniowe prawo odstąpienia od umowy zawartej na odległość nie przysługuje (w Polsce na podstawie art. 38 ust. 1 pkt 3 ustawy o prawach konsumenta, w Wielkiej Brytanii na podstawie regulation 28(1)(b) Consumer Contracts Regulations 2013). Do czasu akceptacji projektu i wyceny możesz zrezygnować w każdej chwili, bez kosztów.",
        ],
      },
      {
        heading: "Wygląd i wykończenie",
        body: [
          "Lightboxy powstają w technologii druku 3D, warstwa po warstwie. Delikatne linie warstw, drobne nierówności powierzchni i niewielkie różnice odcienia między partiami materiału lub w porównaniu z kolorami na ekranie są naturalną cechą tej technologii, a nie wadą. Każdy lightbox wykonujemy zgodnie z zatwierdzonym projektem: jego wymiarami, kształtem, kolorami i grafiką.",
        ],
      },
      {
        heading: "Uszkodzony lub wadliwy lightbox",
        body: [
          "Jeśli lightbox dotrze uszkodzony, nie działa lub jest niezgodny z ustaleniami, skontaktuj się z nami jak najszybciej, najlepiej ze zdjęciami. Zachowujesz wszystkie ustawowe prawa konsumenta, w tym do naprawy, wymiany lub zwrotu pieniędzy, wynikające z brytyjskiego Consumer Rights Act 2015 lub prawa konsumenckiego Twojego kraju UE. Te zasady ich nie ograniczają.",
        ],
      },
    ],
  },
};
