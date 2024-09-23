"use server";

import { FolderPathSegment } from "@/types";
import { QuestionType } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { imageSchemaType, quizSchemaType } from "../validations/quizSchemas";
import { VISIBILITY_OPTIONS } from "@/constants";

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
        image: true,
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
    console.error("Failed to fetch quizzes:", error);
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
  } catch (error) {
    console.error("Failed to fetch folders:", error);
  }
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
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        visibility: true,
        categories: true,
        createdAt: true,
        updatedAt: true,
        questions: {
          include: {
            image: true,
            items: true,
          },
        },
        user: true,
      },
    });

    return quiz;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
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
        userId: session.user.id,
      },
      include: {
        quizzes: {
          select: {
            id: true,
            title: true,
            image: true,
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
  } catch (error) {
    console.error("Failed to fetch folder:", error);
  }
};

// New
export const newQuiz = async (pathname: string, folderId?: string) => {
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
        questions: {
          create: {
            type: "UNSELECTED",
            questionOrder: 0,
            timeLimit: 5,
            points: 1
          },
        },
      },
    });

    if (myQuiz) {
      revalidatePath(pathname);
    }

    return myQuiz.id;
  } catch (error) {
    console.error("Failed to create quiz:", error);
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
    console.error("Failed to create folder:", error);
  }
};

// Updata
export const saveQuiz = async (
  quizId: string,
  data: quizSchemaType,
  pathname: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  try {
    const quizData = {
      categories: data.categories,
      title: data.title,
      description: data.description,
      visibility: data.visibility,
    };

    const questions = data.questions
      .map((question) => {
        switch (question.type) {
          case QuestionType.UNSELECTED:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
            };

          case QuestionType.PICK_ANSWER:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: {
                create: question.image
                  ? {
                      url: question.image.url,
                      uploadthingId: question.image.uploadthingId,
                    }
                  : undefined,
              },
              question: question.question ?? "",
              items: {
                create: question.items.map((e) => ({
                  text: e.text,
                  isCorrect: e.isCorrect,
                })),
              },
            };

          case QuestionType.TRUE_FALSE:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: question.image
                ? {
                    create: {
                      uploadthingId: question.image?.uploadthingId,
                      url: question.image?.url,
                    },
                  }
                : undefined,
              question: question.question ?? "",
              correctAnswer: (question.correctAnswer ?? "true") as
                | "true"
                | "false",
            };

          case QuestionType.FILL_IN_THE_BLANK:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: question.image
                ? {
                    create: {
                      uploadthingId: question.image?.uploadthingId,
                      url: question.image?.url,
                    },
                  }
                : undefined,
              question: question.question ?? "",
              items: {
                create: question.items.map((e) => ({
                  text: e.text,
                  isBlank: e.isBlank,
                })),
              },
            };

          case QuestionType.SHORT_ANSWER:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: question.image
                ? {
                    create: {
                      uploadthingId: question.image?.uploadthingId,
                      url: question.image?.url,
                    },
                  }
                : undefined,
              question: question.question ?? "",
              correctAnswer: question.correctAnswer ?? "",
            };

          case QuestionType.MATCHING_PAIRS:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: question.image
                ? {
                    create: {
                      uploadthingId: question.image?.uploadthingId,
                      url: question.image?.url,
                    },
                  }
                : undefined,
              question: question.question ?? "",
              items: {
                create: question.items.map((e) => ({
                  text: e.text,
                  match: e.match,
                })),
              },
            };

          case QuestionType.ORDER:
            return {
              type: question.type,
              questionOrder: question.questionOrder,
              timeLimit: question.timeLimit,
              points: question.points,
              image: question.image
                ? {
                    create: {
                      uploadthingId: question.image?.uploadthingId,
                      url: question.image?.url,
                    },
                  }
                : undefined,
              question: question.question ?? "",
              items: {
                create: question.items.map((e) => ({
                  text: e.text,
                  order: e.order,
                })),
              },
            };

          default:
            return {
              type: QuestionType.UNSELECTED,
              questionOrder: 0,
            };
        }
      })
      .filter((question) => question.type !== "UNSELECTED");

    const quiz = await db.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      data: {
        ...quizData,
        questions: {
          deleteMany: {}, 
          create: questions,
        },
      },
    });

    if (quiz) {
      revalidatePath(pathname);
      return quiz;
    } else {
      throw new Error("An error happened while updating the quiz.");
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error happened: ${error.message}`);
  }
};

// Delete
export const deleteQuizzes = async (quizzesIds: string[], pathname: string) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  try {
    console.log(quizzesIds);

    const deletedQuizzes = await db.quiz.deleteMany({
      where: {
        id: {
          in: quizzesIds,
        },
        userId: session.user.id,
      },
    });

    revalidatePath(pathname);

    return deletedQuizzes.count;
  } catch (error) {
    console.log(error);
    throw new Error("Quiz not Deleted, try again");
  }
};
export const deleteFolderAndSubfolders = async (
  id: string,
  pathname: string
) => {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  try {
    await db.$transaction(async (prisma) => {
      // Delete all quizzes associated with the folder and its subfolders
      await prisma.quiz.deleteMany({
        where: {
          OR: [{ folderId: id }, { folder: { parentId: id } }],
          userId: session.user.id,
        },
      });

      // Delete all subfolders
      await prisma.folder.deleteMany({
        where: {
          parentId: id,
          userId: session.user.id,
        },
      });

      // Finally, delete the folder itself
      await prisma.folder.delete({
        where: {
          id,
          userId: session.user.id,
        },
      });
    });

    revalidatePath(pathname);
  } catch (error) {
    console.error("Failed to delete folder and subfolders:", error);
  }
};

// Visibility
export const toggleQuizVisibility = async (
  quizId: string,
  pathname: string,
  visibility: (typeof VISIBILITY_OPTIONS)[number]
) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  try {
    const updatedQuiz = await db.quiz.update({
      where: {
        id: quizId,
        userId: session.user.id,
      },
      data: {
        visibility: visibility === "PRIVATE" ? "PUBLIC" : "PRIVATE",
      },
    });

    revalidatePath(pathname);

    return updatedQuiz;
  } catch (error) {
    console.error("Failed to toggle quiz visibility:", error);
  }
};

export async function getFolderPath(
  folderId: string
): Promise<FolderPathSegment[]> {
  const getPathRecursive = async (id: string): Promise<FolderPathSegment[]> => {
    const session = await getCurrentUser();

    if (!session) {
      throw new Error("Unauthorized: User is not logged in.");
    }
    try {
      // Fetch the folder by id
      const folder = await db.folder.findUnique({
        where: { id, userId: session.user.id },
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

export const saveImage = async (
  image: Pick<imageSchemaType, "url" | "uploadthingId">
) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  return await db.image.create({
    data: {
      userId: session.user.id,
      ...image,
    },
  });
};
export const deleteImages = async (images: string[]) => {
  try {
    await utapi.deleteFiles(images);
  } catch (error) {
    console.error("Failed to save image:", error);
  }
};

export async function revalidatePathInServer(pathname: string) {
  try {
    revalidatePath(pathname);
    return {
      success: true,
      message: `Path ${pathname} revalidated successfully.`,
    };
  } catch (error) {
    console.error(`Failed to revalidate path ${pathname}:`, error);
    throw new Error(`Failed to revalidate path ${pathname}.`);
  }
}
