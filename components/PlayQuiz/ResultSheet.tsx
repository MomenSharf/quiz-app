import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePlayQuizContext } from "./Context";
import { ArrowRight, Check, X } from "lucide-react";
import { Icons } from "../icons";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ResultSheet() {
  const {
    dispatch,
    state: { isResultSheetOpen, currentQuestion, playQuizQuestions, quizMode },
    goNextQuestion,
  } = usePlayQuizContext();

  const isRight =
    playQuizQuestions[currentQuestion] &&
    playQuizQuestions[currentQuestion].isAnswerRight === null &&
    playQuizQuestions.length !== 0
      ? playQuizQuestions[currentQuestion - 1] &&
        playQuizQuestions[currentQuestion - 1].isAnswerRight
      : playQuizQuestions[currentQuestion] &&
        playQuizQuestions[currentQuestion].isAnswerRight;

  return (
    <Sheet open={isResultSheetOpen} onOpenChange={(e) => dispatch({type: 'SET_IS_RESULT_SHEET_OPEN', payload: e})}>
      <SheetContent
        side="bottom"
        hideClose
        className="bg-card p-0 border-0"
        overlayClasses="bg-black/10"
      >
        <div
          className={cn("flex flex-col sm:flex-row gap-3 sm:items-center p-3", {
            "bg-success/40": isRight,
            "bg-destructive/40": !isRight,
          })}
        >
          <div className="flex gap-3 flex-1 items-center">
            <div className="p-2 sm:p-3 bg-card rounded-full">
              {isRight ? (
                <Check
                  className="w-5 h-5 sm:w-6 sm:h-6 text-success"
                  strokeWidth={4}
                />
              ) : (
                <X
                  className="w-5 h-5 sm:w-6 sm:h-6 text-destructive"
                  strokeWidth={4}
                />
              )}
            </div>

            <div
              className={cn(
                "flex-1 text-white font-medium flex items-center sm:justify-center text-md",
                {
                  "text-success": isRight,
                  "text-destructive": !isRight,
                }
              )}
            >
              {quizMode === "timeOut"
                ? "Time out"
                : isRight
                ? "Your answer is correct"
                : "Your answer is wrong!"}
            </div>
          </div>
          <Button
            className={cn({
              "bg-success hover:bg-success/90 focus-visible:ring-success":
                isRight,
              "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive":
                !isRight,
            })}
            onClick={goNextQuestion}
          >
            Continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
