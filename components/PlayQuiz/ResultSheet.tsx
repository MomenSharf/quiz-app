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
  } = usePlayQuizContext();

  const isRight =
    playQuizQuestions[currentQuestion] &&
    playQuizQuestions[currentQuestion].isAnswerRight;
  return (
    <Sheet open={isResultSheetOpen}>
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
            onClick={() => {
              dispatch({
                type: "SET_CURRENT_QUESTION",
                payload: currentQuestion + 1,
              });
              dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: false });
              if (currentQuestion !== playQuizQuestions.length - 1)
                dispatch({ type: "SET_QUIZ_MODE", payload: "playing" });
              else dispatch({ type: "SET_QUIZ_MODE", payload: "ended" });
            }}
          >
            Continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
