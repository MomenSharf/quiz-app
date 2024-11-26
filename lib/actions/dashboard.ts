"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const getDashboardQuizzes = async () => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  try {
    const quizzes = await db.quiz.findMany({
      where: { userId: session.user.id, folderId: null },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return { success: true, quizzes };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch quizzes. Please try again later.",
    };
  }
};
export const getDashboardFoldersWithQuizzes = async () => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  try {
    const folderWithQuizzes = await db.folder.findMany({
      where: { userId: session.user.id },
      include: {
        quizzes: {
          include: {
            _count: {
              select: {
                questions: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return { success: true, folderWithQuizzes };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch folders. Please try again later.",
    };
  }
};

export const newQuiz = async ({
  folderId = null,
  pathname,
}: {
  folderId: string | null;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const myQuiz = await db.quiz.create({
      data: {
        userId: session.user.id,
        folderId,
        title: "My new Quiz",
        description: "",
        categories: [],
        questions: {
          create: {
            type: "UNSELECTED",
            questionOrder: 0,
            timeLimit: 5000,
            points: 10,
          },
        },
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz: myQuiz };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create quiz. Please try again later.",
    };
  }
};
export const newFolder = async ({
  title,
  parentId = null,
  pathname,
}: {
  title: string;
  parentId: string | null;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const folder = await db.folder.create({
      data: {
        userId: session.user.id,
        title: title || "New Folder",
        parentId
      },
    });

    revalidatePath(pathname);

    return { success: true, folder: folder };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create folder. Please try again later.",
    };
  }
};
