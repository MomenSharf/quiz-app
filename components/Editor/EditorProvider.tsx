'use client'
import React from "react";
import { EditorProvider as Provider } from "./Context";
import { EditorQuiz } from "@/types";
import Editor from "./Editor";

export default function EditorProvider({
  initialQuiz,
}: {
  initialQuiz: EditorQuiz;
}) {
  return (
    <Provider initialQuiz={initialQuiz}>
      <Editor />
    </Provider>
  );
}
