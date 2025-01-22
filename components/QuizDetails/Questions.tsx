import { QuizDetails } from "@/types";
import React from "react";
import Question from "./Question";

export default function Questions({
  questions,
}: {
  questions: QuizDetails["questions"];
}) {

  return (
    <div className="flex flex-col gap-3 w-full">
      {questions.map((question) => {
        return <Question key={question.id} question={question} />;
      })}
    </div>
  );
}
