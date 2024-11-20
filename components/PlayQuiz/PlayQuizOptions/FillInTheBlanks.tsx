import React, { useCallback, useState } from "react";
import {
  fillInTheBlankChoice,
  Item,
  PlayQuizQuestion,
  usePlayQuizContext,
} from "../Context";
import { Button } from "@/components/ui/button";
import { channel } from "diagnostics_channel";
import { shuffleArray } from "@/lib/utils";
import { XCircle } from "lucide-react";

export default function FillInTheBlanks({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const [userChoices, setUserChoices] = useState<fillInTheBlankChoice[]>([]);
  const {
    dispatch,
    state: {
      quizMode,
      userAnswer,
      playQuizQuestions,
      currentQuestion,
      timeTaken,
    },
  } = usePlayQuizContext();
  const [blanks, setBlanks] = useState<Item[]>(() =>
    shuffleArray(question.items).filter(
      (item) =>
        item.isBlank 
    )
  );
  console.log(userChoices);
  
  const blanksIndexes = question.items
    .map((obj, index) => (obj.isBlank ? index : null)) // Map to indices or null
    .filter((index) => index !== null); // Filter out nulls

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 flex-wrap">
        {question.items &&
          question.items.map((item, i) => {
            const choice = userChoices.find((item) => item.index === i);
            return (
              <div key={item.id} className="text-lg">
                {item.isBlank && choice ? (
                  <Button variant="outline" className="bg-background gap-1" onClick={() => {
                    setBlanks(prevs => [...prevs, choice.item])
                    setUserChoices(prevs => prevs.filter(prev => prev.item.id !== choice.item.id))
                  }
                  }>
                    {choice.item.text}
                <XCircle className="w-4 h-4" />

                  </Button>
                ) : item.isBlank ? (
                  <span className="border-b border-black inline-block w-24" />
                ) : (
                  item.text
                )}
              </div>
            );
          })}
      </div>
      <div className="flex gap-1 flex-wrap">
        {blanks
          .map((item) => {
            return (
              <Button
                key={item.id}
                variant="outline"
                onClick={() => {
                  if (
                    !userChoices.find((choice) => choice.item.id === item.id)
                  ) {
                    setUserChoices((prev) => [
                      ...prev,
                      { item, index: blanksIndexes[userChoices.length] },
                    ]);
                    setBlanks(prevs => prevs.filter(prev => prev.id !== item.id))
                  }
                }}
              >
                {item.text}
              </Button>
            );
          })}
      </div>
      <Button
        onClick={() => {
          if (quizMode === "playing") {
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
            dispatch({
              type: "SET_USER_ANSWER",
              payload: { type: "FILL_IN_THE_BLANKS", answer: userChoices },
            });
          }
        }}
      >
        Check
      </Button>
    </div>
  );
}
