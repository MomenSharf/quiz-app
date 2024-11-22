import Provider from "@/components/PlayQuiz/Provider";
import { getPlayQuiz } from "@/lib/actions/quiz.actions";
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

  const quizProgress = await getPlayQuiz(quizId);

  if (!quizProgress) {
    return notFound();
  }

    

  return (
    <div className="min-h-screen bg-[hsl(var(--main-background))]">
      <Provider quizProgress={quizProgress} />
    </div>
  );
}
