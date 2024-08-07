import { z } from "zod";
import { QuestionTypes, VisibilityOptions, DifficultyLevels } from "@/constants"; // Adjust the import path as necessary

// Define schemas for different question types

const singleChoiceSchema = z.object({
  type: z.literal(QuestionTypes[0]),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});


const multipleChoiceSchema = z.object({
  type: z.literal(QuestionTypes[1]),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctAnswers: z
    .array(z.string())
    .min(1, "At least one correct answer is required"),
});

const trueFalseSchema = z.object({
  type: z.literal(QuestionTypes[2]),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

const fillInTheBlankSchema = z.object({
  type: z.literal(QuestionTypes[3]),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

const shortAnswerSchema = z.object({
  type: z.literal(QuestionTypes[4]),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

const longAnswerSchema = z.object({
  type: z.literal(QuestionTypes[5]),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

const matchingSchema = z.object({
  type: z.literal(QuestionTypes[6]),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        item: z.string().min(1, "Item is required"),
        match: z.string().min(1, "Match is required"),
      })
    )
    .min(2, "At least two pairs are required"),
});

const orderSchema = z.object({
  type: z.literal(QuestionTypes[7]),
  question: z.string().min(1, "Question is required"),
  correctOrder: z.array(z.string()).min(1, "At least one item is required"),
});

const rankingSchema = z.object({
  type: z.literal(QuestionTypes[8]),
  question: z.string().min(1, "Question is required"),
  items: z.array(z.string()).min(2, "At least two items are required"),
  correctRanking: z.array(z.string()).min(2, "Correct ranking is required"),
});

const pictureChoiceSchema = z.object({
  type: z.literal(QuestionTypes[9]),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        imageUrl: z.string().url("Invalid URL"),
        label: z.string().min(1, "Label is required"),
      })
    )
    .min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

const dragAndDropSchema = z.object({
  type: z.literal(QuestionTypes[10]),
  question: z.string().min(1, "Question is required"),
  items: z
    .array(
      z.object({
        item: z.string().min(1, "Item is required"),
        correctPosition: z.number().int().min(0),
      })
    )
    .min(2, "At least two items are required"),
});

const interactiveSchema = z.object({
  type: z.literal(QuestionTypes[11]),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  // Define additional fields based on the interactive element used
});

const codeSchema = z.object({
  type: z.literal(QuestionTypes[12]),
  question: z.string().min(1, "Question is required"),
  codeSnippet: z.string().min(1, "Code snippet is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

// Define the union schema
const questionSchema = z.union([
  singleChoiceSchema,
  multipleChoiceSchema,
  trueFalseSchema,
  fillInTheBlankSchema,
  shortAnswerSchema,
  longAnswerSchema,
  matchingSchema,
  orderSchema,
  rankingSchema,
  pictureChoiceSchema,
  dragAndDropSchema,
  interactiveSchema,
  codeSchema,
]);

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  categories: z.array(z.string()),
  visibility: z.enum(VisibilityOptions),
  difficulty: z.enum(DifficultyLevels),
  questions: z.array(singleChoiceSchema).min(1, "At least one question is required"),
});

export const folderSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type folderSchemaType = z.infer<typeof folderSchema>;
export type quizSchemaType = z.infer<typeof quizSchema>;


