import React from "react";
import QuizImage from "./QuizImage";
import { motion } from "framer-motion";
import { usePlayQuizContext, type PlayQuizQuestion } from "./Context";
import { cn, toCapitalize } from "@/lib/utils";
import { Button } from "../ui/button";
import OptionsSwitcher from "./OptionsSwitcher";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuizResult from "./QuizResult";
import Hints from "./Hints";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Content() {
  const {
    state: { currentQuestion, quizMode, playQuizQuestions, isResultSheetOpen },
    goNextQuestion,
  } = usePlayQuizContext();

  return (
    <div className="flex flex-col w-full flex-1  items-center justify-center">
      <div className="p-3 w-full max-w-6xl flex-1 flex items-center justify-center">
        {quizMode !== "ended" ? (
          <div className="flex-1">
            {playQuizQuestions
              .sort((a, b) => a.questionOrder - b.questionOrder)
              .map((question) => {
                return (
                  <motion.div
                    variants={variants}
                    initial={{ opacity: 1, x: 50 }}
                    animate={
                      question.questionOrder === currentQuestion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0 }
                    }
                    exit={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ amount: 0 }}
                    style={{
                      display:
                        question.questionOrder === currentQuestion
                          ? "flex"
                          : "none",
                    }}
                    key={question.id}
                    className={cn(
                      "flex flex-col sm:flex-row gap-5 items-center justify-center"
                    )}
                  >
                    {question.imageUrl && (
                      <QuizImage imageUrl={question.imageUrl} />
                    )}
                    <div className="flex flex-col gap-3 h-full w-full sm:justify-center max-w-2xl">
                      {question.question &&
                        question.type !== "FILL_IN_THE_BLANK" && (
                          <p className="text-2xl text-gray-dark text-center sm:text-start">
                            {toCapitalize(question.question)}
                          </p>
                        )}
                      <div className="flex gap-3 justify-between">
                        <Timer
                          timeLimit={question.timeLimit}
                          questionOrder={question.questionOrder}
                        />
                        <Hints />
                      </div>
                      <OptionsSwitcher question={question} />
                      <div
                        className={cn("flex justify-end opacity-0", {
                          "opacity-100":
                            quizMode === "answered" || quizMode === "timeOut",
                        })}
                      >
                        <Button onClick={goNextQuestion}>Next</Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        ) : (
          <QuizResult />
        )}
      </div>
    </div>
  );
}
