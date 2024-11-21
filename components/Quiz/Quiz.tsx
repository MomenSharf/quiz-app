import { EditorQuiz } from "@/types";
import React from "react";
import QuizImage from "./QuizImage";
import QuizCard from "./QuizCard";

export default function Quiz({ quiz }: { quiz: EditorQuiz }) {
  
  return (
    <div className="flex flex-col p-3 items-center w-full ">
      <QuizCard quiz={quiz}/>
    </div>
  );
}
