import { quizSchemaType } from "@/lib/validations/quizSchemas";

export type QuestionType =
  | "PICK_ANSWER"
  | "TRUE_FALSE"
  | "FILL_IN_THE_BLANK"
  | "SHORT_ANSWER"
  | "MATCHING_PAIRS"
  | "ORDER";

export enum QuestionTypeEnum {
  PICK_ANSWER = "PICK_ANSWER",
  TRUE_FALSE = "TRUE_FALSE",
  FILL_IN_THE_BLANK = "FILL_IN_THE_BLANK",
  SHORT_ANSWER = "SHORT_ANSWER",
  MATCHING_PAIRS = "MATCHING_PAIRS",
  ORDER = "ORDER",
}

export type Category =
  | "SCIENCE"
  | "MATH"
  | "HISTORY"
  | "GEOGRAPHY"
  | "LITERATURE"
  | "TECHNOLOGY"
  | "SPORTS"
  | "ART"
  | "LANGUAGE"
  | "GENERAL_KNOWLEDGE"
  | "POLITICS"
  | "ECONOMICS"
  | "PHILOSOPHY"
  | "PSYCHOLOGY"
  | "BIOLOGY"
  | "CHEMISTRY"
  | "PHYSICS"
  | "COMPUTER_SCIENCE"
  | "RELIGION"
  | "NATURE"
  | "EDUCATION";

export type Visibility = "PUBLIC" | "PRIVATE";

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarColor: string;
  password: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  categories: Category[];
  visibility: Visibility;
};

export type Data = User & {
  quizzes: quizSchemaType[];
};
