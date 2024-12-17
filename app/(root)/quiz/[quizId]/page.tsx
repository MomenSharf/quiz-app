import Quiz from "@/components/QuizDetails/Quiz";
import { getEditorQuiz } from "@/lib/actions/quiz.actions";
import { getQuizDetails } from "@/lib/actions/quizDetails";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const { success, quizDetails } = await getQuizDetails({ quizId });
  if (!quizDetails || !success) {
    return notFound();
  }

  return <Quiz quiz={quizDetails} />;
}
