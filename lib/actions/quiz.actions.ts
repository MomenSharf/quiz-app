"use server";

import { UTApi } from "uploadthing/server";
import { db } from "../db";
import { QuestionValidtionType } from "../validations/Quiz";
import { QuestionsDefaultValues } from "@/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { Folder, Quiz } from "@prisma/client";
import { FolderPathSegment } from "@/types";
import { getCurrentUser } from "../auth";
import { redirect } from "next/navigation";

const utapi = new UTApi();



// Get
export const getGalleryQuizzes = async () => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  try {
    const quizzes = await db.quiz.findMany({
      where: {
        userId: session.user.id,
        folderId: null,
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        difficulty: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
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

    return quizzes;
  } catch (error) {
    console.log(error);
  }
};
export const getGalleryFolders = async () => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  } 

  try {
    const folders = await db.folder.findMany({
      where: {
        userId: session.user.id,
        parentId: null,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            quizzes: true,
          },
        },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });
    return folders;
  } catch (error) {}
};
export const getQuiz = async (quizId: string) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  try {
    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        userId: session.user.id
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        difficulty: true,
        visibility: true,
        categories: true,
        updatedAt: true,
        createdAt: true,
        questions: true,
        user: {
          select: {
            email: true,
            name: true,
            image: true,            
          }
        }

      },
    });

    return quiz;
  } catch (error) {
    console.log(error);
  }
};
export const getFolder = async (folderId: string) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  } 

  try {
    const folder = await db.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        quizzes: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            difficulty: true,
            visibility: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                questions: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
        subfolders: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                quizzes: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });
    return folder;
  } catch (error) {}
};

// New
export const newQuiz = async (
  pathname: string,
  folderId?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  try {
    const myQuiz = await db.quiz.create({
      data: {
        userId: session.user.id,
        folderId,
        title: "My new Quiz",
        description: "",
        categories: [],
        difficulty: "EASY",
      },
    });

    if (myQuiz) {
      revalidatePath(pathname);
    }

    return myQuiz.id;
  } catch (error) {
    console.log(error);
  }
};
export const newFolder = async (
  pathname: string,
  title?: string,
  parentId?: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  try {
    const myFolder = await db.folder.create({
      data: {
        userId: session.user.id,
        parentId,
        title: title || "New Folder",
      },
    });

    if (myFolder) {
      revalidatePath(pathname);
    }

    return myFolder.id;
  } catch (error) {
    console.log(error);
  }
};

// Delete
export const deleteQuizzes = async (quizzesIds: string[], pathname: string) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  try {
    const deletedQuizzes = await db.quiz.deleteMany({
      where: {
        id: {
          in: quizzesIds,
        },
        userId: session.user.id
      },
    });

    revalidatePath(pathname);

    return deletedQuizzes.count;
  } catch (error) {
    console.log(error);
    throw new Error("Quiz not Deleted, try again");
  }
};

export async function deleteFolderAndSubfolders(folderId: string, pathname: string) {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  const deleteSubfolders = async (id: string) => {
    try {
      // Delete quizzes within the current folder
      await db.quiz.deleteMany({
        where: { folderId: id, userId: session.user.id },
      });

      // Fetch subfolders
      const subfolders = await db.folder.findMany({
        where: { parentId: id, userId: session.user.id },
      });

      // Recursively delete each subfolder
      for (const subfolder of subfolders) {
        await deleteSubfolders(subfolder.id); // Recursive call
      }

      // Delete the folder itself
      const folder = await db.folder.delete({
        where: { id , userId: session.user.id},
      });

      return folder.id
    } catch (error) {
      console.error(`Error deleting folder with id ${id}:`, error);
      throw error; // Rethrow the error to handle it in the outer scope
    }
  };

  try {
    // Start the deletion process
    const id = await deleteSubfolders(folderId);

    revalidateTag(pathname)
    return id
  } catch (error) {
    console.error(`Error deleting folder and subfolders for id ${folderId}:`, error);
    // Handle the error (e.g., rollback transaction, notify user, etc.)
  }
}


// Visibility
export const toggleQuizVisibility = async (
  quizId: string,
  pathname: string,
  visibility: "PUBLIC" | "PRIVATE"
) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  try {
    const updatedQuiz = await db.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id
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



export async function getFolderPath(folderId: string): Promise<FolderPathSegment[]> {
  const getPathRecursive = async (id: string): Promise<FolderPathSegment[]> => {
    const session = await getCurrentUser();

    if (!session) {
      throw new Error("Unauthorized: User is not logged in.");
    }
    try {
      // Fetch the folder by id
      const folder = await db.folder.findUnique({
        where: { id , userId: session.user.id},
        select: {
          title: true,
          parentId: true,
        },
      });

      if (!folder) {
        throw new Error(`Folder with id ${id} not found.`);
      }

      // If the folder has no parent, return its title
      if (!folder.parentId) {
        return [{ id, title: folder.title }];
      }

      // Recursively get the path of the parent folder
      const parentPath = await getPathRecursive(folder.parentId);

      // Combine parent path with current folder's title
      return [...parentPath, { id, title: folder.title }];
    } catch (error) {
      console.error(`Error getting path for folder with id ${id}:`, error);
      throw error; // Rethrow the error to handle it in the outer scope
    }
  };

  // Start the path retrieval process
  return await getPathRecursive(folderId);
}


export const deleteImages = async (images: string[]) => {
  try {
    await utapi.deleteFiles(images);
  } catch (error) {
    console.log({
      error: error,
    });
  }
};
