import React, { useCallback, useEffect, useState } from "react";
import {
  fillInTheBlankChoice,
  Item,
  PlayQuizQuestion,
  usePlayQuizContext,
} from "../Context";
import { Button, buttonVariants } from "@/components/ui/button";
import { channel } from "diagnostics_channel";
import { cn, shuffleArray } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FillInTheBlanks({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const [userChoices, setUserChoices] = useState<fillInTheBlankChoice[]>([]);
  const [error, setError] = useState<null | string>("");
  const {
    dispatch,
    state: { quizMode, playQuizQuestions, currentQuestion, userAnswer },
  } = usePlayQuizContext();
  const [blanks, setBlanks] = useState<Item[]>(() =>
    shuffleArray(question.items).filter((item) => item.isBlank)
  );

  const blanksItems = question.items
    ? question.items.filter((item) => item.isBlank)
    : [];

  const blanksIndexes = question.items
    .map((obj, index) => (obj.isBlank ? index : null)) // Map to indices or null
    .filter((index) => index !== null); // Filter out nulls

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "FILL_IN_THE_BLANKS";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "FILL_IN_THE_BLANKS";

  useEffect(() => {
    if (quizMode === "answered" || quizMode === "timeOut") {
      setTimeout(() => {
        const gg = question.items
          .filter((item) => item.isBlank)
          .map((item, index) => {
            return { item, index: blanksIndexes[index] };
          });
        setUserChoices(gg);
      }, 500);
    } else if (
      quizMode === "playing" &&
      playQuizQuestions[currentQuestion] &&
      playQuizQuestions[currentQuestion].isAnswerRight === null &&
      currentQuestion !== 0
    ) {
      setBlanks(shuffleArray([...question.items.filter((e) => e.isBlank)]));
      setUserChoices([]);
    }
  }, [quizMode]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 flex-wrap">
        {question.items &&
          question.items.map((item, i) => {
            const choice = userChoices.find((item) => item.index === i);
            return (
              <div key={item.id} className="text-lg">
                {item.isBlank && choice ? (
                  <motion.button
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "bg-background gap-1"
                    )}
                    onClick={() => {
                      setBlanks((prevs) => [...prevs, choice.item]);
                      setUserChoices((prevs) =>
                        prevs.filter((prev) => prev.item.id !== choice.item.id)
                      );
                    }}
                    initial={{ x: 0, scale: 1 }}
                    animate={{
                      x: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
                      scale: isCorrect ? [1, 1.1, 1] : 1,
                      rotate: isCorrect ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {choice.item.text}
                    <XCircle className="w-4 h-4" />
                  </motion.button>
                ) : item.isBlank ? (
                  <span className="border-b border-black inline-block w-24" />
                ) : (
                  item.text
                )}
              </div>
            );
          })}
      </div>
      {(quizMode === "waiting" || quizMode === "playing") && (
        <div className="flex gap-1 flex-wrap">
          {blanks.map((item) => {
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
                    setBlanks((prevs) =>
                      prevs.filter((prev) => prev.id !== item.id)
                    );
                  }
                  if (blanksItems.length === userChoices.length + 1)
                    setError(null);
                }}
              >
                {item.text}
              </Button>
            );
          })}
        </div>
      )}
      {error && <span className="text-xs text-destructive">{error}</span>}
      <Button
        onClick={() => {
          if (question.items && blanksItems.length !== userChoices.length) {
            return setError("Please select all blanks");
          }
          if (quizMode === "playing") {
            setError(null);
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
            dispatch({
              type: "SET_USER_ANSWER",
              payload: { type: "FILL_IN_THE_BLANKS", answer: userChoices },
            });
          }
        }}
        disabled={quizMode === "answered" || quizMode === "timeOut"}
      >
        Check
      </Button>
    </div>
  );
}
