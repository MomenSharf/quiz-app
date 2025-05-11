import ErrorPage from "@/components/Layout/ErrorPage";
import Provider from "@/components/PlayQuiz/Provider";
import { getPlayQuiz, getPreviewQuiz } from "@/lib/actions/playQuiz";
import { getCurrentUser } from "@/lib/auth";
import { PlayQuizType } from "@/types";
import { Rating } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";

import fakeQuizProgress from "@/fake-data/fake-quiz-progress.json";

export const dynamic = "force-dynamic";

export default async function page(props: {
  params: { quizId: string };
  searchParams?: Promise<{
    mode?: string;
  }>;
}) {
  const session = await getCurrentUser();

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    return (
      <div className="min-h-screen main-background">
        <Provider
          quizProgress={fakeQuizProgress as unknown as PlayQuizType}
          mode="preview"
        />
      </div>
    );
  }
  const quizId = props.params.quizId;
  const searchParams = await props.searchParams;
  const mode = searchParams?.mode === "preview" ? "preview" : "play";

  if (!session) {
    return redirect(`/login?callbackUrl=/play/${quizId}?mode=${mode}`);
  }


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

  return (
    <div className="min-h-screen main-background">
      <Provider quizProgress={quizProgress} mode={mode} />
    </div>
  );
}
