import React from "react";
import { Form } from "../ui/form";
import { useEditorContext } from "./Context";
import { motion } from "framer-motion";
import TypeSelector from "./TypeSelector";
import Question from "./Question/Question";
import Settings from "./Settings/Settings";

export default function Content() {
  const {
    state: { currentQuestionId, settingsOpen },
    form,
  } = useEditorContext();

  const { getValues } = form;
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <main className="flex-1 overflow-y-auto main-background">
      {getValues("questions").map((question, i) => {
        return (
          <motion.div
            variants={variants}
            initial={{ opacity: 0 }}
            animate={
              question.id === currentQuestionId || settingsOpen.open
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ amount: 0 }}
            style={{
              display: question.id === currentQuestionId ? "block" : "none",
            }}
            key={question.id}
          >
            {settingsOpen.open ? (
              <Settings type={settingsOpen.type} />
            ) : question.type === "UNSELECTED" ? (
              <TypeSelector key={question.id} questionIndex={i} />
            ) : (
              <Question question={question} questionIndex={i} />
            )}
          </motion.div>
        );
      })}
    </main>
  );
}
