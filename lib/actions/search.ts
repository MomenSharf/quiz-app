"use server";

import { Category, SearchSortOption } from "@/types";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { unstable_noStore as noStore } from "next/cache";

export const getSearchQuizzes = async ({
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
      playCount: "desc",
    },
    mostPlayed: { playCount: "desc" },
    mostRecent: { createdAt: "asc" },
  };
  const orderBy = sortOption ? orderByMap[sortOption] : undefined;

  try {
    if (!query) {
      return {
        success: true,
        message: "Query is required to search quizzes.",
        quizzes: [],
      };
    }
    noStore();
    const quizzes = await db.quiz.findMany({
      where: {
        visibility: "PUBLIC",
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
        bookmarks: userId
          ? {
              where: { userId }, // Include bookmarks only if userId exists
            }
          : undefined,
        questions: true,
        ratings: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    });

    if (!quizzes) {
      return { success: false, message: "No Quizzes found" };
    }

    if (quizzes.length === 0) {
      return { success: true, message: `No result for '${query}'`, quizzes };
    }

    return { success: true, quizzes };
  } catch (error) {
    return { success: false, message: "Error searching Quizzes" };
  }
};
