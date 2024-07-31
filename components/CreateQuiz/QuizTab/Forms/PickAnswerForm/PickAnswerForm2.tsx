"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

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
  QuizValidtionType,
  type QuestionValidtionType,
} from "@/lib/validations/Quiz";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Pickaxe,
  RotateCcw,
  Save,
  Star,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import Option from "./Option";
import { FileUploader } from "@/components/CreateQuiz/FileUploader";
import Option2 from "./Option2";

interface PickAnswerFormProps {
  questionIndex: number;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  files: Record<number, File>;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      questions: {
        text: string;
        options: {
          text: string;
          isCorrect: boolean;
        }[];
        ImageUrl?: string | undefined;
      }[];
      categories: string[];
      difficulty: "EASY" | "MEDIUM" | "HARD";
      imageUrl?: string | undefined;
    },
    any,
    undefined
  >;
}

export default function PickAnswerForm2({
  questionIndex,
  setFiles,
  files,
  form,
}: PickAnswerFormProps) {
  const [image, setImage] = useState("");

  return (
    <div className="flex flex-col  justify-start gap-5">
      {questionIndex + 1}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 ">
          <FormField
            control={form.control}
            name={`questions.${questionIndex}.ImageUrl`}
            render={({ field }) => (
              <FormItem className="w-full">
                {!image && (
                  <FormLabel
                    htmlFor="image"
                    className="flex items-start text-muted-foreground"
                  >
                    Image optional{" "}
                    <Star className=" text-red-500 w-2 h-2 ml-1" />
                  </FormLabel>
                )}
                <FormControl className="">
                  <FileUploader
                    setFiles={setFiles}
                    files={files}
                    image={image}
                    setImage={setImage}
                    index={questionIndex + 1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`questions.${questionIndex}.text`}
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col">
                <FormLabel
                  htmlFor="image"
                  className="flex items-start text-muted-foreground mb-2"
                >
                  Question
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn(
                      "resize-y min-h-24 max-h-48 h-24 font-semibold text-2xl",

                      {
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                          form.getFieldState(`questions.${questionIndex}.text`)
                            .error,
                      }
                    )}
                    placeholder="Question..."
                    maxLength={180}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name={`questions.${questionIndex}.options`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="image"
                  className="flex items-start text-muted-foreground"
                >
                  Options
                </FormLabel>
                <FormControl>
                  <>
                    {Array.from(
                      { length: field.value.length },
                      (_, i) => i
                    ).map((_, i) => {
                      return (
                        <Option
                          key={i}
                          form={form}
                          questionIndex={questionIndex}
                          optionIndex={i}
                        />
                      );
                    })}
                    <Button
                      className="w-full"
                      size="lg"
                      type="button"
                      onClick={() => {
                        if (field.value.length === 8) {
                          toast("Maximam 8 options");
                        } else {
                          field.onChange([
                            ...field.value,
                            { text: "", isCorrect: false },
                          ]);
                        }
                      }}
                    >
                      Add Option
                    </Button>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-between">
        {/* <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={form.formState.isSubmitting}
            className="button col-span-2"
            onClick={() => setStep((prev) => prev - 1)}
          >
            <ArrowBigLeftDash className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            onClick={() => form.reset()}
            variant="outline"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={form.formState.isSubmitting}
            className="button col-span-2"
          >
            {numberOfQuestions === index + 1 ? (
              <Pickaxe className="w-5 h-5" />
            ) : (
              <ArrowBigRightDash className="w-5 h-5" />
            )}
          </Button> */}
      </div>
    </div>
  );
}
