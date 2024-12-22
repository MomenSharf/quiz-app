"use server";

import { db } from "../db";

export const searchQuizzes = async (query: string) => {
  try {
    const quizzes = await db.quiz.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!quizzes) {
      return { success: false, message: "No Quizzes found" };
    }

    return { success: true, quizzes };
  } catch (error) {
    return { success: false, message: "Error searching Quizzes" };
  }
};
