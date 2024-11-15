import Provider from "@/components/PlayQuiz/Provider";
import { getQuiz } from "@/lib/actions/quiz.actions";
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

  const quiz = await getQuiz(quizId);

  if (!quiz) {
    return notFound();
  }

  return (
    <div className="min-h-screen  root-background-white">
      <Provider quiz={quiz} />
    </div>
  );
}
