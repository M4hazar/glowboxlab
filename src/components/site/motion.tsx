import {
  LOGO_HEIGHT,
  LOGO_WIDTH,
  MARK_WIDTH,
  markBlue,
  markBlueParts,
  markWhite,
  wordBlue,
  wordWhite,
} from "./logo-paths";

// Decyzja o animacjach zapada przed pierwszym wyświetleniem strony, więc nic nie mignie:
// data-motion włącza animacje (gdy system nie prosi o ograniczenie ruchu),
// data-intro pokazuje ekran startowy przy każdym wczytaniu i odświeżeniu strony
// (przejścia między podstronami nie wczytują strony od nowa, więc go nie powtarzają).
const motionScript = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.dataset.motion="";d.dataset.intro="";setTimeout(function(){delete d.dataset.intro},3500)}catch(e){}})()`;

export function MotionScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: stały skrypt bez danych od użytkownika
  return <script dangerouslySetInnerHTML={{ __html: motionScript }} />;
}

// Ekran startowy: logo rysuje się i zapala, a potem przelatuje do nagłówka (animacje w globals.css).
// Nie blokuje kliknięć i znika sam po około dwóch sekundach.
// Styl inline ukrywa go, gdyby arkusz stylów nie wczytał się w całości (np. stara wersja z pamięci
// przeglądarki); wtedy duże logo nie wypadnie na stronę. Pokazuje go dopiero reguła z globals.css.
export function Intro() {
  const wordWidth = LOGO_WIDTH - MARK_WIDTH;
  return (
    <div className="intro" aria-hidden style={{ display: "none" }}>
      <div className="intro-bg" />
      <div className="intro-logo">
        <svg
          aria-hidden
          viewBox={`0 0 ${MARK_WIDTH} ${LOGO_HEIGHT}`}
          width={MARK_WIDTH}
          height={LOGO_HEIGHT}
        >
          <defs>
            <filter
              id="intro-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <path
            className="intro-glow fill-brand"
            d={markBlue}
            fillRule="evenodd"
            filter="url(#intro-glow)"
          />
          <path
            className="intro-fill-white fill-white"
            d={markWhite}
            fillRule="evenodd"
          />
          <path
            className="intro-fill-blue fill-brand"
            d={markBlue}
            fillRule="evenodd"
          />
          <path
            className="intro-stroke stroke-white"
            d={markWhite}
            pathLength={1}
          />
          {markBlueParts.map((d) => (
            <path
              key={d.slice(0, 12)}
              className="intro-stroke stroke-brand-soft"
              d={d}
              pathLength={1}
            />
          ))}
        </svg>
        <svg
          aria-hidden
          className="intro-word"
          viewBox={`${MARK_WIDTH} 0 ${wordWidth} ${LOGO_HEIGHT}`}
          width={wordWidth}
          height={LOGO_HEIGHT}
        >
          <path className="fill-white" d={wordWhite} fillRule="evenodd" />
          <path className="fill-brand" d={wordBlue} fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
