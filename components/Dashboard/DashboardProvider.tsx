"use client";
import { DashboardFoldersWithQuiz, DashboardQuiz} from "@/types";
import { DashboardProvider as Provider } from "./Context";
import Dashboard from "./Dashboard";
export default function DashboardProvider({
  quizzes,
  folderWithQuizzes,
}: {
  quizzes: DashboardQuiz[];
  folderWithQuizzes: DashboardFoldersWithQuiz[];
}) {
  return (
    <Provider quizzes={quizzes} folderWithQuizzes={folderWithQuizzes}>
      <Dashboard />
    </Provider>
  );
}
