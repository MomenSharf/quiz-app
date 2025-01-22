'use client'
import { Icons } from "@/components/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { deleteQuizzes as deleteQuizzesServer } from "@/lib/actions/library";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

export default function DeleteDialog({ quizId }: { quizId: string }) {
  const [isDeletingQuiz, setIsDeletingQuiz] = useState(false);
  const router = useRouter()

  const deleteQuiz = async () => {
    setIsDeletingQuiz(true);
    const { success, message } = await deleteQuizzesServer({
      pathname: "/dashboard",
      quizzesIds: [quizId],
    });
    if (!success) {
      {
        setIsDeletingQuiz(false);
        toast({ variant: "destructive", description: message });
      }
    } else {
      setIsDeletingQuiz(false);
      toast({ description: message });
      router.back();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group rounded-full hover:bg-destructive"
          size="icon"
          variant="outline"
          disabled={isDeletingQuiz}
        >
          
          {isDeletingQuiz ? (
            <Icons.Loader className="w-4 h-4 animate-spin stroke-foreground" />
          ) : (
            <Trash2 className="w-4 h-4 text-destructive group-hover:text-white" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Delete confirmation</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isDeletingQuiz}
            onClick={() => {
              deleteQuiz();
            }}
            className="flex gap-1 items-center"
          >
            {isDeletingQuiz ? (
              <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
