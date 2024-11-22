import React from "react";
import { Progress } from "../ui/progress";
import { usePlayQuizContext } from "./Context";
import { Trophy } from "lucide-react";

export default function ProgressBar() {
  const {
    state: { currentQuestion, playQuizQuestions, quizMode },
  } = usePlayQuizContext();

  const progressValue =
    quizMode === "ended"
    ? 100
    : (currentQuestion / playQuizQuestions.length) * 100
  return (
    <div className="flex gap-1 flex-1 items-center">
      <span className="text-xs">
        {currentQuestion === playQuizQuestions.length ||
        quizMode === "ended" ? (
          <Trophy className="w-4 h-4" />
        ) : (
          `${currentQuestion + 1}/${playQuizQuestions.length}`
        )}
      </span>
      <Progress
        value={progressValue ? progressValue : 3}
        className="h-2 flex-1 font-medium"
      />
    </div>
  );
}
