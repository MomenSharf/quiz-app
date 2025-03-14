import ErrorPage from "@/components/Layout/ErrorPage";
import QuizDetails from "@/components/QuizDetails/QuizDetails";
import { getQuizDetails } from "@/lib/actions/quizDetails";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function Page({
  params: { quizId },
  searchParams,
}: {
  params: { quizId: string };
  searchParams: { showAnswers: string };
}) {
  const session = await getCurrentUser();
  const { success, quizDetails, message } = await getQuizDetails({ quizId });

  if (!quizDetails || !success) {
    return <ErrorPage message={message} />;
  }
  const showAnswers = searchParams.showAnswers === "true";

  const isCurrentUser = quizDetails.user.id === session?.user.id;

  return (
      <QuizDetails
        quiz={quizDetails}
        pathname="/quiz"
        isCurrentUser={isCurrentUser}
        showAnswers={showAnswers}
      />
  );
}
