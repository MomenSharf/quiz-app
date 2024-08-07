

import EmptyQuizzesGallery from "@/components/QuizzesGallery/EmptyQuizzesGallery";
import NewFolderButton from "@/components/QuizzesGallery/Folders/NewFolderButton";
import NewQuizButton from "@/components/QuizzesGallery/Quizzes/NewQuizButton";
import QuizzesGallery from "@/components/QuizzesGallery/QuizzesGallery";
import { Separator } from "@/components/ui/separator";
import { getGalleryFolders, getGalleryQuizzes } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const myQuizzes = await getGalleryQuizzes();
  const myQuizzesFolders = await getGalleryFolders();

  return (
    <div className=" h-full flex flex-col gap-3 px-2">
      <h1 className="text-xl pt-5 font-semibold flex flex-col gap-1">
        MY QUIZZES
      </h1>
      <Separator className="h-[2px]" />
      {(myQuizzes && myQuizzes?.length !== 0) ||
      (myQuizzesFolders && myQuizzesFolders?.length !== 0) ? (
        <>
          <div className="flex gap-3">
            <NewQuizButton
              userId={session.user.id}
              className="w-fit"
              pathname="/my-quizzes"
            />
            <NewFolderButton
              userId={session.user.id}
              className="w-fit"
              pathname="/my-quizzes"
            />
          </div>
          <QuizzesGallery
            quizzes={myQuizzes ? myQuizzes : []}
            folders={myQuizzesFolders ? myQuizzesFolders : []}
          />
        </>
      ) : (
        <EmptyQuizzesGallery userId={session.user.id} />
      )}
    </div>
  );
}
