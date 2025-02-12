"use server";

import { Category, SearchQuiz, SearchQuizessArgs } from "@/types";
import { db } from "../db";
import { CATEGORIES, HOME } from "@/constants";
import { getSearchQuizzes } from "./search";
import { getRandomItems } from "../utils";
const TAKE = 12;

export const getRecentlyPublishedQuizzes = async () => {
  try {
    const quizzes = await db.quiz.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      take: TAKE,
    });

    if (quizzes) {
      return quizzes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const getPopularQuizzes = async () => {
  try {
    const quizzes = await db.quiz.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc", playCount: "desc" },
      take: TAKE,
    });

    if (quizzes) {
      return quizzes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const getBestRatedQuizzes = async () => {
  try {
    const bestRatedQuizzes = await db.rating.groupBy({
      by: ["quizId"],
      _avg: {
        rate: true,
      },
      orderBy: {
        _avg: {
          rate: "desc",
        },
      },
      take: TAKE, // Get the top 10 best-rated quizzes
    });

    const quizzes = await db.quiz.findMany({
      where: {
        id: { in: bestRatedQuizzes.map((r) => r.quizId) },
      },
      include: {
        ratings: {
          select: { rate: true },
        },
      },
    });

    if (quizzes) {
      return quizzes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getHomeQuizzes = async () => {
  try {
    const categories: {
      title: string;
      args: SearchQuizessArgs;
      route: string;
    }[] = getRandomItems(CATEGORIES, 3).map((category) => ({
      title: category
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      args: { category, sortOption: "popular" },
      route: `/search?category=${category}`,
    }));

    // const results = await Promise.all(
    //   [...HOME, ...categories].map(async ({ title, args, route }) => {
    //     const { success, quizzes } = await getSearchQuizzes(args);
    //     if (quizzes && success && quizzes.length > 0) {
    //       return { title, quizzes, route };
    //     } else {
    //       return null;
    //     }
    //   })
    // );

    // for (const { title, args, route } of allItems) {
    //   const { success, quizzes } = await getSearchQuizzes(args);
    //   if (quizzes && success && quizzes.length > 0) {
    //     results.push({ title, quizzes, route });
    //   }
    // }
    const allItems = [...HOME, ...categories];
    const results: {
      title: string;
      quizzes: SearchQuiz[];
      route: string;
    }[] = [];

    const timeout = new Promise<
      { title: string; quizzes: any; route: string }[]
    >((resolve) => setTimeout(() => resolve(results), 5000));

    // Function to fetch quizzes one by one
    const fetchQuizzes = async () => {
      for (const { title, args, route } of allItems) {
        const { success, quizzes } = await getSearchQuizzes({...args, page: 6});
        if (quizzes && success && quizzes.length > 0) {
          results.push({ title, quizzes, route });
        }
      }
      return results;
    };

    return await Promise.race([fetchQuizzes(), timeout]);
  } catch (error: any) {
    console.log(error);
    
    return null;
  }
};

export const getHomeQuizzesByCategories = async (categories: Category[]) => {
  try {
    const bestRatedQuizzes = await db.rating.groupBy({
      by: ["quizId"],
      _avg: {
        rate: true,
      },
      orderBy: {
        _avg: {
          rate: "desc",
        },
      },
      take: TAKE, // Get the top 10 best-rated quizzes
    });

    const quizzes = await db.quiz.findMany({
      where: {
        id: { in: bestRatedQuizzes.map((r) => r.quizId) },
      },
      include: {
        ratings: {
          select: { rate: true },
        },
      },
    });

    if (quizzes) {
      return quizzes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
