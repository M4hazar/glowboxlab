// Kolory podświetlenia do wyboru w modelu 3D. Pierwszy jest domyślny i zgadza się z plakatem.
// glow: kolor świecenia, spill: poświata przed frontem, base: kolor części bez światła,
// power: siła świecenia (jasne kolory świecą słabiej, żeby poświata ich nie rozmyła).
export const LIGHT_COLORS = {
  blue: { glow: "#0055ff", spill: "#1a7cff", base: "#0a5fc4", power: 1.7 },
  red: { glow: "#ff1a1a", spill: "#ff4040", base: "#c41a1a", power: 1.5 },
  green: { glow: "#00e04b", spill: "#33ff70", base: "#14a043", power: 1.1 },
  purple: { glow: "#6b1fff", spill: "#8c4dff", base: "#5a22c4", power: 1.6 },
  pink: { glow: "#ff2bb4", spill: "#ff5cc8", base: "#c4238c", power: 1.3 },
  white: { glow: "#ffffff", spill: "#e8f0ff", base: "#e4e5e7", power: 1.05 },
} as const;

export type LightColor = keyof typeof LIGHT_COLORS;

export const LIGHT_COLOR_IDS = Object.keys(LIGHT_COLORS) as LightColor[];
