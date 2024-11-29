"use client";
import { DashboardFoldersWithQuiz, DashboardQuiz, FolderPathSegment} from "@/types";
import { DashboardProvider as Provider } from "./Context";
import Dashboard from "./Dashboard";
export default function DashboardProvider({
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
      <Dashboard path={path} folderId={folderId}  title={title}/>
    </Provider>
  );
}
