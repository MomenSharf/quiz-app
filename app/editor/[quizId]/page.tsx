// import Editor from "@/components/Editor2/Editor";
import EditorProvider from "@/components/Editor/EditorProvider";
import { getEditorQuiz } from "@/lib/actions/editor";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const {success, initialQuiz} = await getEditorQuiz({quizId});

  if (!initialQuiz) {
    return notFound();
  }

  // return <Editor quiz={quiz} />;
  return <EditorProvider initialQuiz={initialQuiz} />;
}
