"use server";

import { SearchSortOption } from "@/types";
import { db } from "../db";
import { Category } from "@prisma/client";

export const searchQuizzes = async ({
  query,
  sortOption,
  category,
}: {
  query?: string;
  sortOption?: SearchSortOption;
  category?: Category;
}) => {
  const orderByMap: Record<SearchSortOption | "random", Record<string, any>> = {
    highestRated: { createdAt: "desc" }, //!!
    random: { createdAt: "desc" }, // !!
    mostPlayed: { playCount: "desc" },
    mostRecent: { createdAt: "desc" },
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
        questions: {
          include: {
            _count: true,
          },
        },
        rates: true,
      },
      orderBy,
    });

    if (!quizzes) {
      return { success: false, message: "No Quizzes found" };
    }

    return { success: true, quizzes };
  } catch (error) {
    return { success: false, message: "Error searching Quizzes" };
  }
};
