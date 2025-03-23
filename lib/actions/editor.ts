"use server";
import {
  questionSchemaType,
  quizSchema,
  quizSchemaType
} from "@/lib/validations/quizSchemas";
import { Prisma, QuestionType, Quiz } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getEditorQuiz = async ({ quizId }: { quizId: string }) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    noStore();
    const initialQuiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      include: {
        questions: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!initialQuiz) {
      return { success: false, message: "Quiz not found." };
    }

    return { success: true, initialQuiz };
  } catch (error) {
    return { success: false, message: "Error fetching quiz." };
  }
};

export const saveEditorQuiz = async (
  quizId: string,
  data: quizSchemaType
): Promise<{ success: boolean; message: string; quiz?: Quiz }> => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  const isValid = quizSchema.safeParse(data).success;

  const mapQuestion = (
    question: questionSchemaType,
    index?: number
  ): Prisma.QuestionCreateWithoutQuizInput => {
    const base = {
      type: question.type,
      questionOrder: index ? index : question.questionOrder,
      timeLimit: question.timeLimit,
      points: question.points,
      imageUrl: "imageUrl" in question ? question.imageUrl : undefined,
    };

    switch (question.type) {
      case QuestionType.PICK_ANSWER:
        return {
          ...base,
          question: question.question,
          items: {
            create: question.items.map((item) => ({
              text: item.text,
              isCorrect: item.isCorrect,
            })),
          },
        };
      case QuestionType.TRUE_FALSE:
        return {
          ...base,
          question: question.question,
          correctAnswer: question.correctAnswer,
        };
      case QuestionType.FILL_IN_THE_BLANK:
        return {
          ...base,
          question: question.question,
          items: {
            create: question.items.map((item) => ({
              text: item.text,
              isBlank: item.isBlank,
            })),
          },
        };
      case QuestionType.SHORT_ANSWER:
        return {
          ...base,
          question: question.question,
          correctAnswer: question.correctAnswer,
        };
      case QuestionType.MATCHING_PAIRS:
        return {
          ...base,
          question: question.question,
          items: {
            create: question.items.map((item) => ({
              text: item.text,
              match: item.match,
            })),
          },
        };
      case QuestionType.ORDER:
        return {
          ...base,
          question: question.question,
          items: {
            create: question.items.map((item) => ({
              text: item.text,
              order: item.order,
            })),
          },
        };

      default:
        return {
          ...base,
        };
    }
  };

  try {
    let questions = data.questions
      .filter((e) => e.type !== "UNSELECTED")
      .map(mapQuestion);

    questions =
      questions.length > 0
        ? questions
        : [
            {
              type: "UNSELECTED",
              questionOrder: 0,
              timeLimit: 10000,
              points: 10,
            },
          ];

    const { categories, title, description, imageUrl, visibility } = data;

    const quiz = await db.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      data: {
        categories,
        title,
        description,
        imageUrl,
        visibility: isValid ? visibility : "PRIVATE",
        questions: {
          deleteMany: {}, // Remove old questions
          create: questions,
        },
      },
    });

    if (quiz) {
      return { success: true, message: "Quiz updated successfully.", quiz };
    } else {
      return {
        success: false,
        message: "Failed to update quiz. Please try again.",
      };
    }
  } catch (error: any) {
    return { success: false, message: `An error occurred: ${error.message}` };
  }
};
