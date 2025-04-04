"use server";

import { unstable_noStore as noStore } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const getQuizDetails = async ({ quizId }: { quizId: string }) => {
  noStore();
  const session = await getCurrentUser();
  const userId = session?.user.id;

  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        user: true,
      },
    });
    const quizDetails = await db.quiz.findFirst({
      where: {
        id: quizId,
        visibility: userId === quiz?.user.id ? undefined : "PUBLIC",
      },
      include: {
        user: true,
        bookmarks: userId
          ? {
              where: { userId }, // Include bookmarks only if userId exists
            }
          : undefined,
        questions: {
          include: {
            items: true,
          },
        },
        ratings: true,
      },
    });

    if (!quizDetails) {
      return { success: false, message: "Quiz not found" };
    }

    const quizDetailsWithIsBookmark = quizDetails
      ? {
          ...quizDetails,
          isBookmark:
            userId && quizDetails && quizDetails.bookmarks
              ? quizDetails.bookmarks.length > 0
              : false,
        }
      : null;

    return {
      success: true,
      quizDetails: quizDetailsWithIsBookmark,
    };
  } catch (error) {
    return { success: false, message: "Could not retrieve quiz details" };
  }
};

// export const copyQuiz = async (quizId: string) => {
//   const session = await getCurrentUser();

//   // 1. Ensure the user is logged in
//   if (!session) {
//     return { success: false, message: "Unauthorized: User is not logged in." };
//   }

//   try {
//     // 2. Fetch the original quiz and its relations
//     const originalQuiz = await db.quiz.findUnique({
//       where: { id: quizId },
//       include: {
//         questions: {
//           include: {
//             items: true, // Fetch question items
//           },
//         },
//       },
//     });

//     if (!originalQuiz) {
//       return { success: false, message: "Quiz not found." };
//     }

//     // 3. Destructure quiz data to exclude unnecessary fields
//     const {
//       id: originalQuizId,
//       createdAt,
//       updatedAt,
//       userId,
//       folderId,
//       visibility,
//       questions,
//       ...quizDataToCopy
//     } = originalQuiz;

//     // 4. Copy the quiz
//     const newQuiz = await db.quiz.create({
//       data: {
//         ...quizDataToCopy,
//         title:
//           quizDataToCopy.title.length <= MAX_QUIZ_TITLE_LENGTH - 7
//             ? `${quizDataToCopy.title.length} (Copy)`
//             : quizDataToCopy.title, // Append "(Copy)" to the title
//         userId: session.user.id, // Assign ownership to the current user
//         visibility: "PRIVATE", // Set visibility to PRIVATE
//         questions: {
//           create: originalQuiz.questions.map((question) => {
//             const {
//               id: originalQuestionId,
//               items,
//               quizId,

//               ...questionDataToCopy
//             } = question;

//             return {
//               ...questionDataToCopy,
//               items: {
//                 create: items.map((item) => {
//                   const { id, questionId, ...itemDataToCopy } = item;

//                   return {
//                     ...itemDataToCopy,
//                   };
//                 }),
//               },
//             };
//           }),
//         },
//       },
//     });

//     // 5. Return the new quiz
//     return {
//       success: true,
//       message: "Quiz copied successfully.",
//       newQuiz,
//     };
//   } catch (e) {
//     return {
//       success: false,
//       message: "An error occurred while copying the quiz.",
//     };
//   }
// };
