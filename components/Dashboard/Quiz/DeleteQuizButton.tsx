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
import { deleteQuizzes } from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useDashboardContext } from "../Context";

type DeleteQuizButtonProps = ButtonProps & {
  pathname: string;
  ids: string[];
};

export default function DeleteQuizButton({
  children,
  pathname,
  ids,
  ...props
}: DeleteQuizButtonProps) {
  const {
    dispatch,
    state: { isDeleteQuizDialogOpen, isDeletingQuiz },
    deleteQuizzess,
  } = useDashboardContext();

  useEffect(() => {
    console.log("DeleteQuizButton Props Update: ids = ", ids);
  }, [ids]);
  

  
  return (
    <Dialog
      open={isDeleteQuizDialogOpen}
      onOpenChange={(open) =>
        dispatch({ type: "SET_IS_DELETE_QUIZ_DIALOG_OPEN", payload: open })
      }
    >
      <DialogTrigger asChild>
        <Button {...props}>{children}</Button>
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
              // console.log(pathname);

              deleteQuizzess(pathname, ids);
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
