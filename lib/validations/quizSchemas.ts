import { DIFFICULTY_LEVELS, VISIBILITY_OPTIONS } from "@/constants";
import { QuestionType } from "@prisma/client";
import { z } from "zod";

// Define schemas for different question types

export const imageSchema = z.object({
  id: z.string(),
  uploadthingId: z.string(),
  url: z.string(),
  userId: z.string().nullable()
});

export const unselectedSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.UNSELECTED),
  questionOrder: z.number(),
});

export const pickAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.PICK_ANSWER),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least two options are required"),
});


export const trueFalseSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.TRUE_FALSE),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

export const fillInTheBlankSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.FILL_IN_THE_BLANK),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const shortAnswerSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.SHORT_ANSWER),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const matchingPairsSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.MATCHING_PAIRS),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        match: z.string(),
      })
    )
    .min(2, "At least two options are required"),
});

export const questionOrderSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.ORDER),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      order: z.number(),
    })
  ),
});

export const pickImageSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.PICK_IMAGE),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        image: imageSchema.optional(),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least two options are required"),
});

export const codeSchema = z.object({
  id: z.string(),
  type: z.literal(QuestionType.CODE),
  questionOrder: z.number(),
  image: imageSchema.optional(),
  question: z.string().min(1, "Question is required"),
  codeSnippet: z.string().min(1, "Code snippet is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const quizSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.optional(),
  categories: z.array(z.string()),
  visibility: z.enum(VISIBILITY_OPTIONS),
  difficulty: z.enum(DIFFICULTY_LEVELS),
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
export type ItemSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"][number]
  | z.infer<typeof matchingPairsSchema>["items"][number]
  | z.infer<typeof questionOrderSchema>["items"][number]
  | z.infer<typeof pickImageSchema>["items"][number];
export type ItemsSchemaType =
  | z.infer<typeof pickAnswerSchema>["items"]
  | z.infer<typeof matchingPairsSchema>["items"]
  | z.infer<typeof questionOrderSchema>["items"]
  | z.infer<typeof pickImageSchema>["items"];

export type imageSchemaType = z.infer<typeof imageSchema>;
