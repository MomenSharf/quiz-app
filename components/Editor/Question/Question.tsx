import React from "react";
import Header from "./Header";
import { questionSchemaType } from "@/lib/validations/quizSchemas";

export default function Question({
  question,
  questionIndex,
}: {
  question: questionSchemaType;
  questionIndex: number;
}) {
  return (
    <div className="">
      <Header questionIndex={questionIndex} />
    </div>
  );
}
