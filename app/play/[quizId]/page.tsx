import Provider from "@/components/PlayQuiz/Provider";
import { getPlayQuiz } from "@/lib/actions/playQuiz";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const {success, quizProgress} = await getPlayQuiz(quizId);

  if (!success ||!quizProgress) {
    return notFound();
  }

  return (
    <div className="min-h-screen main-background">
      <Provider quizProgress={quizProgress} />
    </div>
  );
}
