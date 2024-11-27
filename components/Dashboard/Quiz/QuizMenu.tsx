import {
  Copy,
  ExternalLink,
  PenLine,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Quiz } from "@prisma/client";
import DeleteQuizButton from "./DeleteQuizButton";
import { MouseEvent, ReactNode, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/quiz.actions";
import { usePathname } from "next/navigation";
import { DashboardQuiz, QuizGalleryWithQuestionsCount } from "@/types";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useDashboardContext } from "../Context";

type QuizGalleryQuizMenuProps = ButtonProps & {
  children: ReactNode;
  contentPostionClasses?: string;
  pathname: string;
  quiz: DashboardQuiz;
};

export default function QuizMenu({
  children,
  pathname,
  contentPostionClasses,
  quiz,
  ...props
}: QuizGalleryQuizMenuProps) {
  const {
    state: { isDeletingQuiz, isDuplicatingQuiz },
    deleteQuizzess,
    duplicateQuiz,
  } = useDashboardContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props}>{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(contentPostionClasses, "relative w-40 text-gray-medium")}
      >
        <DropdownMenuLabel className="text-gray-dark text-normal">
          {quiz.title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary hover:text-primary flex gap-2">
            <Icons.play className="w-4 h-4 fill-primary" />
            <span className="font-semibold">Play</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <PenLine className="w-4 h-4" />
            <span className="font-semibold">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <ExternalLink className="w-5 h-5" />
            <span className="font-semibold">Shere</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className=" flex gap-2">
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className=" flex gap-2"
            onSelect={(e) => {
              e.preventDefault();
              duplicateQuiz("/dashboard", quiz.id);
            }}
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
            className="p-0 py-1 transition-all"
            onClick={(e) => {
              e.preventDefault();
              deleteQuizzess("/dashboard", [quiz.id]);
            }}
          >
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 w-full"
              )}
            >
              {isDeletingQuiz ? (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </div>
            {/* <DeleteQuizButton
                pathname={pathname}
                variant="destructive"
                size="sm"
                className="gap-1 w-full"
                ids={[quiz.id]}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DeleteQuizButton> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
