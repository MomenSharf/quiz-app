import { toggleQuizVisibility } from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import { QuizWithQuestions } from "@/types";
import { Globe, Lock } from "lucide-react";
import { useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

type VisibilityButtonProps = {
  quiz: Pick<QuizWithQuestions, "id" | "visibility">;
  iconclassName?: string;
  className?: string;
  pathname: string;
  withText: boolean;
};

export default function VisibilityButton({
  quiz,
  iconclassName,
  className,
  pathname,
  withText,
}: VisibilityButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(quiz.visibility);

  async function setVisibility() {
    setIsLoading(true);

    try {
      const updatedQuiz = await toggleQuizVisibility(
        quiz.id,
        pathname,
        quiz.visibility
      );

      if (updatedQuiz) {
        setState(updatedQuiz.visibility);
        toast({
          title: "Success",
          description: "visibility chenged successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error with chenge visibility",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error with chenge visibility",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button
        size="icon"
        onClick={setVisibility}
        variant="ghost"
        className={cn("bg-[var(--main-bg)] rounded-full", className)}
      >
        {isLoading ? (
          <Icons.Loader className={cn("w-3 h-3 animate-spin stroke-foreground", iconclassName)} />
        ) : state === "PRIVATE" ? (
          <Lock className={cn("w-3 h-3", iconclassName)} />
        ) : (
          <Globe className={cn("w-3 h-3", iconclassName)} />
        )}
      </Button>
      {state === "PRIVATE" ? "private" : "Puplic"}
    </>
  );
}
