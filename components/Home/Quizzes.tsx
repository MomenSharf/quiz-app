"use client";
import { getSearchQuizzes } from "@/lib/actions/search";
import { HomeQuizzesArgs, SearchQuiz } from "@/types";
import { useEffect, useState } from "react";
import QuizzesCardsScroller from "../Quiz/QuizzesCardsScroller";
import QuizzesCardsScrollerSkeleton from "../Quiz/QuizzesCardsScrollerSkeleton";

export default function Quizzes({ args }: { args: HomeQuizzesArgs[] }) {
  type gg =
    | (HomeQuizzesArgs & {
        quizzes: SearchQuiz[] | null;
        order: number;
        isLoading: boolean;
      })
    | null;

  const [quizzes, setQuizzes] = useState<gg[]>(() => {
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
      console.log(order);
      console.log(quizzes[order === 0 ? 0 : order - 1]);

      if (!quizzes[order]) {
        return;
      }
      const searchArgs = quizzes[order].args;
      const { success, quizzes: searchQuizzes } = await getSearchQuizzes(
        searchArgs
      );
      setQuizzes((prev) => {
        const ll = prev.map((quiz) => {
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

        return ll;
      });
      if (order < quizzes.length) setOrder((prev) => prev + 1);
    };
    fetchQuizzes();
  }, [order]);
  return (
    <div className="flex flex-col">
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
