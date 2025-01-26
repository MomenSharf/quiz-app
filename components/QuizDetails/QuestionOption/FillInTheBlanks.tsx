import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/utils";
import { QuizDetails } from "@/types";
import React from "react";

export default function FillInTheBlanks({
  question,
  showAnswers,
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;
}) {
  if (question.type !== "FILL_IN_THE_BLANK") return null;
  const blanks = shuffleArray(question.items.filter(e => e.isBlank))
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 items-cener my-2">
        {question.items.map((item) => {
          return (
            <>
              {item.isBlank ? (
                <span className="border-b border-black inline-block w-12" />
              ) : (
                <span>{item.text}</span>
              )}
            </>
          );
        })}
      </div>
      <div className="flex gap-1">
        {blanks.map((item) => {
          return (
            <Badge key={item.id} variant="outline">
              {item.text}
            </Badge>
          );
        })}
      </div>
      {showAnswers && <p>{question.question}</p>}
    </div>
  );
}
