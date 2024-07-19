import { Check, Triangle } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

type QuizFormProgressProps = {
  numberOfQuestions: number;
  step: number;
};

export default function QuizFormProgress({
  numberOfQuestions,
  step,
}: QuizFormProgressProps) {
  const length = numberOfQuestions;

  return (
    <div className="relative h-7 mb-2 mt-6">
      <div className="absolute w-full rounded-lg bg-[hsl(var(--primary)_/_30%)] h-1 left-0 top-1/2 -translate-y-1/2" />
      <div
        className="absolute rounded-lg bg-primary h-1 left-0 top-1/2 -translate-y-1/2 px-6 transition-all"
        style={{ width: `${((step - 1) / numberOfQuestions) * 100}%` }}
      >
        <Badge className="absolute text-xs rounded-md right-0 -top-9 translate-x-1/2 flex justify-center items-center">
          {step <= numberOfQuestions ? (
            // `Question ${step}`
            `${step}`
          ) : (
            <Check className="w-4 h-4" />
          )}
          <div className="absolute w-0 h-0 border-[8px] border-r-transparent border-l-transparent border-b-transparent border-t-primary right-1/2 -bottom-4 translate-x-1/2" />
        </Badge>
      </div>
      {/* <div className="w-full absolute top-1/2 -translate-y-1/2 flex justify-between hidden">
        {Array.from({ length }, (_, i) => i).map((_, i) => {
          return (
            <span
              key={i}
              className="flex justify-center items-center bg-primary rounded-full text-primary-foreground w-5 h-5 text-xs sm:text-sm sm:w-6 sm:h-6"
            >
              {step > i + 1  ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                i + 1
              )}
            </span>
          );
        })}
      </div> */}
    </div>
  );
}
