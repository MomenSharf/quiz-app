import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePlayQuizContext } from "./Context";
import { ArrowRight, Check, X } from "lucide-react";
import { Icons } from "../icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ResultSheet() {
  const {
    dispatch,
    state: { isResultSheetOpen, currentQuestion, playQuizQuestions },
  } = usePlayQuizContext();


  const isRight = playQuizQuestions[currentQuestion] && playQuizQuestions[currentQuestion].isAnswerRight
  return (
    <Sheet open={isResultSheetOpen}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent
        side="bottom"
        hideClose
        className="bg-white p-0 border-0"
      >
        <div
          className={cn("flex flex-col sm:flex-row gap-3 sm:items-center p-3", {
            "bg-success/50": isRight,
            "bg-destructive/50": !isRight,
          })}
        >
          <div className="flex gap-3 flex-1 items-center">
            <div className="p-3 bg-white rounded-full">
              {isRight ? (
                <Check className="w-6 h-6 text-success" strokeWidth={4} />
              ) : (
                <X className="w-6 h-6 text-destructive" strokeWidth={4} />
              )}
            </div>

            <div className="flex-1 text-white font-medium flex items-center sm:justify-center text-md">
              {isRight ? "Your answer is correct" : "Your answer is wrong!"}
            </div>
          </div>
          <Button
            className={cn({
              "bg-success hover:bg-success/90": isRight,
              "bg-destructive hover:bg-destructive/90": !isRight,
            })}
            onClick={() => {
              dispatch({type: 'SET_CURRENT_QUESTION', payload: currentQuestion + 1})
              dispatch({type: 'SET_QUIZ_MODE', payload: 'playing'})
              dispatch({type: 'SET_IS_RESULT_SHEET_OPEN', payload: false})
            }}
          >
            Continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
