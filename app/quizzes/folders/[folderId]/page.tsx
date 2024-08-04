
import EmptyQuizzesGallery from "@/components/QuizzesGallery/EmptyQuizzesGallery";
import BreadcrumbDemoFolderPath from "@/components/QuizzesGallery/Folders/BreadcrumbFolderPath";
import NewFolderButton from "@/components/QuizzesGallery/Folders/NewFolderButton";
import NewQuizButton from "@/components/QuizzesGallery/Quizzes/NewQuizButton";
import QuizzesGallery from "@/components/QuizzesGallery/QuizzesGallery";
import { Separator } from "@/components/ui/separator";
import { getFolder, getFolderPath } from "@/lib/actions/quiz.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";



export default async function page({
  params: { folderId },
}: {
  params: { folderId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }
  const folder = await getFolder(folderId);
  
  if(!folder) {
    return notFound()
  }
  const folderPath = await getFolderPath(folder.id)

  console.log(folder.id);
  
  

  const myQuizzes = folder.quizzes;
  const myQuizzesFolders = folder.subfolders;
  

  return (
    <div className=" h-full flex flex-col gap-3 container">
      <h1 className="text-xl pt-5 font-semibold flex flex-col gap-1">
        {folder?.title}
      </h1>
      <BreadcrumbDemoFolderPath path={folderPath} currentFolderId={folderId}/>
      <Separator className="h-[2px]" />
      {(myQuizzes && myQuizzes?.length !== 0) ||
      (myQuizzesFolders && myQuizzesFolders?.length !== 0) ? (
        <>
          <div className="flex gap-3">
            <NewQuizButton
              userId={session.user.id}
              folderId={folder.id}
              className="w-fit rounded-full"
              pathname={`/my-quizzes/folders/${folderId}`}
            />
            <NewFolderButton
              userId={session.user.id}
              folderId={folder.id}
              className="w-fit rounded-full"
              pathname={`/my-quizzes/folders/${folderId}`}
            />
          </div>
          <QuizzesGallery
            quizzes={myQuizzes ? myQuizzes : []}
            folders={myQuizzesFolders ? myQuizzesFolders : []}
          />
        </>
      ) : (
        <EmptyQuizzesGallery userId={session.user.id} folderId={folder.id}/>
      )}
    </div>
  );
}
