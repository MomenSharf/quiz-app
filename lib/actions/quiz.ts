"use server";
import { MAX_QUIZ_TITLE_LENGTH } from "@/constants";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const newQuiz = async ({
  folderId,
  pathname,
}: {
  folderId?: string;
  pathname?: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quiz = await db.quiz.create({
      data: {
        userId: session.user.id,
        folderId,
        title: "My new Quiz",
        description: "",
        visibility: "PRIVATE",
        categories: [],
        questions: {
          create: {
            type: "UNSELECTED",
            questionOrder: 0,
            timeLimit: 10000,
            points: 10,
          },
        },
      },
    });

    if (pathname) revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create quiz. Please try again later.",
    };
  }
};

export const copyQuiz = async ({
  quizId,
  pathname,
}: {
  quizId: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();

  // 1. Ensure the user is logged in
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    // 2. Fetch the original quiz and its relations
    const originalQuiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            items: true, // Fetch question items
          },
        },
      },
    });

    if (!originalQuiz) {
      return { success: false, message: "Quiz not found." };
    }

    // 3. Destructure quiz data to exclude unnecessary fields
    const {
      id: originalQuizId,
      createdAt,
      updatedAt,
      userId,
      folderId,
      visibility,
      questions,
      ...quizDataToCopy
    } = originalQuiz;

    // 4. Copy the quiz
    const newQuiz = await db.quiz.create({
      data: {
        ...quizDataToCopy,
        title:
          quizDataToCopy.title.length <= MAX_QUIZ_TITLE_LENGTH - 7
            ? `${quizDataToCopy.title} (Copy)`
            : quizDataToCopy.title, // Append "(Copy)" to the title
        userId: session.user.id, // Assign ownership to the current user
        visibility: "PRIVATE", // Set visibility to PRIVATE
        questions: {
          create: originalQuiz.questions.map((question) => {
            const {
              id: originalQuestionId,
              items,
              quizId,

              ...questionDataToCopy
            } = question;

            return {
              ...questionDataToCopy,
              items: {
                create: items.map((item) => {
                  const { id, questionId, ...itemDataToCopy } = item;

                  return {
                    ...itemDataToCopy,
                  };
                }),
              },
            };
          }),
        },
      },
    });

    revalidatePath(pathname);
    
    // 5. Return the new quiz
    return {
      success: true,
      message: "Quiz copied successfully.",
      newQuiz,
    };
  } catch (e) {
    return {
      success: false,
      message: "An error occurred while copying the quiz.",
    };
  }
};
