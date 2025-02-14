import React, { useState } from "react";
import { PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { LETTER_MAPPING } from "@/constants";
import { type Item } from "../Context";

export default function PickAnswer({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const {
    dispatch,
    state: {
      quizMode,
      userAnswer,
      playQuizQuestions,
      currentQuestion,
    },
  } = usePlayQuizContext();

  return (
    <div
      className={cn("grid gap-3 items-center", {
        "grid-cols-2": question.items.length > 5,
      })}
    >
      {question.items.map((item, i) => {
        const isShaking =
          quizMode === "answered" &&
          !playQuizQuestions[currentQuestion].isAnswerRight &&
          userAnswer?.type === "PICK_ANSWER" &&
          userAnswer.answer.id === item.id;

        const isCorrect =
          quizMode === "answered" &&
          playQuizQuestions[currentQuestion].isAnswerRight &&
          userAnswer?.type === "PICK_ANSWER" &&
          userAnswer.answer.id === item.id;

        return (
          <motion.button
            key={item.id}
            className={cn(
              "py-3 px-4 rounded-xl bg-primary-foreground shadow-sm border border-transparent self-stretch flex justify-between items-center transition-colors",
              {
                "bg-success/20 border-success":
                  item.isCorrect &&
                  (quizMode === "answered" || quizMode === "timeOut"),
                "bg-destructive/20 border-destructive":
                  !item.isCorrect &&
                  (quizMode === "answered" || quizMode === "timeOut"),
              }
            )}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.1,
              },
            }}
            whileTap={{
              scale: 0.97,
              transition: {
                duration: 0.1,
              },
            }}
            onClick={() => {
              if (quizMode === "playing") {
                dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
                dispatch({
                  type: "SET_USER_ANSWER",
                  payload: { type: "PICK_ANSWER", answer: item },
                });
              }
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
            <span className="font-medium ">{LETTER_MAPPING[`${i}`]}</span>
            <p className="">{item.text}</p>
            <span
              className={cn("rounded-full p-1 transition-colors", {
                "bg-success/90":
                  item.isCorrect &&
                  (quizMode === "answered" || quizMode === "timeOut"),
                "bg-destructive/90":
                  !item.isCorrect &&
                  (quizMode === "answered" || quizMode === "timeOut"),
              })}
            >
              {item.isCorrect ? (
                <Check className="w-3 h-3 text-white" />
              ) : (
                <X className="w-3 h-3 text-white" />
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
