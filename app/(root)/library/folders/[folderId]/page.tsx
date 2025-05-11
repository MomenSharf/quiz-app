import ErrorPage from "@/components/Layout/ErrorPage";
import LibraryProvider from "@/components/Library/LibraryProvider";
import { getFolderPath, getLibraryFolder } from "@/lib/actions/library";
import { getCurrentUser } from "@/lib/auth";
import { isValidLibrarySortOption } from "@/lib/utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

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

  const [folderResult, folderPathResult] = await Promise.all([
    getLibraryFolder(sortBy, folderId),
    getFolderPath(folderId),
  ]);

  const { success: folderSuccess, folder, message } = folderResult;
  const { success: folderPathSuccess, path } = folderPathResult;

  if (!folderSuccess || !folder) {
    return <ErrorPage message={message} />;
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
