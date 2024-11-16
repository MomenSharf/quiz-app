import React from "react";
import { Progress } from "../ui/progress";
import { usePlayQuizContext } from "./Context";

export default function ProgressBar() {
  const {
    state: { currentQuestion, playQuizQuestions },
  } = usePlayQuizContext();

  const progressValue = (currentQuestion / playQuizQuestions.length) * 100;
  return (
    <Progress
      value={100}
      // value={progressValue ? progressValue : 3}
      className="h-2"
    />
  );
}
