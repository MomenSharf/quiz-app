import { PenLine, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import { useRouter } from "next/navigation";
import { HTMLProps, useState } from "react";
import { useLibraryContext } from "../Context";
import DeleteFolderButton from "./DeleteFolderButton";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import RenameFolder from "./RenameFolder";

type FolderMenuProps = ButtonProps & {
  contentPostionClasses?: string;
  pathname: string;
  folder: DashboardFoldersWithQuiz;
};

export default function FolderMenu({
  children,
  pathname,
  contentPostionClasses,
  folder,
  ...props
}: FolderMenuProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button {...props}>{children}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            contentPostionClasses,
            "relative w-40 text-gray-medium cursor-pointer"
          )}
        >
          <DropdownMenuLabel className="text-gray-dark">
            {folder.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => setRenameDialogOpen(true)}
              className="gap-1"
            >
              <PenLine className="w-5 h-5" />
              <span className="font-semibold text-base">Rename</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => setDeleteDialogOpen(true)}
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                " gap-1 justify-start text-base w-full text-destructive hover:text-white hover:bg-destructive transition-colors"
              )}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteFolderButton
        folderId={folder.id}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <RenameFolder
        folderId={folder.id}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
    </>
  );
}
