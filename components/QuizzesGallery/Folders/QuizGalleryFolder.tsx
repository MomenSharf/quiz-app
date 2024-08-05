import { formatTimeAgo } from "@/lib/utils";
import { FolderGalleryWithQuizzesCount } from "@/types";
import { EllipsisVertical, File } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import QuizGalleryFolderDrawer from "./QuizGalleryFolderDrawer";
import QuizGalleryFolderMenu from "./QuizGalleryFolderMenu";
import { Button } from "@/components/ui/button";
type folderGalleryFolderProps = {
  folder: FolderGalleryWithQuizzesCount;
};
export default function QuizGalleryFolder({
  folder,
}: folderGalleryFolderProps) {
  return (
    <div className="max-w-full flex gap-1 sm:gap-3 items-center bg-card rounded-md  hover:shadow-md transition-all duration-200">
      <Link
        href={`/dashboard/folders/${folder.id}`}
        className="p-3  flex-1 max-w-full flex gap-1"
      >
        <div className="flex items-center gap-2">
        <div className="h-full flex justify-center items-center object-contain rounded-md overflow-hidden min-w-16 sm:min-w-20 bg-[hsl(var(--primary)_/_10%)] ">
        <Icons.folder className="w-7 h-7 fill-primary" />
          </div> 
          <div className="flex flex-col gap-1">
            <p className="max-w-full truncate font-medium hover:text-primary transition-colors">
              {folder.title}
            </p>
            <div
              className="flex gap-2"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-1 text-xs items-center">
                <span className="p-1.5 rounded-full bg-[var(--main-bg)]">
                  <File className="w-3 h-3" />
                </span>
                {folder._count.quizzes} Quizzes
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="hidden sm:flex text-muted-foreground text-sm">
        {formatTimeAgo(folder.updatedAt)}
      </div>
      <div className="flex justify-center items-center mr-2">
        <div className="hidden sm:block">
          <QuizGalleryFolderMenu
            contentPostionClasses="right-4"
            trigger={
              <Button className="px-2 w-auto" variant="ghost">
                {/* <EllipsisVertical className="h-4" /> */}
                <Icons.ellipsis className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />

              </Button>
            }
            folder={folder}
          />
        </div>
        <div className="block sm:hidden">
          <QuizGalleryFolderDrawer
            trigger={
              <Button className="px-2 w-auto" variant="ghost">
                <Icons.ellipsis className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
              </Button>
            }
            folder={folder}
          />
        </div>
      </div>
    </div>
  );
}
