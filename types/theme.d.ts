export type Theme_colors =
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
  theme: Theme_colors;
  mode: Theme_mode;
};

type QuestionType = 
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-in-the-blank"
  | "short-answer"
  | "long-answer"
  | "matching"
  | "order"
  | "ranking"
  | "picture-choice"
  | "drag-and-drop"
  | "interactive"
  | "code";