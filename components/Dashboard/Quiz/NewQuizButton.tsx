import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import Loader from "@/components/Layout/Loader";
import { Plus } from "lucide-react";
import { useDashboardContext } from "../Context";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export default function NewQuizButton({
  folderId,
  className,
  ...props
}: ButtonProps & { folderId?: string }) {
  const {
    state: { isCreatingQuiz },
    createQuiz,
  } = useDashboardContext();
  return (
    <Button
      size="sm"
      className={cn(
        "rounded-xl items-center gap-1  border border-transparent text-xs hover:scale-[1.02] transition-transform",
        className
      )}
      disabled={isCreatingQuiz}
      onClick={() => {
        createQuiz({ pathname: "/dashboard", folderId });
      }}
      {...props}
    >
      {isCreatingQuiz ? (
        <Loader />
      ) : (
        <Icons.plus className="w-4 h-4 bg-transparent fill-white stroke-white" />
      )}
      New Quiz
    </Button>
  );
}
