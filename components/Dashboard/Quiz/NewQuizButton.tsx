import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import Loader from "@/components/Layout/Loader";
import { Plus } from "lucide-react";
import { useDashboardContext } from "../Context";
import { cn } from "@/lib/utils";

export default function NewQuizButton({ className, ...props }: ButtonProps) {
  const {
    state: { isCreatingQuiz },
    createQuiz,
  } = useDashboardContext();
  return (
    <Button
      size="sm"
      className={cn("px-6 rounded-xl items-center gap-1  border border-transparent", className)}
      onClick={() => {
        createQuiz({ pathname: "/dashboard" });
      }}
      {...props}
    >
      {isCreatingQuiz ? <Loader /> : <Plus className="w-4 h-4" />}
      New Quiz
    </Button>
  );
}
