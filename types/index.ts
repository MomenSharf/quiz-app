import { Question, Quiz } from "@prisma/client";

export type QuizWithQuestions = Quiz & {
  questions: Question[];
};