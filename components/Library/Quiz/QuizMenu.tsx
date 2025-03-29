import { Copy, Edit, ExternalLink, PenLine, Trash2 } from "lucide-react";

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
import { toast } from "@/components/ui/use-toast";
import { copyQuiz } from "@/lib/actions/quiz";
import { cn, shareLink } from "@/lib/utils";
import { DashboardQuiz } from "@/types";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DeleteQuizButton from "./DeleteQuizButton";
import RenameQuiz from "./RenameQuiz";
import Loader from "@/components/Layout/Loader";

type QuizMenuProps = ButtonProps & {
  quiz: DashboardQuiz;
};

export default function QuizMenu({ children, quiz, ...props }: QuizMenuProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const copyQ = async () => {
    const { success, message } = await copyQuiz({
      quizId: quiz.id,
      pathname: "/library",
    });

    if (success) {
      toast({ description: message });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button {...props}>{children}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-40 text-gray-medium cursor-pointer right-6">
          <DropdownMenuLabel
            className="text-gray-dark text-normal truncate"
            title={quiz.title}
          >
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
              onSelect={() => {
                if (quiz.visibility === "PRIVATE")
                  return toast({
                    description: "Make quiz public first",
                    variant: "destructive",
                  });
                shareLink({
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${quiz.id}`,
                  title: "Check out this quiz!",
                  text: `I found this great quiz: ${quiz.title}`,
                });
              }}
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-semibold">Share</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className=" flex gap-2"
              onSelect={() => {
                startTransition(() => {
                  copyQ();
                });
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="w-5 h-5"/>
              ) : (
                <Copy className="w-5 h-5" />
              )}
              <span className="font-semibold">Copy</span>
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
        title={quiz.title}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
    </>
  );
}
