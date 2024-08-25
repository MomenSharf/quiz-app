export type THEME_COLORS =
  | "zinc"
  | "slate"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

export type Theme_mode = "dark" | "light";

export type ThemeState = {
  theme: THEME_COLORS;
  mode: Theme_mode;
};
