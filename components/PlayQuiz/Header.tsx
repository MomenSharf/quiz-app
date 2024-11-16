import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { usePlayQuizContext } from "./Context";

export default function Header({
  numberOfQuestions,
}: {
  numberOfQuestions: number;
}) {
  const {
    dispatch,
    state: { currentQuestion },
  } = usePlayQuizContext();
  return (
    <div className="flex items-center justify-between gap-3 p-1 bg-popover">
      <Button size="icon" variant="ghost">
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div
        onClick={() => {
          dispatch({ type: "SET_CURRENT_QUESTION", payload: 0 });
        }}
        className="font-medium"
      >
        Question {currentQuestion + 1}/{numberOfQuestions}
      </div>
      <div></div>
    </div>
  );
}
