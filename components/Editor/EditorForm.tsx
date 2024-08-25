"use client";

import { revalidatePathInServer, saveQuiz } from "@/lib/actions/quiz.actions";
import {
  codeSchema,
  fillInTheBlankSchema,
  matchingPairsSchema,
  multipleChoiceSchema,
  pickImageSchema,
  questionOrderSchema,
  questionSchemaType,
  quizSchema,
  quizSchemaType,
  shortAnswerSchema,
  singleChoiceSchema,
  trueFalseSchema,
  unselectedSchema,
} from "@/lib/validations/quizSchemas";
import { EditorQuiz, updataQuiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { Form } from "../ui/form";
import EditorHeader from "./EditorHeader";
import { Button } from "../ui/button";
import EditorSidebar from "./EditorSidebar";
import QuestionTabs from "./QuestionTabs";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MotionDiv } from "../useMotion";
import { Question, QuestionType } from "@prisma/client";
import { z } from "zod";
import { EditorProvider, useEditorContext } from "./EditorContext";

type EditorFormProps = {
  quiz: EditorQuiz;
};
export default function EditorForm({ quiz }: EditorFormProps) {
  const onSubmit = async () => {};

  const {  state, form, historyIndex, debounceSaveData } =
    useEditorContext();

  const { currentQuestion } = state;

  const watch = form.watch();

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
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
        debounceSaveData(false);
        
      }
    });

    return () => {
      if (typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [debounceSaveData, form, quiz.id, watch]);

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
            {form.getValues().questions.map((question, i) => {
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
                  key={i}
                >
                  <QuestionTabs question={question} index={i} />
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </form>
    </Form>
  );
}
