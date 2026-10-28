// Decyzja o animacjach zapada przed pierwszym wyświetleniem strony, więc nic nie mignie:
// data-motion włącza animacje (gdy system nie prosi o ograniczenie ruchu),
// data-intro pokazuje ekran startowy tylko przy pierwszym wejściu w danej karcie.
const motionScript = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.dataset.motion="";if(!sessionStorage.getItem("gbl-intro")){sessionStorage.setItem("gbl-intro","1");d.dataset.intro="";setTimeout(function(){delete d.dataset.intro},3500)}}catch(e){}})()`;

export function MotionScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: stały skrypt bez danych od użytkownika
  return <script dangerouslySetInnerHTML={{ __html: motionScript }} />;
}

// Ekran startowy: logo i linia ładowania. Nie blokuje kliknięć i znika sam po około sekundzie.
export function Intro() {
  return (
    <div className="intro" aria-hidden>
      {/* biome-ignore lint/performance/noImgElement: logo SVG */}
      <img
        src="/brand/logo.svg"
        alt=""
        width={744}
        height={225}
        className="intro-logo h-11 w-auto sm:h-14"
      />
      <span className="intro-bar relative h-0.5 w-36 overflow-hidden rounded-full bg-white/10" />
    </div>
  );
}
