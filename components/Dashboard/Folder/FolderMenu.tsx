import { Trash2 } from "lucide-react";

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
import { HTMLProps } from "react";
import { useDashboardContext } from "../Context";
import DeleteFolderButton from "./DeleteFolderButton";
import { buttonVariants } from "@/components/ui/button";

type FolderMenuProps = HTMLProps<HTMLDivElement> & {
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
  const {
    dispatch,
    state: { isDeletingQuiz, isDuplicatingQuiz, isResettingQuiz },
    deleteQuizzess,
    duplicateQuiz,
    resetQuiz,
  } = useDashboardContext();

  const router = useRouter();

  const shareLink = async () => {
    const searchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${folder.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: `I found this search: ${searchUrl}`,
          url: searchUrl,
        });
      } catch (error) {
        toast({ description: "Error sharing link." });
      }
    } else {
      toast({ description: "Sharing is not supported on your device." });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div {...props}>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(contentPostionClasses, "relative w-40 text-gray-medium cursor-pointer")}
      >
        <DropdownMenuLabel className="text-gray-dark text-normal">
          {folder.title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            {/* <RenameFolder quizId={quiz.id} className="w-full flex gap-2">
              <PenLine className="w-4 h-4" />
              <span className="font-semibold">Rename</span>
            </RenameFolder> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="p-0 py-1 transition-all"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DeleteFolderButton
              pathname={pathname}
              folderId={folder.id}
              className={cn(
                buttonVariants({ size: "sm" , variant: "ghost"}),
                " gap-1 w-full text-gray-extra-dark hover:text-white hover:bg-destructive transition-colors"
              )}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </DeleteFolderButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
