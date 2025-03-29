"use client";
import { getSearchQuizzes } from "@/lib/actions/search";
import { HomeQuizzesArgs, SearchQuiz } from "@/types";
import { useEffect, useState } from "react";
import QuizzesCardsScroller from "../Quiz/QuizzesCardsScroller";
import QuizzesCardsScrollerSkeleton from "../Quiz/QuizzesCardsScrollerSkeleton";
import fakeQuizzesData from "@/fake-data/home-page-quizzes.json"; // Import JSON file

export default function Quizzes({ args }: { args: HomeQuizzesArgs[] }) {
  type HomeQuizzesState =
    | (HomeQuizzesArgs & {
        quizzes: SearchQuiz[] | null;
        order: number;
        isLoading: boolean;
      })
    | null;

  const [quizzes, setQuizzes] = useState<HomeQuizzesState[]>(() => {
    return args.map((args, i) => {
      return {
        ...args,
        quizzes: null,
        order: i,
        isLoading: true,
      };
    });
  });
  const [order, setOrder] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!quizzes[order]) {
        return;
      }
      const searchArgs = quizzes[order].args;
      const { success, quizzes: searchQuizzes } = await getSearchQuizzes(
        searchArgs
      );

      setQuizzes((prev) => {
        return prev.map((quiz) => {
          if (!quiz) return null;
          if (quiz.order === order && success && searchQuizzes) {
            return {
              ...quiz,
              quizzes: searchQuizzes,
              isLoading: false,
            };
          }
          return quiz;
        });
      });
      if (order < quizzes.length) setOrder((prev) => prev + 1);
    };

    if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
      setQuizzes(fakeQuizzesData as HomeQuizzesState[]);
    } else {
      fetchQuizzes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);
  return (
    <div className="flex flex-col gap-3">
      {quizzes &&
        quizzes.map((quiz) => {
          if (!quiz) return null;
          const { title, isLoading, quizzes, route } = quiz;
          if (!quizzes && isLoading)
            return (
              <QuizzesCardsScrollerSkeleton
                key={quiz.title}
                route={quiz.route}
                title={quiz.title}
              />
            );
          if (!quizzes) return null;

          return (
            <QuizzesCardsScroller
              key={title}
              quizzes={quizzes}
              title={title}
              route={route}
            />
          );
        })}
    </div>
  );
}
