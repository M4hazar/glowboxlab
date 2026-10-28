import type { Dictionary } from "./en";

// Treści strony po polsku. Zasada marki: bez długich myślników w tekstach.
export const pl: Dictionary = {
  locale: "pl",
  htmlLang: "pl-PL",
  meta: {
    title: "GlowBox Lab | LED boxy na zamówienie",
    description:
      "Personalizowane lightboxy LED z druku 3D. Twoje logo, napis lub pomysł w formie podświetlanego boxa dla firmy, do pokoju gamingowego albo na prezent. Działamy w Walsall w Wielkiej Brytanii i wysyłamy w całej Europie.",
    ogImage: "/og/glowbox-lab-pl.jpg",
    ogAlt:
      "Lightbox LED GlowBox Lab z sześciokątnym logo podświetlonym na niebiesko",
  },
  a11y: {
    skip: "Przejdź do treści",
    menu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    home: "Strona główna GlowBox Lab",
    language: "Język",
    mainNav: "Główna nawigacja",
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "Portfolio", href: "#work" },
    { label: "Jak zamówić", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#quote" },
  ],
  cta: "Zamów wycenę",
  hero: {
    eyebrow: "Lightboxy LED na zamówienie",
    title: ["Twoje pomysły.", "W nowym świetle."],
    lead: "Każdy drukujemy w 3D od podstaw. Wystarczy logo, napis albo krótki opis.",
    primary: "Zamów wycenę",
    secondary: "Zobacz portfolio",
  },
  viewer: {
    light: "Światło",
    zoomIn: "Przybliż",
    zoomOut: "Oddal",
    rotateLeft: "Obróć w lewo",
    rotateRight: "Obróć w prawo",
    fullscreen: "Pełny ekran",
    exitFullscreen: "Zamknij pełny ekran",
    fallback:
      "Podgląd 3D nie jest dostępny na tym urządzeniu, dlatego pokazujemy lightbox na zdjęciu.",
    canvasLabel:
      "Interaktywny model 3D lightboxa GlowBox Lab. Przeciągnij, aby obrócić, albo użyj przycisków poniżej.",
  },
  work: {
    title: "Portfolio",
    lead: "Kilka form, jakie może przybrać lightbox.",
    controls: {
      roledescription: "karuzela",
      scrollLeft: "Przewiń w lewo",
      scrollRight: "Przewiń w prawo",
      pause: "Zatrzymaj przewijanie",
      play: "Wznów przewijanie",
      previous: "Poprzedni projekt",
      next: "Następny projekt",
      close: "Zamknij",
      counter: "{current} z {total}",
      cta: "Chcę podobny lightbox",
    },
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Czerwono-pomarańczowy lightbox z napisem Devil's, postacią z rogami i płomieniami",
        title: "Wyrazisty charakter",
        text: "Logo z pazurem dla baru, drużyny albo marki.",
        description:
          "Wycięty dokładnie po konturze logo, z płomieniami i postacią. Najlepiej sprawdza się tam, gdzie ma przyciągać wzrok, na przykład za barem albo w pokoju gracza.",
        details: [
          { label: "Kształt", value: "Po konturze logo" },
          {
            label: "Kolory na froncie",
            value: "Czerwony, pomarańczowy, biały",
          },
        ],
      },
      {
        image: "/images/work-heart.webp",
        alt: "Lightbox w kształcie czerwonego serca z imionami Agnieszka i Paweł oraz żółtymi różami",
        title: "Osobisty prezent",
        text: "Imiona i daty na ślub, rocznicę albo urodziny.",
        description:
          "Serce z imionami i różami, zrobione na prezent. Możesz dodać datę, krótki napis albo własną grafikę.",
        details: [
          { label: "Kształt", value: "Serce" },
          { label: "Kolory na froncie", value: "Czerwony, żółty, kremowy" },
        ],
      },
      {
        image: "/images/work-logo.webp",
        alt: "Sześciokątny lightbox z logo GlowBox Lab widziany z boku",
        title: "Twoje logo w świetle",
        text: "Na biurko, do sklepu albo do studia.",
        description:
          "Logo zamknięte w prostej, sześciokątnej obudowie. Taki lightbox dobrze wygląda na ladzie, na półce albo w tle nagrań.",
        details: [
          { label: "Kształt", value: "Sześciokąt" },
          { label: "Kolory na froncie", value: "Niebieski, biały" },
        ],
      },
    ],
  },
  process: {
    title: "Jak zamówić",
    steps: [
      {
        title: "Wyślij pomysł",
        text: "Logo, grafikę albo sam opis. Dodaj wymiary i liczbę sztuk.",
      },
      {
        title: "Dostań wycenę i projekt",
        text: "Odeślemy cenę i wizualizację. Możesz poprosić o zmiany.",
      },
      {
        title: "Robimy lightbox",
        text: "Gdy zaakceptujesz projekt, drukujemy obudowę w 3D i montujemy LED.",
      },
    ],
  },
  faq: {
    title: "Najczęstsze pytania",
    items: [
      {
        q: "Czy mogę przesłać własną grafikę?",
        a: "Tak. Najlepiej plik wektorowy (SVG, PDF, AI lub EPS), ale PNG i JPG w dobrej jakości też się sprawdzą. Sprawdzimy plik i damy znać, jeśli coś trzeba poprawić.",
      },
      {
        q: "Co, jeśli mam tylko pomysł?",
        a: "To wystarczy. Opisz go albo dołącz szkic lub inspirację, a my zaprojektujemy lightbox.",
      },
      {
        q: "Jak duży może być lightbox?",
        a: "Maksymalnie 256 × 256 × 256 mm. Tyle nasza drukarka wykonuje w jednym kawałku.",
      },
      {
        q: "Od czego zależy cena?",
        a: "Od rozmiaru, kształtu, liczby kolorów i liczby sztuk. Cenę podamy po otrzymaniu zapytania.",
      },
      {
        q: "Ile trwa realizacja?",
        a: "Termin ustalamy razem z wyceną. Produkcję zaczynamy po akceptacji projektu.",
      },
      {
        q: "Gdzie wysyłacie?",
        a: "W całej Europie. Możesz też odebrać lightbox osobiście w Walsall.",
      },
    ],
  },
  quote: {
    title: "Zaprojektujmy Twój lightbox",
    lead: "Opisz pomysł i dołącz grafikę, jeśli ją masz. Odpiszemy z ceną i kolejnymi krokami.",
    form: {
      name: "Imię",
      email: "E-mail",
      phone: "Telefon",
      optional: "opcjonalnie",
      size: "Wymiary",
      width: "Szerokość",
      height: "Wysokość",
      depth: "Głębokość",
      unit: "mm",
      sizeHint: "Maksymalny rozmiar: 256 × 256 × 256 mm.",
      sizeUnsure: "Nie wiem jeszcze, pomóżcie dobrać",
      decrease: "Zmniejsz liczbę sztuk",
      increase: "Zwiększ liczbę sztuk",
      quantity: "Liczba sztuk",
      deadline: "Na kiedy",
      description: "Co ma świecić?",
      placeholders: {
        name: "Anna",
        email: "anna@example.com",
        phone: "+44 7700 900000",
        width: "200",
        height: "150",
        depth: "60",
      },
      descriptionPlaceholder:
        "Na przykład: logo naszej kawiarni, około 20 cm szerokości, białe i niebieskie światło, na ścianę za ladą.",
      files: "Dodaj grafikę",
      filesHint:
        "Logo, grafika lub inspiracja. PNG, JPG, SVG, PDF, AI lub EPS. Do 3 plików, łącznie 4 MB.",
      filesDrop: "Upuść pliki tutaj lub kliknij, aby wybrać",
      filesSelected: "Dołączone pliki",
      remove: "Usuń",
      consent:
        "Zgadzam się na wykorzystanie moich danych przez GlowBox Lab w celu obsługi zapytania.",
      privacy: "Polityka prywatności",
      submit: "Wyślij zapytanie o wycenę",
      sending: "Wysyłanie",
      successTitle: "Dziękujemy, {name}!",
      successText:
        "Twoje zapytanie do nas dotarło. Odpiszemy e-mailem z wyceną i propozycją kolejnych kroków.",
      another: "Wyślij kolejne zapytanie",
    },
    errors: {
      name: "Podaj swoje imię.",
      email: "Podaj poprawny adres e-mail.",
      phone: "Podaj poprawny numer telefonu.",
      size: "Podaj wymiary do 256 × 256 × 256 mm albo zaznacz „Nie wiem jeszcze”.",
      quantity: "Podaj liczbę sztuk od 1 do 500.",
      description: "Napisz trochę więcej (co najmniej 20 znaków).",
      consent: "Potwierdź zgodę, aby wysłać zapytanie.",
      fileType: "Ten typ pliku nie jest obsługiwany: {file}",
      fileSize: "Pliki są za duże. Limit to łącznie 4 MB.",
      fileCount: "Możesz dołączyć maksymalnie 3 pliki.",
      summary: "Sprawdź zaznaczone pola.",
      generic:
        "Coś poszło nie tak i zapytanie nie zostało wysłane. Spróbuj ponownie albo napisz do nas na WhatsApp.",
    },
  },
  contact: {
    email: "E-mail",
    call: "Zadzwoń",
    whatsapp: "Napisz na WhatsApp",
    location: "Walsall, Wielka Brytania",
    delivery:
      "Wysyłamy w całej Europie. Możesz też odebrać zamówienie osobiście.",
    socials: "GlowBox Lab w mediach społecznościowych",
    promises: [
      "Odpowiadamy w ciągu 24 godzin",
      "Bezpłatna wycena, bez zobowiązań",
      "Rozmawiamy po polsku i po angielsku",
    ],
  },
  footer: {
    tagline: "Personalizowane lightboxy LED z druku 3D.",
    privacy: "Prywatność",
    cookies: "Cookies",
    terms: "Zasady wyceny",
    rights: "GlowBox Lab",
  },
  legal: {
    back: "Wróć na stronę główną",
    updated: "Ostatnia aktualizacja: 27 października 2026",
  },
  notFound: {
    title: "Ta strona nie istnieje.",
    text: "Link może być nieaktualny albo strona została przeniesiona.",
    back: "Przejdź na stronę główną",
  },
};
