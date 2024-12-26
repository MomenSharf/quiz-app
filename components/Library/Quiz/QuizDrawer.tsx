import {
  Copy,
  Edit,
  ExternalLink,
  PenLine,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { DashboardQuiz } from "@/types";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "../Context";
import DeleteQuizButton from "./DeleteQuizButton";
import RenameQuiz from "./RenameQuiz";

type QuizMenuProps = ButtonProps& {
  pathname: string;
  quiz: DashboardQuiz;
};

export default function QuizDrawer({
  children,
  pathname,
  quiz,
  ...props
}: QuizMenuProps) {
  const {
    dispatch,
    state: { isDeletingQuiz, isDuplicatingQuiz, isResettingQuiz },
    deleteQuizzess,
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
    <Drawer>
      <DrawerTrigger asChild>
      <Button {...props}>{children}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex justify-end px-3">
          <DrawerClose className="" asChild>
            <Button variant="outline" className="p-1" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </DrawerClose>
        </div>
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>{quiz.title}</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col w-full px-1">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary flex gap-2 px-3 py-4 w-full justify-start text-lg"
              onClick={() => router.push(`/play/${quiz.id}`)}
            >
              <Icons.play className="w-6 h-6 fill-primary" />
              <span className="font-semibold">Play</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
              onClick={() => router.push(`/editor/${quiz.id}`)}
            >
              <Edit className="w-6 h-6 " />
              <span className="font-semibold">Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
            >
              <RenameQuiz quizId={quiz.id} className="w-full flex gap-2">
                <PenLine className="w-6 h-6" />
                <span className="font-semibold">Rename</span>
              </RenameQuiz>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
              onClick={shareLink}
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-semibold">Shere</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
              onClick={(e) => {
                e.preventDefault();
                resetQuiz({ pathname: "/dashboard", quizId: quiz.id });
              }}
              disabled={isResettingQuiz}
            >
              <RotateCcw className="w-6 h-6" />
              <span className="font-semibold">Reset</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
              onClick={(e) => {
                e.preventDefault();
                duplicateQuiz({ pathname: "/dashboard", quizId: quiz.id });
              }}
              disabled={isDuplicatingQuiz}
           >
            {isDuplicatingQuiz ? (
              <Icons.Loader className="w-4 h-4 animate-spin stroke-gray-dark" />
            ) : (
              <Copy className="w-6 h-6" />
            )}
            <span className="font-semibold">Duplicate</span>
            </Button>
          </div>
          <DrawerFooter className="p-1">
            <DeleteQuizButton
              pathname={pathname}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-2 justify-start text-lg w-full text-destructive hover:text-white hover:bg-destructive"
              )}
              ids={[quiz.id]}
            >
              <Trash2 className="w-6 h-6" />
              Delete
            </DeleteQuizButton>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
