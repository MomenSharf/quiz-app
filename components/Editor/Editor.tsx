"use client";

import { saveQuiz } from "@/lib/actions/quiz.actions";
import {
  questionSchemaType,
  quizSchema,
  quizSchemaType,
} from "@/lib/validations/quizSchemas";
import { EditorQuiz, updataQuiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { Form } from "../ui/form";
import EditorHeader from "./EditorHeader";

type EditorProps = {
  quiz: EditorQuiz;
};

export default function Editor({ quiz }: EditorProps) {
  const form = useForm<quizSchemaType>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
      imageUrl: quiz.imageUrl ?? undefined,
      visibility: quiz.visibility,
      categories: quiz.categories,
      difficulty: quiz.difficulty,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        content: question.content,
      })) as questionSchemaType[],
    },
  });

  const [saveState, setSaveState] = useState<"GOOD" | "BAD" | "WAITING">(
    "GOOD"
  );
  const isSaving = useRef(false);

  const watch = form.watch();

  const saveQuizFun = useCallback(async () => {
    const data = form.getValues();
    const quizData: updataQuiz = {
      categories: data.categories,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      imageUrl: data.imageUrl || null,
      visibility: data.visibility,
    };

    try {
      // if (saveState !== "WAITING") {
      //   setSaveState("WAITING");
      // }
      if (!isSaving.current) {
        isSaving.current = true;
        setSaveState("WAITING");
      }

      const prismaQuiz = await saveQuiz(quiz.id, quizData, data.questions);

      if (prismaQuiz) {
        setSaveState("GOOD");
      } else {
        setSaveState("BAD");
      }
    } catch (error: any) {
      toast("An Error Occurred");
      setSaveState("BAD");
    } finally {
      isSaving.current = false;
    }
  }, [form, quiz.id]);

  const debounceSaveData = useDebouncedCallback(() => {
    if (!isSaving.current) {
      saveQuizFun();
    }
  }, 1000);

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
        debounceSaveData();
      }
    });

    return () => {
      if (typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [form.watch, debounceSaveData, form]);

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        className="w-full h-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr] root-background-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="sm:col-span-2">
          <EditorHeader form={form} saveState={saveState} />
        </div>
        <div className="bg-blue-500 ">2</div>
        <div className="bg-orange-500">{saveState}</div>
      </form>
    </Form>
  );
}
