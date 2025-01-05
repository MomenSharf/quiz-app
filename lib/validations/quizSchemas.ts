import {  QuestionType, Visibility } from "@prisma/client";
import { z } from "zod";
// Define schemas for different question types
const visibilityEnum = z.enum(Object.values(Visibility) as [Visibility, ...Visibility[]]);


export const unselectedSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.UNSELECTED),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
});

export const pickAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.PICK_ANSWER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Option is required"),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least two options are required")
    .refine((items) => items.find((item) => item.isCorrect), {
      message: "At least one item must be marked as correct",
      path: ["oneCorrectAnswer"],
    }),
});

export const trueFalseSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.TRUE_FALSE),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

export const fillInTheBlankSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.FILL_IN_THE_BLANK),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        isBlank: z.boolean(),
      })
    )
    .min(3, "At least three items are required")
    .refine((items) => items.filter((item) => item.isBlank).length > 1, {
      message: "At least tow blank items",
      path: ["towBlanks"],
    }),
});

export const shortAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SHORT_ANSWER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const matchingPairsSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MATCHING_PAIRS),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Prompt is required"),
        match: z.string().min(1, "Answer is required"),
      })
    )
    .min(2, "At least two options are required"),
});

export const questionOrderSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.ORDER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  imageUrl: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Prompt is required"),
      order: z.number(),
    })
  ),
});

export const quizSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  // imageUrl: z.string().min(5, "Thumbnail image is required"),
  imageUrl: z.string().optional(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  visibility: visibilityEnum,
  questions: z
    .array(
      z.union([
        unselectedSchema,
        pickAnswerSchema,
        trueFalseSchema,
        fillInTheBlankSchema,
        shortAnswerSchema,
        matchingPairsSchema,
        questionOrderSchema,
      ])
    )
    .min(1, "At least one question is required"),
});

export const folderSchema = quizSchema.pick({title: true});

export type folderSchemaType = z.infer<typeof folderSchema>;
export type quizSchemaType = z.infer<typeof quizSchema>;
export type questionsSchemaType =quizSchemaType["questions"];
export type questionSchemaType = quizSchemaType["questions"][number];
export type ItemSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"][number]
  | z.infer<typeof matchingPairsSchema>["items"][number]
  | z.infer<typeof questionOrderSchema>["items"][number];
export type ItemsSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"]
  | z.infer<typeof matchingPairsSchema>["items"]
  | z.infer<typeof questionOrderSchema>["items"];

