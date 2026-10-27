import type { Dictionary } from "./en";

// Treści strony po polsku. Zasada marki: bez długich myślników w tekstach.
export const pl: Dictionary = {
  locale: "pl",
  htmlLang: "pl-PL",
  meta: {
    title: "GlowBox Lab | LED boxy na zamówienie",
    description:
      "Personalizowane lightboxy LED z druku 3D. Twoje logo, napis lub pomysł w formie podświetlanego boxa dla firmy, do pokoju gamingowego albo na prezent. Działamy w Wielkiej Brytanii i w Polsce.",
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
    { label: "Realizacje", href: "#work" },
    { label: "Personalizacja", href: "#personalisation" },
    { label: "Jak to działa", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Wycena",
  hero: {
    eyebrow: "Lightboxy LED na zamówienie",
    title: ["Twoje pomysły.", "W nowym świetle."],
    lead: "Personalizowane lightboxy LED z druku 3D. Twoje logo, napis lub pomysł w formie, która przyciąga uwagę.",
    primary: "Zaprojektuj swój lightbox",
    secondary: "Zobacz realizacje",
    points: [
      "Projekt do akceptacji przed produkcją",
      "Do 4 kolorów druku",
      "Wielka Brytania i Polska",
    ],
    imageAlt:
      "Sześciokątny lightbox GlowBox Lab z białym i niebieskim podświetlonym logo na ciemnym tle",
    scroll: "Poznaj GlowBox Lab",
  },
  viewer: {
    eyebrow: "Podgląd 3D",
    title: ["Obróć. Przybliż.", "Włącz światło."],
    lead: "Poznaj lightbox GlowBox Lab z każdej strony. To nasz model z logo, zbudowany z tego samego pliku, który drukujemy.",
    label: "GlowBox Lab / model pokazowy",
    dragHint: "Przeciągnij, aby obrócić",
    light: "Światło",
    on: "ON",
    off: "OFF",
    zoomIn: "Przybliż",
    zoomOut: "Oddal",
    rotateLeft: "Obróć w lewo",
    rotateRight: "Obróć w prawo",
    reset: "Widok początkowy",
    fullscreen: "Pełny ekran",
    exitFullscreen: "Zamknij pełny ekran",
    ledColour: "Kolor LED",
    colours: { white: "Białe", blue: "Niebieskie" },
    note: "Model pokazowy, 16 × 17 cm, głębokość 3,2 cm. Dostępne kolory światła zależą od modelu.",
    loading: "Ładowanie modelu 3D",
    fallback:
      "Podgląd 3D nie jest dostępny na tym urządzeniu, dlatego pokazujemy lightbox na zdjęciu.",
    canvasLabel:
      "Interaktywny model 3D lightboxa GlowBox Lab. Użyj przycisków poniżej, aby obrócić, przybliżyć i włączyć światło.",
  },
  work: {
    eyebrow: "Realizacje",
    title: "Projekty z charakterem.",
    lead: "Każdy lightbox zaczyna się od czyjegoś pomysłu. Oto kilka form, jakie przybrały.",
    note: "Przykładowe wizualizacje.",
    cta: {
      title: "Twój pomysł może być następny.",
      text: "Prześlij logo, imię albo luźną myśl. Zamienimy je w światło.",
      link: "Zacznij swój projekt",
    },
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Czerwono-pomarańczowy lightbox z napisem Devil's, postacią z rogami i płomieniami",
        tag: "Szyld i marka",
        title: "Wyrazisty charakter",
        text: "Logo z pazurem dla baru, drużyny albo marki.",
      },
      {
        image: "/images/work-heart.webp",
        alt: "Lightbox w kształcie czerwonego serca z imionami Agnieszka i Paweł oraz żółtymi różami",
        tag: "Prezent",
        title: "Osobisty prezent",
        text: "Imiona, daty i detale na ślub, rocznicę albo urodziny.",
      },
      {
        image: "/images/work-logo.webp",
        alt: "Sześciokątny lightbox z logo GlowBox Lab widziany z boku",
        tag: "Logo",
        title: "Twoje logo w świetle",
        text: "Czysta forma i równe podświetlenie na biurko, do sklepu lub studia.",
      },
    ],
  },
  personalisation: {
    eyebrow: "Personalizacja",
    title: ["Twój pomysł.", "Nasz projekt."],
    lead: "Niezależnie od tego, czy masz gotowy plik, czy tylko luźną myśl, zajmiemy się resztą.",
    imageAlt:
      "Wydrukowany projekt logo GlowBox Lab obok gotowego, podświetlonego lightboxa",
    paths: [
      {
        title: "Masz gotową grafikę?",
        text: "Prześlij logo, grafikę lub napis. Sprawdzimy plik i przygotujemy go do druku 3D.",
      },
      {
        title: "Masz tylko pomysł?",
        text: "Opisz go w kilku słowach albo dołącz szkic lub inspirację. Zaprojektujemy lightbox na Twoją prośbę.",
      },
    ],
    link: "Opowiedz nam o swoim projekcie",
  },
  process: {
    eyebrow: "Jak to działa",
    title: "Od pomysłu do światła.",
    steps: [
      {
        title: "Opisz pomysł",
        text: "Prześlij grafikę albo napisz, czego potrzebujesz. Podaj wymiary i liczbę sztuk.",
      },
      {
        title: "Otrzymaj wycenę i projekt",
        text: "Przygotujemy cenę i wizualizację lightboxa. Możesz poprosić o zmiany.",
      },
      {
        title: "Stworzymy lightbox",
        text: "Po akceptacji projektu drukujemy i składamy Twój lightbox.",
      },
    ],
  },
  technology: {
    eyebrow: "Technologia i jakość",
    title: ["Przemyślana forma.", "Światło z charakterem."],
    imageAlt:
      "Zbliżenie krawędzi lightboxa z czarną, fakturowaną ramą z druku 3D i niebieskim światłem",
    features: [
      {
        title: "Druk 3D",
        text: "Obudowa i detale są dopasowane do Twojego projektu, a nie do szablonu.",
      },
      {
        title: "Podświetlenie LED",
        text: "Światło wydobywa kształt i kolory frontu.",
      },
      {
        title: "Do 4 kolorów",
        text: "Front drukujemy w maksymalnie czterech kolorach, dobranych razem z Tobą.",
      },
      {
        title: "Wymiary na miarę",
        text: "Rozmiar i proporcje wynikają z Twojego projektu.",
      },
    ],
  },
  inspiration: {
    eyebrow: "Inspiracje",
    title: "Znajdź dla niego swoje miejsce.",
    lead: "W domu, w biurze, przy stanowisku gamingowym lub w przestrzeni Twojej marki.",
    note: "Przykładowe aranżacje.",
    items: [
      {
        image: "/images/inspiration-office.webp",
        alt: "Podświetlony sześciokątny lightbox na biurku obok monitora i rośliny",
        title: "Biuro i gaming",
      },
      {
        image: "/images/inspiration-home.webp",
        alt: "Podświetlony sześciokątny lightbox na drewnianej półce z książkami i rośliną",
        title: "Dom i przestrzenie komercyjne",
      },
    ],
  },
  faq: {
    eyebrow: "Dobrze wiedzieć",
    title: "Masz pytania?",
    items: [
      {
        q: "Czy mogę przesłać własną grafikę?",
        a: "Tak. Możesz wysłać logo, napis lub inspirację. Sprawdzimy, jak przygotować je do druku 3D, i damy znać, jeśli coś wymaga poprawy.",
      },
      {
        q: "Co, jeśli mam tylko pomysł?",
        a: "To wystarczy, żeby zacząć. Opisz go, dołącz szkic lub zdjęcia inspiracji, a my zaprojektujemy lightbox.",
      },
      {
        q: "Od czego zależy wycena?",
        a: "Głównie od rozmiaru, złożoności kształtu, liczby kolorów druku i liczby sztuk. Indywidualną wycenę otrzymasz po wysłaniu zapytania.",
      },
      {
        q: "Jakie pliki są najlepsze?",
        a: "Najczystszy efekt dają pliki wektorowe (SVG, PDF, AI lub EPS). Sprawdzą się też PNG i JPG w wysokiej rozdzielczości.",
      },
      {
        q: "Czy można zmieniać kolor światła?",
        a: "To zależy od modelu. Niektóre lightboxy możemy wykonać z regulacją koloru LED, więc wspomnij o tym w zapytaniu.",
      },
      {
        q: "Jak ustalamy termin realizacji?",
        a: "Termin ustalamy razem z wyceną. Produkcję zaczynamy po akceptacji projektu.",
      },
      {
        q: "Czy pracujecie z klientami z Polski?",
        a: "Tak. Działamy w Wielkiej Brytanii i pracujemy z klientami z Wielkiej Brytanii i Polski, po polsku i po angielsku.",
      },
    ],
  },
  quote: {
    eyebrow: "Zacznijmy od pomysłu",
    title: ["Zaprojektujmy", "Twój lightbox."],
    lead: "Opisz, co chcesz stworzyć, i dołącz grafikę. Odpiszemy z wyceną i propozycją kolejnych kroków.",
    chat: "Wolisz porozmawiać?",
    whatsapp: "Napisz na WhatsApp",
    call: "Zadzwoń",
    form: {
      name: "Imię",
      email: "E-mail",
      phone: "Telefon",
      optional: "opcjonalnie",
      projectType: "Do czego ma służyć?",
      projectTypes: {
        logo: "Logo lub szyld firmy",
        gift: "Prezent",
        gaming: "Gaming lub stanowisko",
        other: "Coś innego",
      },
      size: "Wymiary",
      width: "Szerokość",
      height: "Wysokość",
      unit: "cm",
      sizeUnsure: "Nie wiem jeszcze, pomóżcie dobrać",
      decrease: "Zmniejsz liczbę sztuk",
      increase: "Zwiększ liczbę sztuk",
      quantity: "Liczba sztuk",
      deadline: "Na kiedy",
      description: "Opisz swój pomysł",
      descriptionPlaceholder:
        "Na przykład: logo naszej kawiarni, około 40 cm szerokości, białe i niebieskie światło, na ścianę za ladą.",
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
      required: "wymagane",
      successTitle: "Dziękujemy, {name}!",
      successText:
        "Twoje zapytanie do nas dotarło. Odpiszemy e-mailem z wyceną i propozycją kolejnych kroków.",
      another: "Wyślij kolejne zapytanie",
    },
    errors: {
      name: "Podaj swoje imię.",
      email: "Podaj poprawny adres e-mail.",
      phone: "Podaj poprawny numer telefonu.",
      size: "Podaj szerokość i wysokość albo zaznacz „Nie wiem jeszcze”.",
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
  footer: {
    tagline: "Personalizowane lightboxy LED z druku 3D.",
    explore: "Na stronie",
    findUs: "Znajdziesz nas tutaj",
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
