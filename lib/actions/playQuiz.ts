'use server'
import { PlayQuizQuestion } from "@/components/PlayQuiz/Context";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getPlayQuiz = async (quizId: string) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    // Await the Prisma call to get the actual data
    let quizProgress = await db.quizProgress.findUnique({
      where: {
        userId_quizId: {
          userId: session.user.id,
          quizId: quizId,
        },
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                items: true,
              },
            },
            rates: true,
          },
        },
        user: true,
      },
    });

    // If not found, create a new QuizProgress record
    if (!quizProgress) {
      quizProgress = await db.quizProgress.create({
        data: {
          userId: session.user.id,
          quizId: quizId,
          currentQuestion: 0,
          isCompleted: false,
          startedAt: new Date(),
        },
        include: {
          quiz: {
            include: {
              questions: {
                include: {
                  items: true,
                },
              },
              rates: true,
            },
          },
          user: true,
        },
      });
    }

    return {success : true, quizProgress}

    // Return the quiz progress data (or handle it as needed)
  } catch (error) {
    return {success: false, message: 'Error while loading quiz data', error}
  }
}
export const saveQuizProgress = async (
  quizId: string,
  data: {
    playQuizQuestions: PlayQuizQuestion[];
    currentQuestion: number;
    isCompleted: boolean;
  }
) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  const filteredQuestions = data.playQuizQuestions.filter(
    (question) => question !== null
  );

  try {
    const quizProgress = await db.quizProgress.update({
      where: {
        userId_quizId: {
          userId: session.user.id,
          quizId,
        },
      },
      data: {
        currentQuestion: data.currentQuestion,
        playQuizQuestions: filteredQuestions,
        isCompleted: data.isCompleted,
      },
    });
    return { success: true, quizProgress };
  } catch (error) {
   return {success : false, message : 'Failed to get quiz'}
  }
};;