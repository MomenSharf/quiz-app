"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import {
  QuestionValidtion,
  type QuestionValidtionType,
} from "@/lib/validations/Quiz";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { Star } from "lucide-react";
import { FileUploader } from "../FileUploader";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import Answers from "./Answers";

interface QuizFormProps {
  questions: QuestionValidtionType[];
  setQuestions: Dispatch<SetStateAction<QuestionValidtionType[]>>;
  step: number;
}

function QuizInfoForm({ questions, setQuestions, step }: QuizFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [question, setQuestion] = useState("");
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const FieldRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(FieldRef, () => {
      setIsEditing(false);
  });

  const form = useForm<QuestionValidtionType>({
    resolver: zodResolver(QuestionValidtion),
    defaultValues: {
      text: "",
      ImageUrl: "",
    },
  });

  function onSubmit(values: QuestionValidtionType) {}

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col  justify-start gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 ">
            <FormField
              control={form.control}
              name="ImageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  {files.length == 0 && (
                    <FormLabel htmlFor="image" className="flex items-start">
                      Image optional{" "}
                      <Star className=" text-red-500 w-2 h-2 ml-1" />
                    </FormLabel>
                  )}
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3" ref={FieldRef}>
                  <FormControl>
                    {isEditing ? (
                      <Textarea
                      className="resize-none h-full font-semibold text-2xl min-h-24"
                      placeholder="Question..."
                        {...field}
                      />
                    ) : (
                      <p
                        className={cn("text-2xl font-semibold min-h-24 select-none", {
                          'text-red-500 text-md': field.value.length === 0
                        })}
                        autoFocus
                        onDoubleClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        {field.value ? field.value : "Must me more than one character"}
                      </p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Answers />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 self-end"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}

export default QuizInfoForm;
