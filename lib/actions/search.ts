"use server";

import { SearchSortOption } from "@/types";
import { db } from "../db";
import { Category } from "@prisma/client";
import { getCurrentUser } from "../auth";

export const searchQuizzes = async ({
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
  const userId = session?.user?.id;

  const orderByMap: Record<SearchSortOption | "random", Record<string, any>> = {
    highestRated: { createdAt: "desc" }, //!!
    random: {
      playCount: 'desc', 
    }, 
    mostPlayed: { playCount: "desc" },
    mostRecent: { createdAt: "asc" },
  };
  const orderBy = sortOption ? orderByMap[sortOption] : undefined;

  try {
    if (!query) {
      return {
        success: false,
        message: "Query is required to search quizzes.",
      };
    }
    const quizzes = await db.quiz.findMany({
      where: {
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
      include: {
        user: true,
        bookmark: userId
          ? {
              where: { userId }, // Include bookmarks only if userId exists
            }
          : false,
        questions: {
          include: {
            _count: true,
          },
        },
        ratings: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    });

    if (!quizzes) {
      return { success: false, message: "No Quizzes found" };
    }
    const quizzesWithIsBookmarked = quizzes.map((quiz) => ({
      ...quiz,
      isBookmark: userId && quiz.bookmark ? quiz.bookmark.length > 0 : false, // Add isBookmark based on the user
    }));

    return { success: true, quizzes: quizzesWithIsBookmarked };
  } catch (error) {
    return { success: false, message: "Error searching Quizzes" };
  }
};
