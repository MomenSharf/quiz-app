import { VISIBILITY_OPTIONS } from "@/constants";
import { Category, QuestionType, Visibility } from "@prisma/client";
import { z } from "zod";

// Define schemas for different question types
const CategoryEnum = z.enum(Object.values(Category) as [Category, ...Category[]]);
const visibilityEnum = z.enum(Object.values(Visibility) as [Visibility, ...Visibility[]]);


export const imageSchema = z.object({
  id: z.string(),
  uploadthingId: z.string(),
  url: z.string(),
  userId: z.string().nullable(),
});

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
  image: imageSchema.optional(),
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
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

export const fillInTheBlankSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.FILL_IN_THE_BLANK),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        isBlank: z.boolean(),
      })
    )
    .min(2, "At least two options are required")
    .refine((items) => items.find((item) => item.isBlank), {
      message: "At least one blank item",
      path: ["oneBlank"],
    }),
});

export const shortAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SHORT_ANSWER),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const matchingPairsSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MATCHING_PAIRS),
  questionOrder: z.number(),
  timeLimit: z.number(),
  points: z.number(),
  image: imageSchema.optional(),
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
  image: imageSchema.optional(),
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
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: imageSchema.optional(),
  categories: z.array(CategoryEnum),
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

export const folderSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type folderSchemaType = z.infer<typeof folderSchema>;
export type quizSchemaType = z.infer<typeof quizSchema>;
export type questionSchemaType = z.infer<
  typeof quizSchema
>["questions"][number];
export type questionsSchemaType = z.infer<typeof quizSchema>["questions"];
export type ItemSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"][number]
  | z.infer<typeof matchingPairsSchema>["items"][number]
  | z.infer<typeof questionOrderSchema>["items"][number];
export type ItemsSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"]
  | z.infer<typeof matchingPairsSchema>["items"]
  | z.infer<typeof questionOrderSchema>["items"];

export type imageSchemaType = z.infer<typeof imageSchema>;
