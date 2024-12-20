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
};