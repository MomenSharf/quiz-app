import React from "react";
import { Form } from "../ui/form";
import { useEditorContext } from "./Context";
import { motion } from "framer-motion";
import TypeSelector from "./TypeSelector";
import Question from "./Question/Question";
import Settings from "./Settings/Settings";

export default function Content() {
  const {
    state: { currentQuestionId, isSettingsOpen },
    form,
  } = useEditorContext();

  const { getValues } = form;
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <main className="flex-1 overflow-y-auto main-background">
      <>
        {isSettingsOpen ? (
          <Settings  />
        ) : (
          <>
            {getValues("questions").map((question, i) => {
              return (
                <motion.div
                  variants={variants}
                  initial={{ opacity: 0, display: "none" }}
                  animate={
                    question.id === currentQuestionId
                      ? {
                          opacity: 1,
                          display: "block",
                          transition: { duration: 0.3 },
                        }
                      : {
                          opacity: 0,
                          display: "none",
                          transition: { duration: 0 },
                        }
                  }
                  exit={{ opacity: 0, display: "none" }}
                  viewport={{ amount: 0 }}
                  key={question.id}
                >
                  {question.type === "UNSELECTED" ? (
                    <TypeSelector key={question.id} questionIndex={i} />
                  ) : (
                    <Question question={question} questionIndex={i} />
                  )}
                </motion.div>
              );
            })}
          </>
        )}
      </>
    </main>
  );
}
