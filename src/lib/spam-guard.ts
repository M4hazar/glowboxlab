// Ochrona formularza przed spamem bez captchy, ciasteczek i zewnętrznych usług.
// Sprawdza ją serwer (hosting/api/quote-lib.php), tu są tylko nazwy pól dla formularza.

// Nazwa pola pułapki nie przypomina żadnego pola, które przeglądarka uzupełnia sama
// (np. "company"), bo autouzupełnienie po cichu wyrzucałoby prawdziwe zapytania.
export const HONEYPOT_FIELD = "extra_note";
// Ile milisekund minęło od pokazania formularza do wysłania. Uzupełnia je przeglądarka.
export const ELAPSED_FIELD = "elapsed";
// Szybciej człowiek nie wypełni formularza. Ta sama wartość jest w quote-lib.php.
export const MIN_FILL_MS = 3000;
