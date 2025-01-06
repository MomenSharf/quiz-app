"use client";
import React from "react";
import PlayQuiz from "./PlayQuiz";
import { type EditorQuiz, PlayQuizMode, PlayQuizType } from "@/types";
import { PlayQuizProvider } from "./Context";

export default function Provider({ quizProgress ,mode }: { quizProgress: PlayQuizType, mode: PlayQuizMode }) {
  return (
    <PlayQuizProvider quizProgress={quizProgress} mode={mode}>
      <PlayQuiz />
    </PlayQuizProvider>
  );
}
