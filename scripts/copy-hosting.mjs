// Po `next build`: dokłada do folderu `out` pliki serwera z `hosting`
// (.htaccess, .ovhconfig, formularz PHP). Zawartość `out` wgrywa się na OVH.
import { cpSync } from "node:fs";

cpSync("hosting", "out", { recursive: true });
console.log("Pliki z hosting/ skopiowane do out/.");
