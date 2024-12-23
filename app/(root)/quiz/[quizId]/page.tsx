import Quiz from "@/components/QuizDetails/Quiz";
import { isBoojkmarked } from "@/lib/actions/bookmark";
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
  const {isBookmarked} = await isBoojkmarked({quizId: quizDetails.id});


  return <Quiz quiz={quizDetails} isBookmarked={isBookmarked} pathname='/quiz'/>;
}
