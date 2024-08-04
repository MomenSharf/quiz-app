"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


type NewQuizButtonProps = {
  className?: string;
  userId: string;
  folderId? : string 
  pathname: string;
};

export default function NewQuizButton({
  className,
  folderId,
  pathname,
}: NewQuizButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(folderId);
  
  const router = useRouter();

  const createNewQuiz = async () => {
    setIsLoading(true);

    try {
      const quizId = await newQuiz(pathname, folderId);

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
      className={cn("px-5 flex items-center gap-1 ", className)}
      onClick={createNewQuiz}
    >
      {isLoading ? (
        <Icons.Loader  className="w-4 h-4 animate-spin stroke-primary-foreground" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      New Quiz
    </Button>
  );
}
