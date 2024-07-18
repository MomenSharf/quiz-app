"use server";

import { UTApi } from "uploadthing/server";
import { db } from "../db";
import { QuestionValidtionType } from "../validations/Quiz";

const utapi = new UTApi();

export async function createQuiz(
  quiz: any,
  questions: QuestionValidtionType[]
) {
  try {
    const quizCreated = await db.quiz.create({
      data: quiz,
    });

    questions.forEach(async (question) => {
      await db.question.create({
        data: {
          quizId: quizCreated.id,
          ...question,
        },
      });
    });

    return quizCreated;
  } catch (error) {
    console.log({
      error: error
    });
  }
}

export const deleteImages = async (images: string[]) => {
  try {
    await utapi.deleteFiles(images);
  } catch (error) {
    console.log({
      error: error
    });
  }
};
