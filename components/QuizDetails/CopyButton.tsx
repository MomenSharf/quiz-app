"use client";
import { copyQuiz as copyQuizServer } from "@/lib/actions/quizDetails";
import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Copy } from "lucide-react";

export default function CopyButton({ quizId }: { quizId: string }) {
  const [isCopyingQuiz, setIsCopiyngQuiz] = useState(false);

  const router = useRouter();

  const copyQuiz = async () => {
    setIsCopiyngQuiz(true);
    const { success, message, newQuiz } = await copyQuizServer(quizId);
    if (!success || !newQuiz) {
      toast({ variant: "destructive", description: message });
    } else {
      toast({ description: message });
      router.push(`/editor/${newQuiz.id}`);
    }
    setIsCopiyngQuiz(false);
  };
  return (
    <Button
      className="rounded-full"
      size="icon"
      variant="outline"
      onClick={copyQuiz}
      disabled={isCopyingQuiz}
    >
      {isCopyingQuiz ? (
        <Icons.Loader className="w-4 h-4 animate-spin stroke-foreground" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
}
