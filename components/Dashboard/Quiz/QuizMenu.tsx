import {
  Copy,
  Edit,
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
import { HTMLProps, MouseEvent, ReactNode, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/quiz.actions";
import { usePathname, useRouter } from "next/navigation";
import { DashboardQuiz, QuizGalleryWithQuestionsCount } from "@/types";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useDashboardContext } from "../Context";
import RenameQuiz from "./RenameQuiz";

type QuizMenuProps = HTMLProps<HTMLDivElement> & {
  pathname: string;
  quiz: DashboardQuiz;
};

export default function QuizMenu({
  children,
  pathname,
  quiz,
  ...props
}: QuizMenuProps) {
  const {
    state: { isDuplicatingQuiz, isResettingQuiz },
    duplicateQuiz,
    resetQuiz,
  } = useDashboardContext();

  const router = useRouter();

  const shareLink = async () => {
    const searchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${quiz.id}`;

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
        className= "relative w-40 text-gray-medium cursor-pointer"
      >
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <RenameQuiz quizId={quiz.id} className="w-full flex gap-2">
              <PenLine className="w-4 h-4" />
              <span className="font-semibold">Rename</span>
            </RenameQuiz>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2" onSelect={shareLink}>
            <ExternalLink className="w-5 h-5" />
            <span className="font-semibold">Shere</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className=" flex gap-2"
            onSelect={(e) => {
              e.preventDefault();
              resetQuiz({ pathname: "/dashboard", quizId: quiz.id });
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
            onSelect={(e) => {
              e.preventDefault();
              duplicateQuiz({ pathname: "/dashboard", quizId: quiz.id });
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
            className="p-0 transition-all"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DeleteQuizButton
              pathname={pathname}
              className={cn(buttonVariants({variant: 'ghost', size: 'sm'}),"gap-1 justify-start text-base w-full text-destructive hover:text-white hover:bg-destructive")}
              ids={[quiz.id]}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </DeleteQuizButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
