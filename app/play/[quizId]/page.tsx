import Provider from "@/components/PlayQuiz/Provider";
import { getPlayQuiz } from "@/lib/actions/playQuiz";
import { getCurrentUser } from "@/lib/auth";
import { intQuiz } from "@/lib/utils";
import { quizSchema } from "@/lib/validations/quizSchemas";
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

  const { success, quizProgress } = await getPlayQuiz(quizId, mode);

  if (!success || !quizProgress) {
    return notFound();
  }

  const quiz = intQuiz(quizProgress.quiz);

  const preview =
    searchParams?.mode === "preview" &&
    session.user.id === quizProgress.quiz.userId &&
    quizSchema.safeParse(quiz).success;

  return (
    <div className="min-h-screen main-background">
      <Provider quizProgress={quizProgress} preview={preview || false} />
    </div>
  );
}
