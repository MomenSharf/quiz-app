"use client";
import React from "react";
import PlayQuiz from "./PlayQuiz";
import { type EditorQuiz, PlayQuizType } from "@/types";
import { PlayQuizProvider } from "./Context";

export default function Provider({ quizProgress }: { quizProgress: PlayQuizType }) {
  return (
    <PlayQuizProvider quizProgress={quizProgress}>
      <PlayQuiz />
    </PlayQuizProvider>
  );
}
