"use client";
import React from "react";
import PlayQuiz from "./PlayQuiz";
import { EditorQuiz } from "@/types";
import { PlayQuizProvider } from "./Context";

export default function Provider({ quiz }: { quiz: EditorQuiz }) {
  return (
    <PlayQuizProvider quiz={quiz}>
      <PlayQuiz />
    </PlayQuizProvider>
  );
}
