import {
  LOGO_HEIGHT,
  LOGO_WIDTH,
  MARK_WIDTH,
  markBlue,
  markWhite,
  wordBlue,
  wordWhite,
} from "./logo-paths";

// Logo jako SVG w kodzie strony: białe części idą za motywem (na jasnym tle są grafitowe).
// Same ścieżki są w logo-paths.ts. Bez napisu zostaje sam sygnet.
export function Logo({
  className,
  mark = false,
}: {
  className?: string;
  mark?: boolean;
}) {
  const width = mark ? MARK_WIDTH : LOGO_WIDTH;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${LOGO_HEIGHT}`}
      width={width}
      height={LOGO_HEIGHT}
      className={className}
    >
      <path className="fill-ink" d={markWhite} fillRule="evenodd" />
      <path className="fill-brand" d={markBlue} fillRule="evenodd" />
      {!mark && (
        <>
          <path className="fill-ink" d={wordWhite} fillRule="evenodd" />
          <path className="fill-brand" d={wordBlue} fillRule="evenodd" />
        </>
      )}
    </svg>
  );
}
