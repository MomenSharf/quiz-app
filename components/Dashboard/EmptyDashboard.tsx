import Image from "next/image";
import { useDashboardContext } from "./Context";
import NewFolderButton from "./Folder/NewFolderButton";
import NewQuizButton from "./Quiz/NewQuizButton";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { FolderPathSegment } from "@/types";
import BreadcrumbDemoFolderPath from "./Folder/BreadcrumbFolderPath";
import { Separator } from "../ui/separator";

export default function EmptyDashboard({
  folderId,
  path,
  title
}: {
  folderId?: string;
  path?: FolderPathSegment[];
  title: string;
}) {
  return (
    <div className="w-full flex flex-col gap-3 p-3">
      <h1 className="text-lg">{title}</h1>
      {path && (
        <>
        <BreadcrumbDemoFolderPath path={path} currentFolderId={folderId} />
        <Separator />
        </>
      )}

      <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
        <div className="">
          <Image
            src="/assets/images/Empty-dashboard.png"
            alt="empty gallery"
            width={250}
            height={250}
          />
        </div>
        <h4 className="font-medium">No Quizzes yet</h4>
        <p className="text-muted-foreground">You can create Quizzes her</p>
        <div className="flex gap-3">
          <NewQuizButton folderId={folderId} />
          <NewFolderButton
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-xl items-center gap-1 bg-white hover:bg-white hover:scale-[1.02] transition-transform text-foreground text-xs cursor-pointer"
            )}
            parentId={folderId}
          >
            <Icons.folderPlus className="w-4 h-4 fill-gray-extra-dark stroke-transparent " />
            new Folder
          </NewFolderButton>
        </div>
      </div>
    </div>
  );
}
