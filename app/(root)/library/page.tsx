import ErrorPage from "@/components/Layout/ErrorPage";
import LibraryProvider from "@/components/Library/LibraryProvider";
import { getLibraryFolders, getLibraryQuizzes } from "@/lib/actions/library";

import { getCurrentUser } from "@/lib/auth";
import { isValidLibrarySortOption } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidate = 60

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

  const {
    success: quizzesSuccess,
    quizzes,
    message: quizzesMessage,
  } = quizzesResult;
  const {
    success: folderWithQuizzesSuccess,
    folderWithQuizzes,
    message: FoldersMessage,
  } = foldersResult;

  if (
    !quizzesSuccess ||
    !folderWithQuizzesSuccess ||
    !quizzes ||
    !folderWithQuizzes
  ) {
    const message = quizzesMessage ? quizzesMessage : FoldersMessage;
    return <ErrorPage message={message} />;
  }

  revalidatePath("/library");

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
