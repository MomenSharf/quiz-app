import { Icons } from "@/components/icons";
import Loader from "@/components/Layout/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/quiz";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function NewQuizButton({
  folderId,
  className,
  ...props
}: ButtonProps & { folderId?: string }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const createQuiz = async ({
    folderId,
    pathname,
  }: {
    folderId?: string;
    pathname: string;
  }) => {
    const { quiz, success, message } = await newQuiz({ folderId, pathname });
    if (success && quiz) {
      toast({ description: "Quiz created successfully" });
      router.push(`/editor/${quiz.id}`);
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      size="sm"
      className={cn(
        "rounded-xl items-center gap-1 border border-transparent text-xs",
        className
      )}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          createQuiz({ pathname: "/library", folderId });
        });
      }}
      {...props}
    >
      {isPending ? (
        <Loader />
      ) : (
        <Icons.plus className="w-4 h-4 bg-transparent fill-primary" />
      )}
      New Quiz
    </Button>
  );
}
