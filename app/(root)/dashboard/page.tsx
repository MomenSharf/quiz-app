import DashboardProvider from "@/components/Dashboard/DashboardProvider";
import {
  getDashboardFoldersWithQuizzes,
  getDashboardQuizzes,
} from "@/lib/actions/dashboard";

import { getCurrentUser } from "@/lib/auth";
import { isValidSortOption } from "@/lib/utils";
import { SortOption } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const sortBy = isValidSortOption(searchParams.sortBy)
    ? searchParams.sortBy
    : 'recentUpdate';

  const [quizzesResult, foldersResult] = await Promise.all([
    getDashboardQuizzes(sortBy),
    getDashboardFoldersWithQuizzes(sortBy),
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
