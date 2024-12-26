'use server'
import { getCurrentUser } from '../auth';
import { db } from '../db';

export const rateQuiz = async ({
  quizId,
  rate,
}: {
  quizId: string;
  rate: number;
}) => {
  const session = await getCurrentUser();
  const userId = session?.user.id;

  if (!userId) {
    return { success: false, message: 'User not authenticated' };
  }

  try {
    // Check if the user has already rated this quiz
    const existingRating = await db.rating.findFirst({
      where: { quizId, userId },
    });

    if (existingRating) {
      // Update the rating if it already exists
      await db.rating.update({
        where: { id: existingRating.id },
        data: { rate },
      });
    } else {
      // Create a new rating if it doesn't exist
      await db.rating.create({
        data: {
          quizId,
          userId,
          rate,
        },
      });
    }

    // Optionally, you can update the quiz's average rating or other properties here

    return { success: true, message: 'Quiz rated successfully' };
  } catch (error) {
    return { success: false, message: 'Could not rate the quiz' };
  }
};
