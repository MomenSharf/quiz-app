import React from "react";
import { PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TrueAndFalse({
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

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "TRUE_FALSE";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "TRUE_FALSE";

  return (
    <div className="grid grid-cols-2 gap-3 PX-1">
      <motion.button
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-28 text-lg font-semibold text-primary-foreground bg-success/90 border-success hover:bg-success/90 hover:text-primary-foreground"
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
        initial={{ x: 0, scale: 1 }}
        animate={{
          x: isShaking && userAnswer.answer === "true" ? [0, -5, 5, -5, 5, 0] : 0,
          scale: (isCorrect && userAnswer.answer === "true") || (quizMode === 'timeOut' &&  question.correctAnswer === 'true') ? [1, 1.1, 1] : 1,
          rotate: isCorrect && userAnswer.answer === "true" ||  (quizMode === 'timeOut' && question.correctAnswer === 'true')  ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={() => {
          if (quizMode === "playing") {
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" }); 
            dispatch({
              type: "SET_USER_ANSWER",
              payload: { type: "TRUE_FALSE", answer: "true" },
            });
          }
        }}
      >
        True
      </motion.button>
      <motion.button
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-28 text-lg font-semibold  text-primary-foreground bg-destructive/90 border-destructive  hover:bg-destructive/90 hover:text-primary-foreground "
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
        initial={{ x: 0, scale: 1 }}
        animate={{
          x: isShaking && userAnswer.answer === "false"    ? [0, -5, 5, -5, 5, 0] : 0,
          scale: isCorrect && userAnswer.answer === "false" || (quizMode === 'timeOut' &&  question.correctAnswer === 'false')  ? [1, 1.1, 1] : 1,
          rotate: isCorrect && userAnswer.answer === "false"||(quizMode === 'timeOut' &&  question.correctAnswer === 'false') ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={() => {
          if (quizMode === "playing") {
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
            dispatch({
              type: "SET_USER_ANSWER",
              payload: { type: "TRUE_FALSE", answer: "false" },
            });
          }
        }}
      >
        False
      </motion.button>
    </div>
  );
}
