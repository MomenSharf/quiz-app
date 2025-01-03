import Quiz from "@/components/QuizDetails/Quiz";
import { getQuizDetails } from "@/lib/actions/quizDetails";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser()
  const { success, quizDetails } = await getQuizDetails({ quizId });
  console.log(quizDetails);
  
  if (!quizDetails || !success) {
    return notFound();
  }

  const isCurrentUser = quizDetails.user.id === session?.user.id;



  return <Quiz quiz={quizDetails} pathname='/quiz' isCurrentUser={isCurrentUser}/>;
}
