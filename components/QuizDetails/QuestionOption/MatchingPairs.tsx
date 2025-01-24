import { shuffleMatches } from "@/lib/utils";
import { QuizDetails } from "@/types";
import { ArrowRight, Check, Circle } from "lucide-react";
import React from "react";

export default function MatchingPairs({
  question,
  showAnswers,
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;
}) {
  if (question.type !== "MATCHING_PAIRS") return null;
  const items = showAnswers ? question.items : shuffleMatches(question.items);
  return (
    <div
      className="grid w-full gap-x-1 gap-y-2"
      style={{ gridTemplateColumns: "repeat(4, minmax(0px, max-content))" }}
    >
      {items.map((item) => {
        return (
          <>
            {!showAnswers ? (
              <Circle className="w-5 h-5 text-primary" />
            ) : (
              <div className="bg-success rounded-full w-5 h-5 flex justify-center items-center">
                <Check className="w-3 h-3 text-card" />
              </div>
            )}
            <p className="text-sm truncate">{item.text}</p>
            <ArrowRight className="w-4 h-5" />
            <p className="text-sm truncate">{item.match}</p>
          </>
        );
      })}
    </div>
  );
}
