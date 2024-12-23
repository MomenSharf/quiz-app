import { BookmarkQuizIsBookmark, SearchQuiz, SearchQuizWithIsBookmark } from "@/types";
import React from "react";
import QuizPanel from "./QuizPanel";

export default function QuizzesPanelsTable({
  quizzes,
}: {
  quizzes: SearchQuizWithIsBookmark[] | BookmarkQuizIsBookmark[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {quizzes.map((quiz, i) => {
        return <QuizPanel quiz={quiz} index={i} key={quiz.id} />;
      })}
    </div>
  );
}
