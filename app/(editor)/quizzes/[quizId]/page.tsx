import Editor from "@/components/Editor/Editor";
import { getQuiz } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const quiz = await getQuiz(quizId);

  if (!quiz) {
    return notFound();
  }

  return <Editor quiz={quiz} />;
}
