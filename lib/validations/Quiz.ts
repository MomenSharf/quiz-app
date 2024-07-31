import * as z from "zod";

export const QuestionValidtion = z.object({
  text: z
    .string()
    .min(1, "Minimum 1 characters")
    .max(50, "Maximum 50 characters"),
  imageUrl: z.string().optional(),
  options: z
    .array(
      z.object({
        isCorrect: z.boolean().default(false),
        text: z.string().min(1, "Minimum 1 characters"),
      })
    )
    .min(2, "Minimum 2 options")
    .default([
      {
        text: "",
        isCorrect: false,
      },
      {
        text: "",
        isCorrect: false,
      },
    ]),
});

export const QuizValidtion = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  imageUrl: z.string().optional(),
  description: z.string().min(3, "Minimum 3 characters"),
  questions: z
    .array(QuestionValidtion)
    .min(1, "Must be at leset one question")
    .max(10, "Must be less than 10 questions"),
  // numberOfQuestions: z.coerce
  //   .number()
  //   .gte(1, "Must be at leset one question")
  //   .lte(10, "Must be less than 10 questions"),
  categories: z.string().array(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export type QuizValidtionType = z.infer<typeof QuizValidtion>;

export type QuestionValidtionType = z.infer<typeof QuestionValidtion>;
