"use server";

import { Quiz } from "@prisma/client";
import { getCurrentUser } from "../auth";
import { QuizValidtion } from "../validations/Quiz";

type createQuizParams = {
  userId: string;
  quiz: Quiz;
  pathname: string;
};

export const createQuiz = async ({ userId, quiz, pathname }: createQuizParams) => {

  try {

    const {} = QuizValidtion.parse(quiz)

  } catch (error) {
    console.log(error);
  }

  
};
