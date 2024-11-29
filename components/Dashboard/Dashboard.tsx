import React from "react";
import { useDashboardContext } from "./Context";
import EmptyDashboard from "./EmptyDashboard";
import Header from "./Header";
import { Separator } from "../ui/separator";
import Table from "./Table";
import Toolbar from "./Toolbar";
import BreadcrumbDemoFolderPath from "./Folder/BreadcrumbFolderPath";
import { FolderPathSegment } from "@/types";

export default function Dashboard({
  path,
  folderId,
  title
}: {
  path?: FolderPathSegment[];
  folderId?: string;
  title: string 

}) {
  const { quizzes, folderWithQuizzes } = useDashboardContext();

  if (quizzes.length === 0 && folderWithQuizzes.length === 0) {
    return <EmptyDashboard folderId={folderId} path={path}title={title}/>;
  }
  return (
    <div className="flex flex-col gap-5 p-3 w-full">
      <Header folderId={folderId} title={title}/>
      {path && <BreadcrumbDemoFolderPath path={path} currentFolderId={folderId} />}
      <Separator />
      <Toolbar />
      <Table />
    </div>
  );
}
