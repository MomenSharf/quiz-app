"use server";

import { UTApi } from "uploadthing/server";
import { db } from "../db";
import { QuestionValidtionType } from "../validations/Quiz";
import { QuestionsDefaultValues } from "@/constants";
import { revalidatePath } from "next/cache";

const utapi = new UTApi();

export const getMyQuizzes = async (authorId: string) => {
  try {
    const myQuizzes = await db.quiz.findMany({
      where: {
        authorId,
      },
      include: {
        questions: true,
      },
    });

    return myQuizzes;
  } catch (error) {}
};
export const newQuiz = async (userId: string, pathname: string) => {
  try {
    const myQuizzes = await db.quiz.create({
      data: {
        authorId: userId,
        title: "My new Quiz",
        description: "",
        categories: [],
        difficulty: "EASY",
      },
    });

    if (myQuizzes) {
      revalidatePath(pathname);
    }

    return myQuizzes.id;
  } catch (error) {
    console.log(error);
  }
};

export async function createQuiz(
  quiz: any,
  questions: QuestionValidtionType[]
) {
  try {
    const quizCreated = await db.quiz.create({
      data: quiz,
    });

    // questions.forEach(async (question) => {
    //   await db.question.create({
    //     data: {
    //       quizId: quizCreated.id,
    //       ...question,
    //     },
    //   });
    // });

    return quizCreated;
  } catch (error) {
    console.log({
      error: error,
    });
  }
}

export const deleteQuizzes = async (quizzesIds: string[], pathname: string) => {
  try {
    const deletedQuizzes = await db.quiz.deleteMany({
      where: {
        id: {
          in: quizzesIds,
        },
      },
    });

    revalidatePath(pathname);

    return deletedQuizzes;
  } catch (error) {
    console.log(error);
  }
};

export const toggleQuizVisibility = async (
  quizId: string,
  pathname: string,
  visibility: "PUBLIC" | "PRIVATE"
) => {
  try {
    const updatedQuiz = await db.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        visibility: visibility === "PRIVATE" ? "PUBLIC" : "PRIVATE",
      },
    });

    revalidatePath(pathname);

    return updatedQuiz;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImages = async (images: string[]) => {
  try {
    await utapi.deleteFiles(images);
  } catch (error) {
    console.log({
      error: error,
    });
  }
};
