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
import { toast } from "@/components/ui/use-toast";
import { cn, shareLink } from "@/lib/utils";
import { DashboardQuiz } from "@/types";
import { useRouter } from "next/navigation";
import { HTMLProps } from "react";
import { useDashboardContext } from "../Context";
import DeleteQuizButton from "./DeleteQuizButton";
import RenameQuiz from "./RenameQuiz";

type QuizMenuProps = ButtonProps & {
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

  return (
    <DropdownMenu>
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <RenameQuiz quizId={quiz.id} className="w-full flex gap-2">
              <PenLine className="w-4 h-4" />
              <span className="font-semibold">Rename</span>
            </RenameQuiz>
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
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 justify-start text-base w-full text-destructive hover:text-white hover:bg-destructive"
              )}
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
