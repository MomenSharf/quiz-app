import { FolderPathSegment } from "@/types";
import { Separator } from "../ui/separator";
import { useLibraryContext } from "./Context";
import EmptyLibrary from "./EmptyLibrary";
import BreadcrumbDemoFolderPath from "./Folder/BreadcrumbFolderPath";
import Header from "./Header";
import Table from "./Table";
import Toolbar from "./Toolbar";

export default function Library({
  path,
  folderId,
  title,
}: {
  path?: FolderPathSegment[];
  folderId?: string;
  title: string;
}) {
  const { quizzes, folderWithQuizzes } = useLibraryContext();

  if (quizzes.length === 0 && folderWithQuizzes.length === 0) {
    return <EmptyLibrary folderId={folderId} path={path} title={title} />;
  }
  return (
    <div className="flex flex-col gap-3 p-3 w-full">
      <Header folderId={folderId} title={title} />
      {path && (
        <BreadcrumbDemoFolderPath path={path} currentFolderId={folderId} />
      )}
      {/* <Separator /> */}
      <div>
        <Toolbar />
        <Table />
      </div>
    </div>
  );
}
