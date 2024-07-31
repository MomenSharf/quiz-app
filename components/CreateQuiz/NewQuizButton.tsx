"use client";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { newQuiz } from "@/lib/actions/quiz.actions";
import { redirect, useRouter } from "next/navigation";

type NewQuizButtonProps = {
  className?: string;
  userId: string;
  pathname: string;
};

export default function NewQuizButton({
  className,
  userId,
  pathname,
}: NewQuizButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createNewQuiz = async () => {
    setIsLoading(true);

    try {
      const quizId = await newQuiz(userId, pathname);

      if (quizId) {
        // router.push(`/quizzes/${quizId}`);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      className={cn("px-5 flex items-center gap-1", className)}
      onClick={createNewQuiz}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Plus className="w-5 h-5" />
      )}
      New Quiz
    </Button>
  );
}
