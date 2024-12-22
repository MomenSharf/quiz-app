import Quiz from "@/components/QuizDetails/Quiz";
import { getQuizDetails } from "@/lib/actions/quizDetails";
import { notFound } from "next/navigation";

export default async function Page({
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
