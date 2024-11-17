import React, { useState } from "react";
import { PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { LETTER_MAPPING } from "@/constants";

export default function PickAnswer({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const {
    dispatch,
    state: { quizMode, userAnswer },
  } = usePlayQuizContext();
  console.log(userAnswer);

  return (
    <div
      className={cn("grid gap-3 items-center", {
        "grid-cols-2": question.items.length > 5,
      })}
    >
      {question.items.map((item, i) => {
        // const isAnswerCorrect =
        //   quizMode !== "answered"
        //   &&  !item.isCorrect
        //    && !userAnswer
        //     && typeof userAnswer !== "string"
        //       &&   userAnswer.id === item.id

        const isShaking =
          quizMode === "answered" &&
          !item.isCorrect &&
          userAnswer &&
          typeof userAnswer !== "string" &&
          userAnswer.id === item.id;

        const isCorrect =
          quizMode === "answered" &&
          item.isCorrect &&
          userAnswer &&
          typeof userAnswer !== "string" &&
          userAnswer.id === item.id;

        // &&
        return (
          <motion.button
            key={item.id}
            className={cn(
              "py-3 px-4 rounded-xl bg-primary-foreground shadow-sm border border-transparent self-stretch flex items-center transition-colors",
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
                dispatch({ type: "SET_USER_ANSWER", payload: item });
                
              }
            }}
            // initial={{ x: 0 }}
            // animate={{
            //   x: isShaking ? [0, -10, 10, -10, 10, 0] : 0, // Shake effect
            // }}
            initial={{ x: 0, scale: 1 }}  // Initial scale set to 1
            animate={{
              // Shake effect for wrong answers
              x: isShaking ? [0, -10, 10, -10, 10, 0] : 0,
              // Scale animation for correct answers, scales up and then resets to 1
              scale: isCorrect ? [1, 1.1, 1] : 1,
              rotate: isCorrect ? [0, 5, -5, 0] : 0, // Optional rotation effect
            }}
            transition={{
              duration: 0.3, // Duration of the animation
              ease: "easeInOut",
            }}
          >
            <span className="font-medium ">{LETTER_MAPPING[`${i}`]}</span>
            <span className="flex-1">{item.text}</span>
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
