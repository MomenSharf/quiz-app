import ErrorPage from "@/components/Layout/ErrorPage";
import QuizDetails from "@/components/QuizDetails/QuizDetails";
import { getQuizDetails } from "@/lib/actions/quizDetails";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import fakeQuizDetails from "@/fake-data/quiz-details.json";
import { QuizDetailsWithIsBookmark } from "@/types";
export default async function Page({
  params: { quizId },
  searchParams,
}: {
  params: { quizId: string };
  searchParams: { showAnswers: string };
}) {
  const showAnswers = searchParams.showAnswers === "true";

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    return (
      <QuizDetails
        quiz={fakeQuizDetails as unknown as QuizDetailsWithIsBookmark}
        pathname="/quiz"
        isCurrentUser={false}
        showAnswers={showAnswers}
      />
    );
  }
  const session = await getCurrentUser();

  const { success, quizDetails, message } = await getQuizDetails({ quizId });

  if (!quizDetails || !success) {
    return <ErrorPage message={message} />;
  }

  const isCurrentUser = quizDetails.user.id === session?.user.id;

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true")
    return (
      <QuizDetails
        quiz={quizDetails}
        pathname="/quiz"
        isCurrentUser={isCurrentUser}
        showAnswers={showAnswers}
      />
    );
}
