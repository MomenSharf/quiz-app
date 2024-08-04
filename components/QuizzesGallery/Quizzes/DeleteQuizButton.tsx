"use client";
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
import { useState } from "react";


type DeleteQuizButtonProps = ButtonProps & {
  text?: string;
  iconclassName?: string;
  titleIds: { title: string; id: string }[];
  pathname: string;
};

export default function DeleteQuizButton({
  className,
  variant,
  size,
  text,
  titleIds,
  pathname,
  iconclassName,
  ...props
}: DeleteQuizButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const delelteQuizzesFn = async () => {
    setIsLoading(true);

    const ids = titleIds.map((e) => e.id);

    try {
      const deleltedQuizzes = await deleteQuizzes(ids, pathname);

      if (deleltedQuizzes) {
        setIsOpen(false)
        toast({
          title: "Success",
          description: "Quiz deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while deleting",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error with creating new Quiz",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          <Trash2 className={cn("w-4 h-4", iconclassName)} />
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Delete confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this:
            <ul className="overflow-y-scroll max-h-[60vh] list-disc">{
              titleIds.map(({title, id}) => (
                <li key={id}>{title}</li>
              ))
              }</ul>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-3 justify-end"
        >
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={delelteQuizzesFn}
            className="flex gap-1 items-center"
          >
            {isLoading ? (
              <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
            ) : (
              <Trash2 className={cn("w-4 h-4", iconclassName)} />
            )}
            {text}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
