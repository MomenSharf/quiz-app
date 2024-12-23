import LibraryProvider from "@/components/Library/LibraryProvider";
import {
  getDashboardFolder,
  getFolderPath
} from "@/lib/actions/dashboard";

import { getCurrentUser } from "@/lib/auth";
import { isValidLibrarySortOption } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Page({
  params: { folderId },
  searchParams,
}: {
  params: { folderId: string | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }

  const sortBy = isValidLibrarySortOption(searchParams.sortBy)
    ? searchParams.sortBy
    : "recentUpdate";
  console.log(folderId);

  const [folderResult, folderPathResult] = await Promise.all([
    getDashboardFolder(sortBy, folderId),
    getFolderPath(folderId),
  ]);

  const { success: folderSuccess, folder } = folderResult;
  const { success: folderPathSuccess, path } = folderPathResult;

  if (!folderSuccess || !folder) {
    return <div>Failed to load dashboard folders and quizzes</div>;
    folder;
  }

  return (
    <div className="flex w-full h-full">
      <LibraryProvider
        quizzes={folder.quizzes}
        folderWithQuizzes={folder.subfolders}
        path={path}
        folderId={folderId}
        title={folder.title}
      />
    </div>
  );
}
