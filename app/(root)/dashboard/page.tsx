import DashboardProvider from "@/components/Dashboard/DashboardProvider";
import {
  getDashboardFoldersWithQuizzes,
  getDashboardQuizzes,
} from "@/lib/actions/dashboard";

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getCurrentUser();
  if (!session) {
    return redirect("/login");
  }
  const [quizzesResult, foldersResult] = await Promise.all([
    getDashboardQuizzes(),
    getDashboardFoldersWithQuizzes(),
  ]);

  const { success: quizzesSuccess, quizzes } = quizzesResult;
  const { success: folderWithQuizzesSuccess, folderWithQuizzes } =
    foldersResult;

  if (
    !quizzesSuccess ||
    !folderWithQuizzesSuccess ||
    !quizzes ||
    !folderWithQuizzes
  ) {
    return <div>Failed to load dashboard folders and quizzes</div>;
  }

  return (
    <div className="flex w-full h-full">
      <DashboardProvider
        quizzes={quizzes}
        folderWithQuizzes={folderWithQuizzes}
      />
    </div>
  );
}
