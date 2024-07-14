import { z } from "zod";
import {categories} from '@/constants/index'

export const AnswerValdition = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
  order: z.number().int().optional(),
});

export const QuestionValidtion = z.object({
  text: z.string().min(1, 'Minimum 1 characters').max(50, 'Maximum 50 characters'),
  ImageUrl: z.string().optional(),
  options: z.array(AnswerValdition),
  answers: z.array(z.string()),
  questionType: z.enum(["PICK_ANSWER", "FILL_BLANKS"]),
});

export const QuizValidtion = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  imageUrl: z.string().optional(),
  description: z.string().min(3, "Minimum 3 characters").optional(),
  questions: z.array(QuestionValidtion).optional(),
  numberOfQuestions:  z.coerce.number().gte(2, 'Must be more than one question').lte(10, 'Must be less than 10 questions'),
  stickers: z.string().array().optional(),
  category: z.string()
});

export type QuizValidtionType = z.infer<typeof QuizValidtion>;

export type QuestionValidtionType = z.infer<typeof QuestionValidtion>;

export type AnswerValdition = z.infer<typeof AnswerValdition>;
