import React from "react";
import { Form } from "../ui/form";
import { useEditorContext } from "./Context";
import { motion } from "framer-motion";
import TypeSelector from "./TypeSelector";
import Question from "./Question/Question";

export default function Content() {
  const {
    dispatch,
    state: { currentQuestionId, isSettingsOpen },
    form,
    debounceSaveData,
  } = useEditorContext();

  const { getValues, watch, control, handleSubmit } = form;
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const onSubmit = async () => {
    console.log("fomtStat goood");
  };

  return (
    <main className="flex-1 overflow-y-auto main-background">
      {getValues("questions").map((question, i) => {
        return (
          <motion.div
            variants={variants}
            initial={{ opacity: 0 }}
            animate={
              question.id === currentQuestionId || isSettingsOpen
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
            {isSettingsOpen ? (
              "Settings"
            ) : question.type === "UNSELECTED" ? (
              <TypeSelector key={question.id} questionIndex={i} />
            ) : (
             <Question question={question} questionIndex={i} />
            )}
            {/* <ImageEditor /> */}
          </motion.div>
        );
      })}
    </main>
  );
}
