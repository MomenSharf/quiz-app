"use client";

import { EditorQuiz } from "@/types";
import { EditorProvider } from "./EditorContext";
import EditorForm from "./EditorForm";

type EditorProps = {
  quiz: EditorQuiz;
};

export default function Editor({ quiz }: EditorProps) {
  return (
    <EditorProvider initialQuiz={quiz}>
      <EditorForm quiz={quiz} />
    </EditorProvider>
  );
}
