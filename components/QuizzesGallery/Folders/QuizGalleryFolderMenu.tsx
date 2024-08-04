import {
  PenLine
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Folder } from "@prisma/client";
import DeleteFolderButton from "./DeleteFolderButton";

type QuizGalleryFolderMenuProps = {
  trigger: JSX.Element;
  contentPostionClasses: string;
  folder: Pick<Folder, "id" | "title">;
};

export default function QuizGalleryFolderMenu({
  trigger,
  contentPostionClasses,
  folder,
}: QuizGalleryFolderMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          contentPostionClasses,
          "relative w-40 text-muted-foreground"
        )}
      >
        <DropdownMenuLabel>{folder.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className=" flex gap-2">
            <PenLine className="w-5 h-5" />
            <span className="font-semibold">Rename</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0 transition-all" onClick={(e) => e.preventDefault()}>
            <DeleteFolderButton
              variant="ghost"
              text="Delete"
              pathname="/my-quizzes"
              folderId={folder.id}
              title={folder.title}
              className="flex gap-1 w-full text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
