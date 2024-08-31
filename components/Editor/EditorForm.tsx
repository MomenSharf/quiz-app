"use client";

import { EditorQuiz } from "@/types";
import { useEffect, useState } from "react";
import { Form } from "../ui/form";
import { MotionDiv } from "../useMotion";
import { useEditorContext } from "./EditorContext";
import EditorHeader from "./EditorHeader";
import EditorSidebar from "./EditorSidebar";
import QuestionTabs from "./QuestionTabs";
import { useWatch } from "react-hook-form";

type EditorFormProps = {
  quiz: EditorQuiz;
};
export default function EditorForm({ quiz }: EditorFormProps) {
  const onSubmit = async () => {};

  const {
    dispatch,
    state: { currentQuestion },
    form,
    debounceSaveData,
  } = useEditorContext();

  const { getValues, watch, control } = form;

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (
        name && // Guard clause to check if name is defined
        (name === "title" ||
          name === "description" ||
          name === "imageUrl" ||
          name === "visibility" ||
          name === "categories" ||
          name === "difficulty" ||
          name.startsWith("questions"))
      ) {
        // setForceRender((prev) => !prev)
        debounceSaveData(false);
      }
    });

    return () => {
      if (typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [debounceSaveData, quiz.id, watch, form]);

  useWatch({
    control,
    name: "questions",
  });

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_QUESTION_TAB", payload: "content" });
  }, [currentQuestion, dispatch]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Form {...form}>
      <form className="h-screen flex flex-col root-background-white bg-background">
        <EditorHeader />
        <div className="flex flex-col-reverse sm:flex-row h-full">
          <EditorSidebar />
          <div className="w-full">
            {getValues("questions").map((question, i) => {
              return (
                <MotionDiv
                  variants={variants}
                  initial={{ opacity: 0 }}
                  animate={
                    i === currentQuestion ? { opacity: 1 } : { opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  viewport={{ amount: 0 }}
                  style={{
                    display: i === currentQuestion ? "block" : "none",
                  }}
                  key={question.id}
                >
                  <QuestionTabs questionIndex={i} />
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </form>
    </Form>
  );
}
