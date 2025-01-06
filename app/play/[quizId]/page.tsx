import ErrorPage from "@/components/Layout/ErrorPage";
import Provider from "@/components/PlayQuiz/Provider";
import { getPlayQuiz, getPreviewQuiz } from "@/lib/actions/playQuiz";
import { getCurrentUser } from "@/lib/auth";
import { intQuiz } from "@/lib/utils";
import { quizSchema } from "@/lib/validations/quizSchemas";
import { PlayQuizMode, PlayQuizType } from "@/types";
import { Rating } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  params: { quizId: string };
  searchParams?: Promise<{
    mode?: string;
  }>;
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const quizId = props.params.quizId;
  const searchParams = await props.searchParams;
  const mode = searchParams?.mode === "preview" ? "preview" : "play";

  if (mode === "preview") {
    const { success, quiz, message } = await getPreviewQuiz(quizId);
    if (!quiz || !success) {
      <div className="w-full h-screen flex items-center justify-center main-background">
        <ErrorPage message={message} />;
      </div>;
    }

    const ratings: Rating[] = [];
    const playQuizQuestions: JsonValue[] = [];
    const quizProgress = {
      quiz: { ...quiz, ratings },
      currentQuestion: 0,
      isCompleted: false,
      playQuizQuestions,
    } as PlayQuizType;

    return (
      <div className="min-h-screen main-background">
        <Provider quizProgress={quizProgress} mode={mode} />
      </div>
    );
  }

  const { success, quizProgress, message } = await getPlayQuiz(quizId, mode);

  if (!success || !quizProgress) {
    return (
      <div className="w-full h-screen flex items-center justify-center main-background">
        <ErrorPage message={message} />;
      </div>
    );
  }

  quizProgress.playQuizQuestions;

  return (
    <div className="min-h-screen main-background">
      <Provider quizProgress={quizProgress} mode={mode} />
    </div>
  );
}
