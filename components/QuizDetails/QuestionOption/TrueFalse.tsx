import { cn, toCapitalize } from "@/lib/utils";
import { QuizDetails } from "@/types";
import React from "react";

export default function TrueFalse({
  question,
  showAnswers
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;

}) {
  if (question.type !== "TRUE_FALSE") return null;
  return (
    <div className="flex flex-col gap-1">
      {["true", "false"].map((e) => {
        return (
          <div key={e} className="flex gap-1 items-center">
            <div
              className={cn(
                "w-3 h-3 rounded-full border border-card outline outline-1 outline-primary",
                {
                  "bg-primary": question.correctAnswer === e && showAnswers,
                }
              )}
            />
            <p className="font-semibold">{toCapitalize(e)}</p>
          </div>
        );
      })}
    </div>
  );
}
