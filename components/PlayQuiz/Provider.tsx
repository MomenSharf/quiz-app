"use client";
import React from "react";
import PlayQuiz from "./PlayQuiz";
import { type EditorQuiz, PlayQuizType } from "@/types";
import { PlayQuizProvider } from "./Context";

export default function Provider({ quizProgress ,preview }: { quizProgress: PlayQuizType, preview: boolean }) {
  return (
    <PlayQuizProvider quizProgress={quizProgress} preview={preview}>
      <PlayQuiz />
    </PlayQuizProvider>
  );
}
