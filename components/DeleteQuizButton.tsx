"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button, ButtonProps, buttonVariants } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteQuizzes } from "@/lib/actions/quiz.actions";
import { toast } from "./ui/use-toast";

type DeleteQuizButtonProps = ButtonProps & {
  text?: string;
  iconclassName?: string
  quizzesIds: string[];
  pathname: string
};

export default function DeleteQuizButton({
  className,
  variant,
  size,
  text,
  quizzesIds,
  pathname,
  iconclassName,
  ...props
}: DeleteQuizButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const delelteQuizzesFn = async () => {
    setIsLoading(true);

    try {
      const deleltedQuizzes = await deleteQuizzes(quizzesIds, pathname);

      if (deleltedQuizzes) {
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
    <Button
      disabled={isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={delelteQuizzesFn}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className={cn("w-4 h-4", iconclassName)} />
      )}
      {text}
    </Button>
  );
}
