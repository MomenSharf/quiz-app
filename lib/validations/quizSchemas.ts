import { number, string, z } from "zod";
import { VisibilityOptions, DifficultyLevels } from "@/constants"; // Adjust the import path as necessary
import { QuestionType } from "@prisma/client";

// Define schemas for different question types

export const unselectedSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.UNSELECTED),
  questionOrder: z.number(),
});

export const singleChoiceSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.SINGLE_CHOICE),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const multipleChoiceSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.MULTIPLE_CHOICE),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctAnswers: z
    .array(z.string())
    .min(1, "At least one correct answer is required"),
});

export const trueFalseSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.TRUE_FALSE),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

export const fillInTheBlankSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.FILL_IN_THE_BLANK),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const shortAnswerSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.SHORT_ANSWER),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const matchingPairsSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.MATCHING_PAIRS),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  pairs: z
    .array(
      z.object({
        item: z.string().min(1, "Item is required"),
        match: z.string().min(1, "Match is required"),
      })
    )
    .min(2, "At least two pairs are required"),
});

export const questionOrderSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.ORDER),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  correctOrder: z.array(z.string()).min(1, "At least one item is required"),
});

export const pickImageSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.PICK_IMAGE),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  imagesOptions: z
    .array(
      z.object({
        imageUrl: z.string().url("Invalid URL"),
        label: z.string().optional(),
      })
    )
    .min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const codeSchema = z.object({
  id: z.string().optional(),
  type: z.literal(QuestionType.CODE),
  questionOrder: z.number(),
  question: z.string().min(1, "Question is required"),
  codeSnippet: z.string().min(1, "Code snippet is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  categories: z.array(z.string()),
  visibility: z.enum(VisibilityOptions),
  difficulty: z.enum(DifficultyLevels),
  questions: z
    .array(
      z.union([
        unselectedSchema,
        singleChoiceSchema,
        multipleChoiceSchema,
        trueFalseSchema,
        fillInTheBlankSchema,
        shortAnswerSchema,
        matchingPairsSchema,
        questionOrderSchema,
        pickImageSchema,
        codeSchema,
      ])
    )
    .min(1, "At least one question is required"),
});

export const folderSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type folderSchemaType = z.infer<typeof folderSchema>;
export type quizSchemaType = z.infer<typeof quizSchema>;
export type questionSchemaType = z.infer<
  typeof quizSchema
>["questions"][number];
export type questionsSchemaType = z.infer<typeof quizSchema>["questions"];
