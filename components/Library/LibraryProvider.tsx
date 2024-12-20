"use client";
import { DashboardFoldersWithQuiz, DashboardQuiz, FolderPathSegment } from "@/types";
import { DashboardProvider as Provider } from "./Context";
import Library from "./Library";
export default function LibraryProvider({
  quizzes,
  folderWithQuizzes,
  path,
  folderId,
  title
}: {
  quizzes: DashboardQuiz[];
  folderWithQuizzes: DashboardFoldersWithQuiz[];
  path?: FolderPathSegment[] 
  folderId?: string 
  title: string 
}) {
  return (
    <Provider quizzes={quizzes} folderWithQuizzes={folderWithQuizzes}>
      <Library path={path} folderId={folderId}  title={title}/>
    </Provider>
  );
}
