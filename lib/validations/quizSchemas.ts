import { z } from 'zod';

// Define schemas for different question types

const singleChoiceSchema = z.object({
  type: z.literal('single-choice'),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string()).min(2, 'At least two options are required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const multipleChoiceSchema = z.object({
  type: z.literal('multiple-choice'),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string()).min(2, 'At least two options are required'),
  correctAnswers: z.array(z.string()).min(1, 'At least one correct answer is required'),
});

const trueFalseSchema = z.object({
  type: z.literal('true-false'),
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.enum(['true', 'false']),
});

const fillInTheBlankSchema = z.object({
  type: z.literal('fill-in-the-blank'),
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const shortAnswerSchema = z.object({
  type: z.literal('short-answer'),
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const longAnswerSchema = z.object({
  type: z.literal('long-answer'),
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const matchingSchema = z.object({
  type: z.literal('matching'),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.object({
    item: z.string().min(1, 'Item is required'),
    match: z.string().min(1, 'Match is required'),
  })).min(2, 'At least two pairs are required'),
});

const orderSchema = z.object({
  type: z.literal('order'),
  question: z.string().min(1, 'Question is required'),
  correctOrder: z.array(z.string()).min(1, 'At least one item is required'),
});

const rankingSchema = z.object({
  type: z.literal('ranking'),
  question: z.string().min(1, 'Question is required'),
  items: z.array(z.string()).min(2, 'At least two items are required'),
  correctRanking: z.array(z.string()).min(2, 'Correct ranking is required'),
});

const pictureChoiceSchema = z.object({
  type: z.literal('picture-choice'),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.object({
    imageUrl: z.string().url('Invalid URL'),
    label: z.string().min(1, 'Label is required'),
  })).min(2, 'At least two options are required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
});

const dragAndDropSchema = z.object({
  type: z.literal('drag-and-drop'),
  question: z.string().min(1, 'Question is required'),
  items: z.array(z.object({
    item: z.string().min(1, 'Item is required'),
    correctPosition: z.number().int().min(0),
  })).min(2, 'At least two items are required'),
});

const interactiveSchema = z.object({
  type: z.literal('interactive'),
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  // Define additional fields based on the interactive element used
});

const codeSchema = z.object({
  type: z.literal('code'),
  question: z.string().min(1, 'Question is required'),
  codeSnippet: z.string().min(1, 'Code snippet is required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
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
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().optional(),
  categories: z.string().array(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});



