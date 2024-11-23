import { Copy, ExternalLink, PenLine, Play, RotateCcw } from "lucide-react";

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
import { MouseEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/quiz.actions";
import { usePathname } from "next/navigation";
import { QuizGalleryWithQuestionsCount } from "@/types";

type QuizGalleryQuizMenuProps = {
  trigger: JSX.Element;
  contentPostionClasses: string;
  quiz: QuizGalleryWithQuestionsCount;
};

export default function QuizGalleryQuizMenu({
  trigger,
  contentPostionClasses,
  quiz,
}: QuizGalleryQuizMenuProps) {
  const [isDuplicating, setIsDuplicateing] = useState(false);

  const pathname = usePathname();

  const DuplicateQuiz = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setIsDuplicateing(true);

    try {
      const quizId = await newQuiz(pathname, quiz.folderId || undefined);

      if (quizId) {
        // router.push(`/quizzes/${quizId}`);
        setIsDuplicateing(false)
      } else {
        toast({
          title: "Error",
          description: "There was an error with creating new Quiz",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error with creating new Quiz",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          contentPostionClasses,
          "relative w-40 text-muted-foreground"
        )}
      >
        <DropdownMenuLabel>{quiz.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary hover:text-primary flex gap-2">
            <Play className="w-5 h-5 fill-primary" />
            <span className="font-semibold">Preview</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <PenLine className="w-5 h-5" />
            <span className="font-semibold">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <ExternalLink className="w-5 h-5" />
            <span className="font-semibold">Shere</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" flex gap-2">
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2" onClick={DuplicateQuiz}>
            <Copy className="w-5 h-5" />
            <span className="font-semibold">Duplicate</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="p-0 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <DeleteQuizButton
              variant="ghost"
              text="Delete"
              pathname="/my-quizzes"
              titleIds={[{ title: quiz.title, id: quiz.id }]}
              className="flex gap-1 w-full text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
