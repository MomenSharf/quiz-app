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
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { shareLink } from "@/lib/utils";
import { DashboardQuiz } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLibraryContext } from "../Context";
import DeleteQuizButton from "./DeleteQuizButton";
import RenameQuiz from "./RenameQuiz";
import { toast } from "@/components/ui/use-toast";
import { duplicateQuiz } from "@/lib/actions/library";

type QuizMenuProps = ButtonProps & {
  quiz: DashboardQuiz;
};

export default function QuizDrawer({
  children,
  quiz,
  ...props
}: QuizMenuProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDuplicatingQuiz, setIsDuplicatingQuiz] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
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
              <DrawerTitle className="truncate">
                {quiz.title} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Consequuntur perferendis veritatis unde aperiam
                voluptatibus, at ducimus voluptate dignissimos officiis?
                Doloremque fugiat beatae error in vero. Dolore dignissimos sint
                accusamus! Dolor.
              </DrawerTitle>
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
                onClick={() => {
                  setRenameDialogOpen(true);
                  setOpen(false);
                }}
              >
                <PenLine className="w-6 h-6" />
                <span className="font-semibold">Rename</span>
              </Button>
              <Button
                variant="ghost"
                className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
                onClick={() =>
                  shareLink({
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${quiz.id}`,
                    title: "Check this out!",
                    text: `I found this great quiz: ${quiz.title}`,
                  })
                }
              >
                <ExternalLink className="w-6 h-6" />
                <span className="font-semibold">Share</span>
              </Button>

              <Button
                variant="ghost"
                className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
                onClick={async (e) => {
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
                  <Icons.Loader className="w-6 h-6 animate-spin stroke-gray-dark" />
                ) : (
                  <Copy className="w-6 h-6" />
                )}
                <span className="font-semibold">Duplicate</span>
              </Button>
            </div>
            <DrawerFooter className="p-1">
              <Button
                className="gap-2 justify-start text-lg w-full"
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDeleteDialogOpen(true);
                  setOpen(false);
                }}
              >
                <Trash2 className="w-6 h-6" />
                Delete
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
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
