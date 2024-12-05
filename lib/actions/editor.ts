import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getEditorQuiz = async ({ quizId }: { quizId: string }) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const initialQuiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      include: {
        image: true,    
        questions: {
          include: {
            items: true,
            image: true,
          },
        },
      },
    });

    if(!initialQuiz) {
      return { success: false, message: "Quiz not found." };
    }

    return { success: true, initialQuiz };
  } catch (error) {
    return { success: false, message: "Error fetching quiz." };
  }
};