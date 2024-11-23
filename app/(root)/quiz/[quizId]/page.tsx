import Quiz from "@/components/Quiz/Quiz";
import { getEditorQuiz } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const quiz = await getEditorQuiz(quizId);

  if (!quiz) {
    return notFound();
  }

  return <Quiz quiz={quiz} />;
}
