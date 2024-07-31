import NewQuizButton from "@/components/CreateQuiz/NewQuizButton";
import EmptyQuizzesGallery from "@/components/EmptyQuizzesGallery";
import QuizzesGallery from "@/components/QuizzesGallery";

import { Separator } from "@/components/ui/separator";
import { getMyQuizzes } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/sign-in");
  }

  const myQuizzes = await getMyQuizzes(session?.user.id);

  return (
    <div className=" h-full flex flex-col gap-3 container">
      <h1 className="text-xl pt-5 font-semibold flex flex-col gap-1">MY QUIZZES

      </h1>
      <Separator className="h-[2px]" />
      <NewQuizButton userId={session.user.id} className="w-fit rounded-full" pathname="/my-quizzes"/>

      
      {myQuizzes && myQuizzes?.length !== 0 ? (
        <QuizzesGallery quizzes={myQuizzes} />
      ) : (
        <EmptyQuizzesGallery userId={session.user.id} />
      )}
    </div>
  );
}
