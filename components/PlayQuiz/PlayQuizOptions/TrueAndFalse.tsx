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
  console.log(question.correctAnswer && question.correctAnswer);

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

  const isShaking =
    quizMode === "answered" &&
    userAnswer &&
    typeof userAnswer === "string" &&
    question.correctAnswer !== userAnswer;

  const isCorrect =
    quizMode === "answered" &&
    userAnswer &&
    typeof userAnswer === "string" &&
    question.correctAnswer === userAnswer;

  return (
    <div className="grid grid-cols-2 gap-3">
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
          x: isShaking && userAnswer === "true" ? [0, -10, 10, -10, 10, 0] : 0,
          scale: isCorrect && userAnswer === "true" ? [1, 1.1, 1] : 1,
          rotate: isCorrect && userAnswer === "true" ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={() => {
          const newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i) {
              return {
                ...question,
                isAnswerRight: question.correctAnswer === "true",
                timeTaken,
              };
            } else {
              return question;
            }
          });
          if (quizMode === "playing") {
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
            dispatch({ type: "SET_USER_ANSWER", payload: "true" });
            setTimeout(() => {
              dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
            }, 500);
            dispatch({
              type: "SET_PLAY_QUIZ_QUESTIONS",
              payload: newPlayQuizQuestions,
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
          x: isShaking && userAnswer === "false" ? [0, -10, 10, -10, 10, 0] : 0,
          scale: isCorrect && userAnswer === "false" ? [1, 1.1, 1] : 1,
          rotate: isCorrect && userAnswer === "false" ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={() => {
          const newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i) {
              return {
                ...question,
                isAnswerRight: question.correctAnswer === "false",
                timeTaken,
              };
            } else {
              return question;
            }
          });
          if (quizMode === "playing") {
            dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
            dispatch({ type: "SET_USER_ANSWER", payload: "false" });
            setTimeout(() => {
              dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
            }, 500);
            dispatch({
              type: "SET_PLAY_QUIZ_QUESTIONS",
              payload: newPlayQuizQuestions,
            });
          }
        }}
      >
        False
      </motion.button>
    </div>
  );
}
