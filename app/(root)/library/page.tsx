import LibraryProvider from "@/components/Library/LibraryProvider";
import {
  getLibraryFolders,
  getLibraryQuizzes,
} from "@/lib/actions/library";

import { getCurrentUser } from "@/lib/auth";
import { isValidLibrarySortOption } from "@/lib/utils";
import { redirect } from "next/navigation";


export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const sortBy = isValidLibrarySortOption(searchParams.sortBy)
    ? searchParams.sortBy
    : "recentUpdate";

  const [quizzesResult, foldersResult] = await Promise.all([
    getLibraryQuizzes(sortBy),
    getLibraryFolders(sortBy),
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
      <LibraryProvider
        quizzes={quizzes}
        folderWithQuizzes={folderWithQuizzes}
        title="LIBRERY"
      />
    </div>
  );
}
