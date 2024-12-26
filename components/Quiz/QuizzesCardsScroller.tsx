import React from "react";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { SearchQuiz } from "@/types";
import QuizzesCard from "./QuizCard";

export default function QuizzesCardsScroller({
  quizzes,
  title,
}: {
  quizzes: SearchQuiz[];
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2>{title}</h2>
      <UseScrollerContainer>
        {quizzes.map((quiz, i) => (
          <QuizzesCard key={quiz.id} quiz={quiz} index={i} />
        ))}
      </UseScrollerContainer>
    </div>
  );
}
