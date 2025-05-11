"use server";

import {
  Category,
  SearchQuiz,
  SearchQuizessArgs,
  SearchSortOption,
} from "@/types";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { unstable_noStore as noStore } from "next/cache";
import { Prisma } from "@prisma/client";
import { PAGE_SIZE } from "@/constants";
import { fakeLongTimePromise } from "../utils";

export const getSearchQuizzes = async ({
  userId,
  page = 1,
  pageSize = PAGE_SIZE,
  query,
  sortOption,
  category,
  isBookmarked,
}: SearchQuizessArgs) => {
  const session = await getCurrentUser();
  const sessionUserId = session?.user?.id;

  const quizOrderByMap: Record<
    SearchSortOption | "random",
    Prisma.QuizFindManyArgs["orderBy"]
  > = {
    highestRated: { createdAt: "desc" }, //!!
    random: { id: "asc" },
    popular: [{ playCount: "desc" }, { createdAt: "desc" }],
    mostRecent: { createdAt: "asc" },
  };
  const bookmarkOrderByMap: Record<
    SearchSortOption | "random",
    | Prisma.BookmarkOrderByWithRelationInput
    | Prisma.BookmarkOrderByWithRelationInput[]
  > = {
    highestRated: { quiz: { createdAt: "desc" } }, //!!
    random: { quiz: { id: "asc" } },
    popular: { quiz: { playCount: "desc", createdAt: "desc" } },
    mostRecent: { quiz: { createdAt: "asc" } },
  };
  const quizOrderBy = sortOption ? quizOrderByMap[sortOption] : undefined;
  const bookmarkOrderBy = sortOption
    ? bookmarkOrderByMap[sortOption]
    : undefined;

  const where: Prisma.QuizWhereInput = {
    visibility: "PUBLIC",
    userId,
    AND: [
      {
        OR: query
          ? [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              // {
              //   description: {
              //     contains: query,
              //     mode: "insensitive",
              //   },
              // },
            ]
          : undefined,
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
  };

  const include = {
    user: true,
    bookmarks: sessionUserId
      ? {
          where: { userId: sessionUserId }, // Include bookmarks only if userId exists
        }
      : undefined,
    questions: true,
    ratings: true,
  };

  const skip = (page - 1) * pageSize;

  const take = pageSize;

  try {
    let quizzes: SearchQuiz[];
    if (isBookmarked && sessionUserId) {
      const bookmarks = await db.bookmark.findMany({
        where: { userId: sessionUserId, quiz: where },
        include: {
          quiz: { include },
        },
        skip,
        take,
        orderBy: bookmarkOrderBy,
      });
      quizzes = bookmarks.map((bookmark) => bookmark.quiz);
    } else {
      quizzes = await db.quiz.findMany({
        where,
        include,
        skip,
        take,
        orderBy: quizOrderBy,
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
