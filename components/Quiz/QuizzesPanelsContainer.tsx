import { Category, SearchQuiz, SearchSortOption } from "@/types";
import React from "react";
import QuizzesPanelsTable from "./QuizzesPanelsTable";
import MoreSearchQuizzes from "../Search/MoreSearchQuizzes";

export default function QuizzesPanelsContainer({
  userId,
  quizzes,
  query,
  category,
  sortOption,
  isBookmarked,
}: {
  userId?: string;
  quizzes: SearchQuiz[];
  query?: string;
  category?: Category;
  sortOption?: SearchSortOption;
  isBookmarked?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <QuizzesPanelsTable quizzes={quizzes} />
      <MoreSearchQuizzes
        query={query}
        category={category}
        sortOption={sortOption}
        isBookmarked={isBookmarked}
        userId={userId}
      />
    </div>
  );
}
