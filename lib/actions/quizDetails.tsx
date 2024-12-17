"use server";

import { QuizDetails } from "@/types";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getQuizDetails = async ({ quizId }: { quizId: string }) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quizDetails = await db.quiz.findFirst({
      where: { id: quizId },
      include: {
        user: true,
        image: true,
        questions: {
          include: {
            image: true,
            _count: true,
            items: true,
          },
        },
      },
    });

    return { success: true, quizDetails };
  } catch (error) {
    return { success: false, message: "Could not retrieve quiz details" };
  }
};

// export const copyQuiz = async (quizId: string) => {
//   const session = await getCurrentUser();

//   if (!session) {
//     return { success: false, message: "Unauthorized: User is not logged in." };
//   }

//   const originalQuiz = await db.quiz.findUnique({
//     where: { id: quizId },
//     include: {
//       image: true,
//       questions: {
//         include: { image: true, items: true },
//       },
//     },
//   });

//   if (!originalQuiz) {
//     return { success: false, message: "Quiz not found" };
//   }

//   const { id, createdAt, updatedAt, userId, folderId, ...dataToCopy } =
//     originalQuiz;
// };


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const copyQuiz = async (quizId: string) => {
  const session = await getCurrentUser();

  // 1. Ensure the user is logged in
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    // 2. Fetch the original quiz and its relations
    const originalQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        image: true, // Fetch quiz image
        questions: {
          include: {
            image: true, // Fetch question images
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
      imageId,
      image,
      visibility,
      questions,
      ...quizDataToCopy
    } = originalQuiz;

    // 4. Copy the quiz
    const newQuiz = await prisma.quiz.create({
      data: {
        ...quizDataToCopy,
        title: `${quizDataToCopy.title} (Copy)`, // Append "(Copy)" to the title
        userId: session.user.id, // Assign ownership to the current user
        visibility: "PRIVATE", // Set visibility to PRIVATE
        createdAt: new Date(),
        updatedAt: new Date(),
    
        // Copy the quiz image using connectOrCreate
        image: image
          ? {
              connectOrCreate: {
                where: { id: image.id },
                create: { url: image.url },
              },
            }
          : undefined, // Use undefined instead of null
    
        // Copy all questions
        questions: {
          create: originalQuiz.questions.map((question) => {
            const {
              id: originalQuestionId,
              image,
              items,
              quizId,
              imageId,
              ...questionDataToCopy
            } = question;
    
            return {
              ...questionDataToCopy,
              createdAt: new Date(),
              updatedAt: new Date(),
    
              // Copy question image
              // image: image
              //   ? {
              //       connectOrCreate: {
              //         where: { id: image.id },
              //         create: { url: image.url },
              //       },
              //     }
              //   : undefined, // Use undefined instead of null
    
              // Copy question items
              items: {
                create: 
                items.map((item) => {
                  const { id, imageId, ...itemDataToCopy } = item;
    
                  return {
                    ...itemDataToCopy,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  };
                }),
              },
            };
          }),
        },
      },
    });
    
    

    // 5. Return the new quiz
    return {
      success: true,
      message: "Quiz copied successfully.",
      newQuiz,
    };
  } catch (e) {
    console.error("Error copying quiz:", e);

    return {
      success: false,
      message: "An error occurred while copying the quiz.",
    };
  }
};

