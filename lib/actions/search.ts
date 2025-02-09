"use server";

import { Category, SearchQuiz, SearchSortOption } from "@/types";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { unstable_noStore as noStore } from "next/cache";
import { Prisma } from "@prisma/client";

export const getSearchQuizzes = async ({
  page = 1,
  pageSize = 15,
  query,
  sortOption,
  category,
  isBookmarked,
}: {
  page?: number;
  pageSize?: number;
  query?: string;
  sortOption?: SearchSortOption;
  category?: Category;
  isBookmarked?: boolean;
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

  const where : Prisma.QuizWhereInput =   {
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
  }

  const include = {
    user: true,
    bookmarks: userId
      ? {
          where: { userId }, // Include bookmarks only if userId exists
        }
      : undefined,
    questions: true,
    ratings: true,
  };

  const skip = (page - 1) * pageSize;

  const take = pageSize;

  try {
    let quizzes: SearchQuiz[];
    if (isBookmarked && userId) {
      
      const bookmarks = await db.bookmark.findMany({
        where: { userId, quiz: where },
        include: {
          quiz: { include },
        },
        skip,
        take,
        orderBy: {
          quiz: orderBy
        },
      });
      console.log('isb');
      
      quizzes = bookmarks.map((bookmark) => bookmark.quiz);
    } else {
      console.log('inob');
      if (!query) {
        return {
          success: true,
          message: "Query is required to search quizzes.",
          quizzes: [],
        };
      }
      quizzes = await db.quiz.findMany({
        where,
        include,
        skip,
        take,
        orderBy,
      });
    }
 
    if (!quizzes) {
      return { success: false, message: "No Quizzes found" };
    }

    if (quizzes.length === 0) {
      return { success: true, message: `No result for '${query}'`, quizzes };
    }
    

    return { success: true, quizzes };
  } catch (error) {
    console.log(error);
    
    return { success: false, message: "Error searching Quizzes" };
  }
};
