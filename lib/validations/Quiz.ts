import * as z from "zod";



export const QuestionValidtion = z.object({
  text: z
    .string()
    .min(1, "Minimum 1 characters")
    .max(50, "Maximum 50 characters"),
  ImageUrl: z.string().optional(),
  correctOption: z.string().min(1, "Minimum 1 characters"),
  optionTow: z.string().min(1, "Minimum 1 characters"),
  optionThree: z.string().min(1, "Minimum 1 characters"),
  optionFour: z.string().min(1, "Minimum 1 characters"),
});

export const QuizValidtion = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  imageUrl: z.string().optional(),
  description: z.string().min(3, "Minimum 3 characters"),
  questions: z.array(QuestionValidtion).default([]),
  numberOfQuestions: z.coerce
    .number()
    .gte(1, "Must be at leset one question")
    .lte(10, "Must be less than 10 questions"),
  category: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export type QuizValidtionType = z.infer<typeof QuizValidtion>;

export type QuestionValidtionType = z.infer<typeof QuestionValidtion>;

