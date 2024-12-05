import { SORT_OPTIONS } from "@/constants";
import {
  fillInTheBlankSchema,
  matchingPairsSchema,
  pickAnswerSchema,
  questionOrderSchema,
  shortAnswerSchema,
  trueFalseSchema,
  unselectedSchema
} from "@/lib/validations/quizSchemas";
import { EditorQuiz, SortOption } from "@/types";
import { QuestionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";
import * as z from 'zod';
export function formatTimeAgo(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function toCapitalize(str: string) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shuffleArray(array: any[]): any[] {
  const newArray = [...array]; // Create a shallow copy of the original array
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]]; // Swap elements
  }
  return newArray; // Return the shuffled copy
}

// Utility function to format milliseconds as "Xmin Ys"
export const formatToMinSec = (time: number) => {
  const end = time < 1000 ? 1000 : time;
  const duration = intervalToDuration({ start: 0, end });

  const minutes = duration.minutes ? `${duration.minutes}min` : "";
  const seconds = duration.seconds ? `${duration.seconds}s` : "";

  // Return formatted string with proper spacing
  return `${minutes} ${seconds}`.trim();
};

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function that takes a SortOption and returns the correct sorting logic
export const isValidSortOption = (value: unknown): value is SortOption => {
  return SORT_OPTIONS.includes(value as SortOption);
};

export const mapQuestionByType = (question: EditorQuiz["questions"][number]) => {
  const baseQuestion = {
    id: question.id,
    type: question.type,
    questionOrder: question.questionOrder,
    timeLimit: question.timeLimit,
    points: question.points,
    image: question.image || undefined,
    question: question.question ?? "",
  };

  switch (question.type) {
    case QuestionType.UNSELECTED:
      return { ...baseQuestion } as z.infer<typeof unselectedSchema>;

    case QuestionType.PICK_ANSWER:
      return {
        ...baseQuestion,
        items: question.items.map((e) => ({
          id: e.id,
          text: e.text,
          isCorrect: e.isCorrect || false,
        })),
      } as z.infer<typeof pickAnswerSchema>;

    case QuestionType.TRUE_FALSE:
      return {
        ...baseQuestion,
        correctAnswer: (question.correctAnswer ?? "true") as "true" | "false",
      } as z.infer<typeof trueFalseSchema>;

    case QuestionType.FILL_IN_THE_BLANK:
      return {
        ...baseQuestion,
        items: question.items.map((e) => ({
          id: e.id,
          text: e.text,
          isBlank: e.isBlank,
        })),
      } as z.infer<typeof fillInTheBlankSchema>;

    case QuestionType.SHORT_ANSWER:
      return {
        ...baseQuestion,
        correctAnswer: question.correctAnswer ?? "",
      } as z.infer<typeof shortAnswerSchema>;

    case QuestionType.MATCHING_PAIRS:
      return {
        ...baseQuestion,
        items: question.items.map((e) => ({
          id: e.id,
          text: e.text,
          match: e.match,
        })),
      } as z.infer<typeof matchingPairsSchema>;

    case QuestionType.ORDER:
      return {
        ...baseQuestion,
        items: question.items.map((e) => ({
          id: e.id,
          text: e.text,
          order: e.order,
        })),
      } as z.infer<typeof questionOrderSchema>;

    default:
      return { ...baseQuestion, type: QuestionType.UNSELECTED } as z.infer<
        typeof unselectedSchema
      >;
  }
};
