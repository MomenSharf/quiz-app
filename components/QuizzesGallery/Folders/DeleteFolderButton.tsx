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
import {
  deleteFolderAndSubfolders,
  deleteQuizzes,
} from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";


type DeleteQuizButtonProps = ButtonProps & {
  text?: string;
  iconclassName?: string;
  titleIds: { title: string; id: string }[];
  pathname: string;
};

type DeleteFolderButtonProps = ButtonProps & {
  text?: string;
  iconclassName?: string;
  folderId: string;
  title: string
  pathname: string;
};

export default function DeleteFolderButton({
  className,
  variant,
  size,
  text,
  folderId,
  title,
  pathname,
  iconclassName,
  ...props
}: DeleteFolderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const delelteFolder = async () => {
    setIsLoading(true);

    try {
      const deleltedFolderId = await deleteFolderAndSubfolders(
        folderId,
        pathname
      );

      if (deleltedFolderId) {
        toast({
          title: "Success",
          description: "Folder deleted successfully",
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
        description: "An error occurred while deleting",
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
          <DialogDescription >
            Are you sure you want to delete <span className="text-foreground font-bold">{title}</span>

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
            onClick={delelteFolder}
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
