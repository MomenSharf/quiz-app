"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { FolderPathSegment, LibrarySortOption } from "@/types";

// Get
export const getLibraryQuizzes = async (
  sortOption: LibrarySortOption,
  folderId?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  try {
    const orderByMap: Record<LibrarySortOption, Record<string, string>> = {
      alphabetical: { title: "asc" },
      reverseAlphabetical: { title: "desc" },
      recentUpdate: { updatedAt: "desc" },
      recentCreate: { createdAt: "desc" },
      oldestCreate: { createdAt: "asc" },
      oldestUpdate: { updatedAt: "asc" },
    };

    const orderBy = orderByMap[sortOption];

    const quizzes = await db.quiz.findMany({
      where: { userId: session.user.id, folderId },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: orderBy,
    });
    if (!quizzes) {
      return {
        success: false,
        message: "Failed to fetch quizzes. Please try again later.",
      };
    }
    return { success: true, quizzes };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch quizzes. Please try again later.",
    };
  }
};

export const getLibraryFolders = async (
  sortOption: LibrarySortOption,
  parentId?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  try {
    const orderByMap: Record<LibrarySortOption, Record<string, string>> = {
      alphabetical: { title: "asc" },
      reverseAlphabetical: { title: "desc" },
      recentUpdate: { updatedAt: "desc" },
      recentCreate: { createdAt: "desc" },
      oldestCreate: { createdAt: "asc" },
      oldestUpdate: { updatedAt: "asc" },
    };

    const orderBy = orderByMap[sortOption];
    const folderWithQuizzes = await db.folder.findMany({
      where: { userId: session.user.id, parentId: parentId || null },
      include: {
        _count: {
          select: {
            quizzes: true,
            subfolders: true,
          },
        },
      },
      orderBy: orderBy,
    });
    if (!folderWithQuizzes) {
      return {
        success: false,
        message: "Failed to fetch folders. Please try again later.",
      };
    }
    return { success: true, folderWithQuizzes };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch folders. Please try again later.",
    };
  }
};
export const getDashboardFolder = async (
  sortOption: LibrarySortOption,
  folderId?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  try {
    const orderByMap: Record<LibrarySortOption, Record<string, string>> = {
      alphabetical: { title: "asc" },
      reverseAlphabetical: { title: "desc" },
      recentUpdate: { updatedAt: "desc" },
      recentCreate: { createdAt: "desc" },
      oldestCreate: { createdAt: "asc" },
      oldestUpdate: { updatedAt: "asc" },
    };

    const orderBy = orderByMap[sortOption];
    const folder = await db.folder.findFirst({
      where: { userId: session.user.id, id: folderId },
      include: {
        _count: {
          select: {
            quizzes: true,
          },
        },
        quizzes: {
          include: {
            _count: {
              select: {
                questions: true,
              },
            },
          },
          orderBy: orderBy,
        },
        subfolders: {
          include: {
            _count: {
              select: {
                subfolders: true,
                quizzes: true,
              },
            },
          },
          orderBy: orderBy,
        },
      },
    });
    if (!folder) {
      return {
        success: false,
        message: "Failed to fetch folder. Please try again later.",
      };
    }
    return { success: true, folder };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch folder. Please try again later.",
    };
  }
};

export async function getFolderPath(folderId?: string): Promise<{
  success: boolean;
  message: string;
  path?: FolderPathSegment[];
}> {
  try {
    const folder = await db.folder.findUnique({
      where: { id: folderId },
      include: { parent: true }, // Include the parent folder for recursion
    });

    if (!folder) {
      return {
        success: false,
        message: `Folder with ID ${folderId} not found.`,
      };
    }

    if (!folder.parentId) {
      // Base case: if the folder has no parent, return it as the root
      return {
        success: true,
        message: "Folder path fetched successfully.",
        path: [{ id: folder.id, title: folder.title }],
      };
    }

    // Recursive case: Get the parent's path and append the current folder
    const parentResponse = await getFolderPath(folder.parentId);

    if (!parentResponse.success) {
      return parentResponse; // Return the error response if the parent retrieval fails
    }

    return {
      success: true,
      message: "Folder path fetched successfully.",
      path: [...parentResponse.path!, { id: folder.id, title: folder.title }],
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the folder path.",
    };
  }
}

// Create
export const newQuiz = async ({
  folderId,
  pathname,
}: {
  folderId?: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quiz = await db.quiz.create({
      data: {
        userId: session.user.id,
        folderId,
        title: "My new Quiz",
        description: "",
        questions: {
          create: {
            type: "UNSELECTED",
            questionOrder: 0,
            timeLimit: 10000,
            points: 10,
          },
        },
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create quiz. Please try again later.",
    };
  }
};
export const newFolder = async ({
  title,
  parentId,
  pathname,
}: {
  title: string;
  parentId?: string;
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
        parentId,
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

// duplicate
export const duplicateQuiz = async ({
  quizId,
  pathname,
}: {
  quizId: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const originalQuiz = await db.quiz.findFirst({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      include: {
        questions: true,
      },
    });

    if (!originalQuiz) {
      return {
        success: false,
        message: "Failed to get quizz to duplicate. Please try again later.",
      };
    }

    const baseTitle = originalQuiz.title;

    const copyPattern = `${baseTitle} copy`;

    const similarQuizzes = await db.quiz.findMany({
      where: {
        title: {
          startsWith: copyPattern,
        },
      },
    });

    let maxCopyNumber = 0; // Start with 2 since the first copy is (2)
    similarQuizzes.forEach((quiz) => {
      const match = quiz.title.match(/\((\d+)\)$/); // Match the number in parentheses at the end
      if (match) {
        const copyNumber = parseInt(match[1], 10);
        if (copyNumber > maxCopyNumber) {
          maxCopyNumber = copyNumber;
        }
      }
    });

    const newQuizTitle = `${copyPattern} (${maxCopyNumber + 1})`;

    const {
      id,
      createdAt,
      updatedAt,
      visibility,
      title,
      playCount,
      completionCount,
      questions: orignalQuestions,
      ...data
    } = originalQuiz;

    const questions = orignalQuestions.map((question) => {
      const { id, quizId, ...questionData } = question;
      return questionData;
    });

    const quiz = await db.quiz.create({
      data: {
        title: newQuizTitle,
        ...data,
        questions: {
          create: questions,
        },
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {

    return {
      success: false,
      message: `Failed to delete duplicate quiz. Please try again later.`,
    };
  }
};

// Delete
export const deleteQuizzes = async ({
  quizzesIds,
  pathname,
}: {
  quizzesIds: string[];
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quizzes = await db.quiz.deleteMany({
      where: {
        id: {
          in: quizzesIds,
        },
        userId: session.user.id,
      },
    });

    revalidatePath(pathname);

    return { success: true, quizzes, message: "Successfly deleted!" };
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete ${
        quizzesIds.length === 1 ? "Quiz" : "Quizzes"
      }. Please try again later.`,
    };
  }
};
export const deleteFolder = async ({
  folderId,
  pathname,
}: {
  folderId: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const folder = await db.folder.deleteMany({
      where: {
        id: folderId,
        userId: session.user.id,
      },
    });

    revalidatePath(pathname);

    return { success: true, folder };
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete folder, Please try again later.`,
    };
  }
};

// Rename
export const renameQuiz = async ({
  pathname,
  quizId,
  title,
}: {
  pathname: string;
  quizId: string;
  title: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quiz = await db.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        title
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      message: `Failed to renaming Quiz. Please try again later.`,
    };
  }
};
export const renameFolder = async ({
  pathname,
  folderId,
  title,
}: {
  pathname: string;
  folderId: string;
  title: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quiz = await db.folder.update({
      where: {
        id: folderId,
      },
      data: {
        title
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {

    return {
      success: false,
      message: `Failed to renaming Folder. Please try again later.`,
    };
  }
};

// Reset
export const resetQuiz = async ({
  quizId,
  pathname,
}: {
  quizId: string;
  pathname: string;
}) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  try {
    const quiz = await db.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        title: "My new Quiz",
        description: "",
        categories: [],
        questions: {
          deleteMany: {},
        },
      },
    });

    revalidatePath(pathname);

    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      message: `Failed to reset Quiz. Please try again later.`,
    };
  }
};
