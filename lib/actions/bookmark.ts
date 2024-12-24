"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { db } from "../db";
import { Category, SearchSortOption } from "@/types";

export const bookmarksQuizzes = async ({
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
    const bookmarkedQuizzes = await db.bookmark.findMany({
      where: {
        userId,
        quiz: {
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

    const quizzesWithIsBookmarked = bookmarkedQuizzes.map(({ quiz }) => ({
      ...quiz,
      isBookmark: true,
    }));

    return { success: true, quizzes: quizzesWithIsBookmarked };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error searching quizzes." };
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

export const isBoojkmarked = async ({ quizId }: { quizId: string }) => {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return {
        success: false,
        message: "Unauthorized: User is not logged in.",
      };
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
