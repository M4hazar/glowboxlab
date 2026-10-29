import type { Dictionary } from "./en";

// Treści strony po polsku. Zasada marki: bez długich myślników w tekstach.
export const pl: Dictionary = {
  locale: "pl",
  htmlLang: "pl-PL",
  meta: {
    title: "GlowBox Lab | LED boxy na zamówienie",
    description:
      "Lightboxy LED z druku 3D na zamówienie: logo firmy, logo drużyny esportowej, nick gracza lub prezent. Wysyłka w całej Europie z Walsall w Wielkiej Brytanii.",
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
    darkMode: "Ciemny motyw",
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "Portfolio", href: "#work" },
    { label: "Proces", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#quote" },
  ],
  cta: "Zamów wycenę",
  hero: {
    eyebrow: "Lightboxy LED na zamówienie",
    title: ["Twoje pomysły.", "W nowym świetle."],
    lead: "Podświetlane logo, napisy i grafiki drukowane w 3D na zamówienie. Dla firm, drużyn esportowych i graczy, a także na prezent.",
    primary: "Zamów wycenę",
    secondary: "Zobacz portfolio",
  },
  viewer: {
    light: "Światło",
    rotateLeft: "Obróć w lewo",
    rotateRight: "Obróć w prawo",
    fallback:
      "Podgląd 3D nie jest dostępny na tym urządzeniu, dlatego pokazujemy lightbox na zdjęciu.",
    canvasLabel:
      "Interaktywny model 3D lightboxa GlowBox Lab. Przeciągnij, aby obrócić, albo użyj przycisków poniżej.",
  },
  work: {
    title: "Portfolio",
    lead: "Przykładowe projekty lightboxów.",
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
      cta: "Zapytaj o podobny projekt",
      all: "Zobacz wszystkie",
    },
    items: [
      {
        image: "/images/work-devils.webp",
        alt: "Czerwono-pomarańczowy lightbox z napisem Devil's, postacią z rogami i płomieniami",
        title: "Logo po konturze",
        text: "Dla baru, drużyny esportowej lub marki.",
        description:
          "Obudowa wycięta dokładnie po konturze logo, z płomieniami i postacią. Sprawdza się tam, gdzie znak ma przyciągać wzrok: za barem, na scenie turnieju lub w pokoju gracza.",
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
          "Serce z imionami i różami, zaprojektowane jako prezent. Można dodać datę, dedykację lub własną grafikę.",
        details: [
          { label: "Kształt", value: "Serce" },
          { label: "Kolory na froncie", value: "Czerwony, żółty, kremowy" },
        ],
      },
      {
        image: "/images/work-logo.webp",
        alt: "Sześciokątny lightbox z logo GlowBox Lab widziany z boku",
        title: "Logo firmy lub kanału",
        text: "Na biurko, ladę, setup lub do studia.",
        description:
          "Logo w prostej, sześciokątnej obudowie. Dobrze prezentuje się na ladzie, na półce oraz w tle transmisji i nagrań.",
        details: [
          { label: "Kształt", value: "Sześciokąt" },
          { label: "Kolory na froncie", value: "Niebieski, biały" },
        ],
      },
    ],
  },
  process: {
    title: "Proces realizacji",
    lead: "Cztery etapy, od zapytania do dostawy.",
    counter: "Etap {current} z {total}",
    previous: "Poprzedni etap",
    next: "Następny etap",
    steps: [
      {
        title: "Zapytanie",
        text: "Grafika, wymiary i liczba sztuk.",
        description:
          "Prześlij nam logo, grafikę lub opis projektu. Gotowy plik nie jest wymagany: na podstawie szkicu lub inspiracji przygotujemy projekt od podstaw.",
        details: [
          "Podaj wymiary (maksymalnie 256 × 256 × 256 mm) i liczbę sztuk. Jeśli nie masz pewności, pomożemy je dobrać.",
          "Najlepiej sprawdzają się pliki wektorowe (SVG, PDF, AI, EPS). Przyjmujemy też PNG i JPG w dobrej jakości.",
          "Zapytanie wyślesz przez formularz, WhatsApp lub e-mail.",
        ],
      },
      {
        title: "Projekt i wycena",
        text: "Odpowiedź w ciągu 24 godzin.",
        description:
          "Weryfikujemy przesłane materiały i przygotowujemy wizualizację lightboxa wraz z wyceną. Przed rozpoczęciem produkcji wiesz, jak będzie wyglądał i ile będzie kosztował.",
        details: [
          "Wycena jest bezpłatna i niezobowiązująca.",
          "Cena zależy od rozmiaru, kształtu, liczby kolorów i liczby sztuk.",
          "Na tym etapie możesz wprowadzić poprawki w projekcie.",
        ],
      },
      {
        title: "Produkcja",
        text: "Wykonanie na indywidualne zamówienie.",
        description:
          "Obudowę drukujemy w technologii 3D, a następnie montujemy w niej podświetlenie LED.",
        details: [
          "Produkcję rozpoczynamy wyłącznie po akceptacji projektu.",
          "Termin realizacji ustalamy indywidualnie, razem z wyceną.",
          "Obudowy do 256 mm drukujemy w jednym elemencie.",
        ],
      },
      {
        title: "Wysyłka",
        text: "Pakowanie i dostawa.",
        description:
          "Gotowy lightbox starannie pakujemy i wysyłamy na wskazany adres.",
        details: [
          "Wysyłamy na terenie całej Europy.",
          "Możliwy jest też odbiór osobisty w Walsall.",
        ],
      },
    ],
  },
  faq: {
    title: "Najczęstsze pytania",
    items: [
      {
        q: "Czy mogę przesłać własną grafikę?",
        a: "Tak. Najlepiej sprawdzają się pliki wektorowe (SVG, PDF, AI, EPS), ale przyjmujemy też PNG i JPG w dobrej jakości. Każdy plik sprawdzamy i informujemy, jeśli wymaga poprawek.",
      },
      {
        q: "Czy potrzebuję gotowego projektu?",
        a: "Nie. Wystarczy opis, szkic lub inspiracja. Na tej podstawie przygotujemy projekt i prześlemy go do akceptacji.",
      },
      {
        q: "Czy wykonujecie lightboxy z logo drużyny lub nickiem gracza?",
        a: "Tak. Wykonujemy lightboxy z logo drużyn esportowych, nickami graczy i grafikami na setup, zarówno pojedyncze sztuki, jak i serie dla całej drużyny.",
      },
      {
        q: "Jak duży może być lightbox?",
        a: "Maksymalnie 256 × 256 × 256 mm. W tym rozmiarze obudowa powstaje w jednym elemencie.",
      },
      {
        q: "Od czego zależy cena?",
        a: "Od rozmiaru, kształtu, liczby kolorów i liczby sztuk. Dokładną cenę podajemy w bezpłatnej wycenie.",
      },
      {
        q: "Czy każdy lightbox wygląda identycznie?",
        a: "Każdy lightbox drukujemy warstwa po warstwie, dlatego mogą być widoczne delikatne linie druku, a odcień może się nieznacznie różnić między partiami materiału lub od kolorów na ekranie. To naturalna cecha druku 3D, która nadaje każdemu egzemplarzowi indywidualny charakter i nie wpływa na jego działanie.",
      },
      {
        q: "Ile trwa realizacja?",
        a: "Termin realizacji ustalamy indywidualnie, razem z wyceną. Produkcję rozpoczynamy po akceptacji projektu.",
      },
      {
        q: "Gdzie wysyłacie?",
        a: "Wysyłamy na terenie całej Europy. Możliwy jest też odbiór osobisty w Walsall.",
      },
    ],
  },
  quote: {
    title: "Zaprojektujmy Twój lightbox",
    lead: "Opisz projekt i dołącz grafikę, jeśli ją masz. W odpowiedzi otrzymasz wycenę i propozycję dalszych kroków.",
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
      sizeUnsure: "Nie znam wymiarów, proszę o pomoc w doborze",
      decrease: "Zmniejsz liczbę sztuk",
      increase: "Zwiększ liczbę sztuk",
      quantity: "Liczba sztuk",
      deadline: "Na kiedy",
      description: "Opis projektu",
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
      notice: "Dane z formularza wykorzystujemy tylko do przygotowania wyceny.",
      privacy: "Polityka prywatności",
      submit: "Wyślij zapytanie o wycenę",
      sending: "Wysyłanie",
      successTitle: "Dziękujemy, {name}!",
      successText:
        "Otrzymaliśmy Twoje zapytanie. Odpowiemy e-mailem w ciągu 24 godzin.",
      another: "Wyślij kolejne zapytanie",
    },
    errors: {
      name: "Podaj swoje imię.",
      email: "Podaj poprawny adres e-mail.",
      phone: "Podaj poprawny numer telefonu.",
      size: "Podaj wymiary do 256 × 256 × 256 mm albo zaznacz „Nie znam wymiarów”.",
      quantity: "Podaj liczbę sztuk od 1 do 500.",
      description: "Opis powinien mieć co najmniej 20 znaków.",
      fileType: "Ten typ pliku nie jest obsługiwany: {file}",
      fileSize: "Pliki są za duże. Limit to łącznie 4 MB.",
      fileCount: "Możesz dołączyć maksymalnie 3 pliki.",
      summary: "Sprawdź zaznaczone pola.",
      generic:
        "Nie udało się wysłać zapytania. Spróbuj ponownie lub skontaktuj się z nami przez WhatsApp.",
    },
  },
  contact: {
    email: "E-mail",
    call: "Zadzwoń",
    whatsapp: "Napisz na WhatsApp",
    location: "Walsall, Wielka Brytania",
    delivery: "Wysyłka na terenie całej Europy lub odbiór osobisty.",
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
    terms: "Zasady wyceny i zamówień",
    rights: "GlowBox Lab",
  },
  portfolio: {
    title: "Portfolio",
    lead: "Wszystkie projekty w jednym miejscu. Wybierz projekt, aby zobaczyć szczegóły.",
    description:
      "Portfolio GlowBox Lab: lightboxy LED z druku 3D z logo firmy, logo drużyny, nickiem gracza, imionami lub własną grafiką.",
  },
  legal: {
    back: "Wróć na stronę główną",
    updated: "Ostatnia aktualizacja: 28 października 2026",
  },
  notFound: {
    title: "Ta strona nie istnieje.",
    text: "Link może być nieaktualny albo strona została przeniesiona.",
    back: "Przejdź na stronę główną",
  },
};
