// import Editor from "@/components/Editor2/Editor";
import EditorProvider from "@/components/Editor/EditorProvider";
import ErrorPage from "@/components/Layout/ErrorPage";
import { getEditorQuiz } from "@/lib/actions/editor";
import { getCurrentUser } from "@/lib/auth";
import { intQuiz } from "@/lib/utils";
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

  const { success, initialQuiz, message } = await getEditorQuiz({
    quizId,
  });

  if (!initialQuiz || !success) {
    return (
      <div className="w-full h-screen flex items-center justify-center main-background">
        <ErrorPage message={message} />;
      </div>
    );
  }

  return <EditorProvider initialQuiz={initialQuiz} />;
}
