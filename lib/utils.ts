import {
  AVATAR_COLORS,
  CATEGORY_OPTIONS_LIST,
  LIBRARY_SORT_OPTIONS,
  SEARCH_SORT_OPTIONS,
} from "@/constants";
import {
  fillInTheBlankSchema,
  matchingPairsSchema,
  pickAnswerSchema,
  questionOrderSchema,
  shortAnswerSchema,
  trueFalseSchema,
  unselectedSchema,
} from "@/lib/validations/quizSchemas";
import {
  Category,
  EditorQuiz,
  LibrarySortOption,
  PlayQuizType,
  SearchSortOption,
} from "@/types";
import { QuestionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";
import * as z from "zod";
import numeral from "numeral";
import { toast } from "@/hooks/use-toast";
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

export function shuffleMatches(array: {text: string | null, match: string |null}[]) {
  // Step 1: Extract all match values
  const matches = array.map(item => item.match);

  // Step 2: Shuffle the matches array
  const shuffledMatches = matches.sort(() => Math.random() - 0.5);

  // Step 3: Create a new array with shuffled matches
  return array.map((item, index) => ({
    text: item.text,
    match: shuffledMatches[index],
  }));
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
export const isValidLibrarySortOption = (
  value: unknown
): value is LibrarySortOption => {
  return LIBRARY_SORT_OPTIONS.includes(value as LibrarySortOption);
};
export const isValidSearchSortOption = (
  value: unknown
): value is SearchSortOption => {
  return SEARCH_SORT_OPTIONS.includes(value as SearchSortOption);
};
export const isValidCategoryOption = (value: unknown): value is Category => {
  return CATEGORY_OPTIONS_LIST.map((e) => e.value).includes(value as Category);
};

export const mapQuestionByType = (
  question: EditorQuiz["questions"][number]
) => {
  const baseQuestion = {
    id: question.id,
    type: question.type,
    questionOrder: question.questionOrder,
    timeLimit: question.timeLimit,
    points: question.points,
    imageUrl: question.imageUrl || undefined,
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

export const intQuiz = (initialQuiz: EditorQuiz | PlayQuizType["quiz"]) => {
  const mappedQuestions = initialQuiz.questions
    .map(mapQuestionByType)
    .sort((a, b) => a.questionOrder - b.questionOrder);

  return {
    id: initialQuiz.id,
    title: initialQuiz.title,
    description: initialQuiz.description,
    imageUrl: initialQuiz.imageUrl || "",
    visibility: initialQuiz.visibility,
    categories: initialQuiz.categories as Category[],
    questions: mappedQuestions,
  };
};

export function formatAsKMB(num: number) {
  if (num > 999) return numeral(num).format("0.0a").toUpperCase();
  else return numeral(num).format("0.a").toUpperCase();
}

export const calculateQuizRatings = (ratings: { rate: number }[]) => {
  const totalRatings = ratings.length;
  const averageRating =(
    totalRatings > 0
      ? ratings.reduce((sum, rating) => sum + rating.rate, 0) / totalRatings
      : 0).toFixed(1);

  return { averageRating, totalRatings };
};

export const shareLink = async (shareData: {
  url: string;
  title: string;
  text: string;
}) => {
  // Ensure we're running in the client-side
  if (typeof window !== "undefined") {
    // Check if the browser supports the Web Share API
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        toast({ description: "Error sharing the link. Please try again." });
      }
    } else {
      toast({ description: "Sharing is not supported on your device." });
    }
  } else {
    toast({ description: "This feature is not available on the server side." });
  }
};

export function getRandomColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

export function getInitials(name?: string | null) {
  if (!name) return "U"; // Default to 'U' if no name is available
  const parts = name.split(" ");
  return parts.length > 1
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase();
}

export const getCategoryName = (path: string) => {
  const prefix = "/assets/images/categories/";
  return path.startsWith(prefix) ? path.replace(prefix, "").split(".")[0] : null;
}