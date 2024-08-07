"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "./EditorHeader";
import { Quiz } from "@prisma/client";
import { EditorQuiz } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { quizSchema, quizSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { debounce } from "@/lib/utils";
import { toast } from "../ui/use-toast";

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
      questions: quiz.questions,
    },
  });

  const debouncedSave = useRef(debounce(async (data: quizSchemaType) => {
    // await saveQuizData(data); // Call your API to save data
  }, 1000)).current;


  const onSubmit = async () => {
    toast({
      description:'goooood'
    })
  };

  return (
    <Form {...form}>
      <form
        className="w-full h-full min-h-screen grid grid-cols-1 grid-rows-[auto_auto_1fr] sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr] root-background-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="sm:col-span-2">
          <EditorHeader
            quiz={{ title: quiz.title }}
            form={form}

          />
        </div>
        <div className="bg-blue-500 ">2</div>
        <div className="bg-orange-500">3</div>
      </form>
    </Form>
  );
}
