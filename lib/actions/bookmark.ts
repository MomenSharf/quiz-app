"use server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { Category, SearchSortOption } from "@/types";

export const getBookmarksQuizzes = async ({
  page = 1,
  pageSize = 10,
  query,
  sortOption,
  category,
}: {
  page?: number;
  pageSize?: number;
  query?: string;
  sortOption?: SearchSortOption;
  category?: Category;
}) => {
  noStore()
  const session = await getCurrentUser();

  if (!session) {
    return { success: false, message: "Unauthorized: User is not logged in." };
  }

  const userId = session.user.id;

  const orderByMap: Record<SearchSortOption | "random", Record<string, any>> = {
    highestRated: { createdAt: "desc" },
    random: { createdAt: "desc" },
    mostPlayed: { playCount: "desc" },
    mostRecent: { createdAt: "asc" },
  };
  const orderBy = sortOption ? orderByMap[sortOption] : undefined;

  try {
    // Fetch quizzes from bookmarks
    const bookmarks = await db.bookmark.findMany({
      where: {
        userId,
        quiz: {
          visibility: 'PUBLIC',
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
            ...(category
              ? [
                  {
                    categories: {
                      has: category,
                    },
                  },
                ]
              : []),
          ],
        },
      },
      include: {
        quiz: {
          include: {
            user: true,
            questions: true,
            bookmarks: userId
              ? {
                  where: { userId }, // Include bookmarks only if userId exists
                }
              : undefined,
            ratings: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        quiz: orderBy,
      },
    });

    if (!bookmarks) {
      return { success: false, message: "No Quizzes found" };
    }

    const quizzes = bookmarks.map((bookmark) => bookmark.quiz);

    return { success: true, quizzes: quizzes };
  } catch (error) {
    return { success: false, message: "Error geting quizzes." };
  }
};

export const toggleBookmark = async ({
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

      revalidatePath(pathname);

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

