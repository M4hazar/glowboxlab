"use client";

import { useEffect, useState } from "react";

// Strona jest prerenderowana, więc aktualny rok ustawiamy dopiero w przeglądarce.
export function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span>{year}</span>;
}
