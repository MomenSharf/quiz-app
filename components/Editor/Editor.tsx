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

type EditorProps = {
  quiz: EditorQuiz;
};

export default function Editor({ quiz }: EditorProps) {
  const isOnline = true;

  const initialValue = useMemo(
    () => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      imageUrl: quiz.imageUrl ?? undefined,
      visibility: quiz.visibility,
      categories: quiz.categories,
      difficulty: quiz.difficulty,
      questions: quiz.questions
        .map((question) => {
          switch (question.type) {
            case QuestionType.UNSELECTED:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
              } as z.infer<typeof unselectedSchema>;

            case QuestionType.SINGLE_CHOICE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                options: question.options ?? [],
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof singleChoiceSchema>;

            case QuestionType.MULTIPLE_CHOICE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                options: question.options ?? [],
                correctAnswers: question.correctAnswers ?? [],
              } as z.infer<typeof multipleChoiceSchema>;

            case QuestionType.TRUE_FALSE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                correctAnswer: (question.correctAnswer ?? "true") as
                  | "true"
                  | "false",
              } as z.infer<typeof trueFalseSchema>;

            case QuestionType.FILL_IN_THE_BLANK:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof fillInTheBlankSchema>;

            case QuestionType.SHORT_ANSWER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof shortAnswerSchema>;

            case QuestionType.MATCHING_PAIRS:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                pairs: question.pairs ?? [],
              } as z.infer<typeof matchingPairsSchema>;

            case QuestionType.ORDER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                correctOrder: question.correctOrder ?? [],
              } as z.infer<typeof questionOrderSchema>;

            case QuestionType.PICK_IMAGE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                imagesOptions: question.imagesOptions ?? [],
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof pickImageSchema>;

            case QuestionType.CODE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                question: question.question ?? "",
                codeSnippet: question.codeSnippet ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof codeSchema>;

            default:
              return {
                id: question.id,
                type: QuestionType.UNSELECTED,
                questionOrder: question.questionOrder,
              } as z.infer<typeof unselectedSchema>;
          }
        })
        .sort((a, b) => a.questionOrder - b.questionOrder),
    }),
    [quiz]
  );

  const form = useForm<quizSchemaType>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialValue,
  });


  const [saveState, setSaveState] = useState<
    "GOOD" | "BAD" | "WAITING" | "OFFLINE"
  >(() => (isOnline ? "GOOD" : "OFFLINE"));
  const [formsArray, setFormsArray] = useState<quizSchemaType[]>([
    initialValue,
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const pathname = usePathname();

  const isSaving = useRef(false);
  const historyIndex = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const saveQuizFun = useCallback(
    async (isReseting: boolean) => {
      if (!isOnline) {
        return;
      }
      const data = form.getValues();

      try {
        if (!isSaving.current) {
          isSaving.current = true;
          setSaveState("WAITING");
        }

        const prismaQuiz = await saveQuiz(quiz.id, data, pathname);

        if (prismaQuiz) {
          setSaveState("GOOD");
          if (!isReseting) {
            historyIndex.current = historyIndex.current + 1;
            setFormsArray([...formsArray.slice(0, historyIndex.current), data]);
          }
        } else {
          setSaveState("BAD");
        }
      } catch (error: any) {
        setSaveState("BAD");
      } finally {
        isSaving.current = false;
      }
    },
    [form, formsArray, isOnline, pathname, quiz.id]
  );
  

  const debounceSaveData = useDebouncedCallback((isReseting: boolean) => {
    if (!isSaving.current) {
      saveQuizFun(isReseting);
    }
  }, 1500);

  const watch = form.watch();

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
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
  }, [watch, debounceSaveData, form]);

  const undoFunction = useCallback(() => {
    if (historyIndex.current > 0) {
      historyIndex.current = historyIndex.current - 1;
      form.reset(formsArray[historyIndex.current]);
      debounceSaveData(true);
    }
  }, [debounceSaveData, form, formsArray]);

  const redoFunction = useCallback(() => {
    if (historyIndex.current < formsArray.length - 1) {
      historyIndex.current = historyIndex.current + 1;
      form.reset(formsArray[historyIndex.current]);
      debounceSaveData(true);
    }
  }, [debounceSaveData, form, formsArray]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.key === "z" || event.key === "Z") {
          event.preventDefault();
          if (saveState !== "WAITING") undoFunction();
        }
        if (event.key === "y" || event.key === "Y") {
          event.preventDefault();
          if (saveState !== "WAITING") redoFunction();
        }
        if (event.key === "s" || event.key === "S") {
          event.preventDefault();
          if (saveState !== "WAITING") saveQuizFun(false);
        }
      }
    },
    [redoFunction, saveQuizFun, saveState, undoFunction]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOnline) {
      setSaveState("GOOD");
    }
  }, [isOnline]);

  const onSubmit = async () => {};

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Form {...form}>
      <form
        // className="w-full h-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr] root-background-white bg-background"
        className="h-screen flex flex-col root-background-white bg-background"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EditorHeader
          form={form}
          saveState={saveState}
          historyIndex={historyIndex}
          formsArray={formsArray}
          headerRef={headerRef}
          redoFunction={redoFunction}
          undoFunction={undoFunction}
        />
        <div className="flex flex-col-reverse sm:flex-row h-full">
          <EditorSidebar
            headerRef={headerRef}
            form={form}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            sidebarRef={sidebarRef}
          />
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
                  <QuestionTabs
                    question={question}
                    headerRef={headerRef}
                    sidebarRef={sidebarRef}
                    form={form}
                    index={i}
                  />
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </form>
    </Form>
  );
}