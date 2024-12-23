"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";

export const toggleBookmark = async ({ quizId, pathname }: { quizId: string, pathname: string }) => {
  const session = await getCurrentUser();
  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }
  const userId = session.user.id;

  try {
    // Check if the quiz is already bookmarked
    const existingBookmark = await db.bookmark.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    if (existingBookmark) {
      // Remove bookmark if it exists
      await db.bookmark.delete({
        where: {
          id: existingBookmark.id, // Use the unique ID of the bookmark
        },
      });

      return {
        success: true,
        message: "Quiz removed from bookmarks.",
        bookmarked: false,
      };
    } else {
      // Add bookmark if it doesn't exist
      await db.bookmark.create({
        data: {
          userId,
          quizId,
        },
      });

      revalidatePath(pathname)

      return {
        success: true,
        message: "Quiz added to bookmarks.",
        bookmarked: true,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to toggle bookmark.",
    };
  }
};


export const isBoojkmarked = async ({
  quizId,
}: {
  quizId: string;
}) => {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return { success: false, message: "Unauthorized: User is not logged in." };
    }
    const userId = session.user.id;
    // Check if the quiz is bookmarked
    const existingBookmark = await db.bookmark.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    if (existingBookmark) {
      return {
        success: true,
        message: "Quiz is already bookmarked.",
      isBookmarked: true,
      };
    } else {
      return {
        success: false,
        message: "Quiz is not bookmarked.",
        isBookmarked: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error checking bookmark status.",
    };
  }
};
