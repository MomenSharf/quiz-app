import { shuffleArray } from "@/lib/utils";
import { QuizDetails } from "@/types";
import { Check, Circle } from "lucide-react";
import React from "react";

export default function Order({
  question,
  showAnswers,
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;
}) {
  if (question.type !== "ORDER") return null;
  const items = showAnswers ? question.items : shuffleArray(question.items);
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        return (
          <div key={item.id} className="flex gap-2 items-center">
            {!showAnswers ? (
              <Circle className="w-5 h-5 text-primary" />
            ) : (
              <div className="bg-success rounded-full w-5 h-5 flex justify-center items-center">
                <Check className="w-3 h-3 text-card" />
              </div>
            )}
            <div className="flex gap-1">
              {showAnswers && (
                <span className="text-sm font-semibold text-muted-foreground">{item.order} .</span>
              )}
              <span className="text-sm font-semibold">{item.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
