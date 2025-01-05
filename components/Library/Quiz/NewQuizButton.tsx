import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { newQuiz } from "@/lib/actions/library";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLibraryContext } from "../Context";
import Loader from "@/components/Layout/Loader";
import { useRouter } from "next/navigation";

export default function NewQuizButton({
  folderId,
  className,
  ...props
}: ButtonProps & { folderId?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createQuiz = async ({
    folderId,
    pathname,
  }: {
    folderId?: string;
    pathname: string;
  }) => {
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <Button
      size="sm"
      className={cn(
        "rounded-xl items-center gap-1 border border-transparent text-xs",
        className
      )}
      disabled={loading}
      onClick={() => {
        createQuiz({ pathname: "/library", folderId });
      }}
      {...props}
    >
      {loading ? (
        <Loader />
      ) : (
        <Icons.plus className="w-4 h-4 bg-transparent fill-primary" />
      )}
      New Quiz
    </Button>
  );
}
