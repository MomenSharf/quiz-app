import {
  Copy,
  Edit,
  ExternalLink,
  PenLine,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, shareLink } from "@/lib/utils";
import { DashboardQuiz } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLibraryContext } from "../Context";
import DeleteQuizButton from "./DeleteQuizButton";
import RenameQuiz from "./RenameQuiz";
import { duplicateQuiz, resetQuiz } from "@/lib/actions/library";
import { toast } from "@/components/ui/use-toast";

type QuizMenuProps = ButtonProps & {
  quiz: DashboardQuiz;
};

export default function QuizMenu({ children, quiz, ...props }: QuizMenuProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDuplicatingQuiz, setIsDuplicatingQuiz] = useState(false);
  const [isResettingQuiz, setIisResettingQuiz] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button {...props}>{children}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-40 text-gray-medium cursor-pointer">
          <DropdownMenuLabel className="text-gray-dark text-normal">
            {quiz.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-primary hover:text-primary flex gap-2"
              onSelect={() => router.push(`/play/${quiz.id}`)}
            >
              <Icons.play className="w-4 h-4 fill-primary" />
              <span className="font-semibold">Play</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2"
              onSelect={() => router.push(`/play/${quiz.id}`)}
            >
              <Edit className="w-4 h-4 " />
              <span className="font-semibold">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                setRenameDialogOpen(true);
              }}
              className="w-full flex gap-2"
            >
              <PenLine className="w-4 h-4" />
              <span className="font-semibold">Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" flex gap-2"
              onSelect={() =>
                shareLink({
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${quiz.id}`,
                  title: "Check out this quiz!",
                  text: `I found this great quiz: ${quiz.title}`,
                })
              }
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-semibold">Share</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className=" flex gap-2"
              onSelect={async (e) => {
                setIisResettingQuiz(true);
                const { success, message } = await resetQuiz({
                  quizId: quiz.id,
                  pathname: "library",
                });

                if (success) {
                  toast({ description: "Quiz reseted successfully" });
                } else {
                  toast({
                    description: message,
                    title: "error",
                    variant: "destructive",
                  });
                }
                setIisResettingQuiz(false);
                setOpen(false);
              }}
              disabled={isResettingQuiz}
            >
              {isResettingQuiz ? (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-gray-dark" />
              ) : (
                <RotateCcw className="w-5 h-5" />
              )}
              <span className="font-semibold">Reset</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" flex gap-2"
              onSelect={async (e) => {
                setIsDuplicatingQuiz(true);
                const { success, message } = await duplicateQuiz({
                  quizId: quiz.id,
                  pathname: "library",
                });

                if (success) {
                  toast({ description: "Quiz duplicated successfully" });
                } else {
                  toast({
                    description: message,
                    title: "error",
                    variant: "destructive",
                  });
                }
                setIsDuplicatingQuiz(false);
                setOpen(false);
              }}
              disabled={isDuplicatingQuiz}
            >
              {isDuplicatingQuiz ? (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-gray-dark" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              <span className="font-semibold">Duplicate</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => {
                setDeleteDialogOpen(true);
              }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 justify-start text-base w-full text-destructive hover:text-white hover:bg-destructive"
              )}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteQuizButton
        ids={[quiz.id]}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <RenameQuiz
        quizId={quiz.id}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
    </>
  );
}
