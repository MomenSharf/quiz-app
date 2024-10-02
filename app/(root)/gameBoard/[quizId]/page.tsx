import Editor from "@/components/Editor/Editor";
import { getHomeQuizzes, getQuiz } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {     
  const quiz = await getQuiz(quizId)

  return "";
}
