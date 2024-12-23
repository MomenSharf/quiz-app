import { EditorQuiz, QuizDetails } from "@/types";
import React from "react";
import QuizImage from "./QuizImage";
import QuizCard from "./QuizCard";
export default function Quiz({ quiz, isBookmarked, pathname }: { quiz: QuizDetails , isBookmarked?: boolean, pathname: string}) {
  
  return (
    <div className="flex flex-col p-3 items-center w-full ">
      <QuizCard quiz={quiz} isBookmarked={isBookmarked} pathname={pathname}/>
    </div>
  );
}
