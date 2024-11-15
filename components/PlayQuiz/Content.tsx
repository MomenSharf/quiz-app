import React from "react";
import QuizImage from "./QuizImage";
import { motion } from "framer-motion";
import { usePlayQuizContext, type PlayQuizQuestion } from "./Context";
import { toCapitalize } from "@/lib/utils";
import { Button } from "../ui/button";
import OptionsSwitcher from "./OptionsSwitcher";

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
    state: { currentQuestion },
  } = usePlayQuizContext();
  return (
    <div className="flex justify-center w-full flex-1 mt-3">
      <div className="p-3 max-w-4xl">
        {questions
          .sort((a, b) => a.questionOrder - b.questionOrder)
          .map((question) => {
            return (
              <motion.div
                variants={variants}
                initial={{ opacity: 0 }}
                animate={
                  question.questionOrder === currentQuestion
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                viewport={{ amount: 0 }}
                style={{
                  display:
                    question.questionOrder === currentQuestion
                      ? "grid"
                      : "none",
                }}
                key={question.id}
                className="sm:grid-cols-2 gap-5"
              >
                <div className="flex flex-col gap-3">
                  <QuizImage imageUrl="" />
                  {question.question && (
                    <p className="text-2xl text-gray-900 text-center sm:text-start">
                      {toCapitalize(question.question)}
                    </p>
                  )}
                </div>
                <OptionsSwitcher question={question} />
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
