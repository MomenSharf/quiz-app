import React from "react";
import QuizImage from "./QuizImage";
import { motion } from "framer-motion";
import { usePlayQuizContext, type PlayQuizQuestion } from "./Context";
import { toCapitalize } from "@/lib/utils";
import { Button } from "../ui/button";
import OptionsSwitcher from "./OptionsSwitcher";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Content({
  questions,
}: {
  questions: PlayQuizQuestion[];
}) {
  const {
    state: { currentQuestion, playQuizQuestions },
  } = usePlayQuizContext();
  return (
    <div className="flex flex-col w-full flex-1  items-center">
      <div className="p-3 max-w-4xl flex-1 flex flex-col">
        {currentQuestion !== playQuizQuestions.length ? (
          <div className="flex-1 flex">
            {questions
              .sort((a, b) => a.questionOrder - b.questionOrder)
              .map((question) => {
                return (
                  <motion.div
                    variants={variants}
                    initial={{ opacity: 1 }}
                    animate={
                      question.questionOrder === currentQuestion
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ amount: 0 }}
                    style={{
                      display:
                        question.questionOrder === currentQuestion
                          ? "grid"
                          : "none",
                    }}
                    key={question.id}
                    className="grid-rows-[auto_1fr] sm:grid-rows-1 sm:grid-cols-2 gap-5 items-center"
                  >
                    <QuizImage imageUrl="" />
                    <div className="flex flex-col gap-3 h-full sm:justify-center">
                      {question.question && (
                        <p className="text-2xl text-gray-900 text-center sm:text-start">
                          {toCapitalize(question.question)}
                        </p>
                      )}
                      <Timer timeLimit={question.timeLimit} />
                      <OptionsSwitcher question={question} />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        ) : currentQuestion === playQuizQuestions.length ? (
          "result"
        ) : null}
      </div>
    </div>
  );
}
