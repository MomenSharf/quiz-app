"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Dispatch, SetStateAction, useState } from "react";

import { cn } from "@/lib/utils";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Pickaxe,
  RotateCcw,
  Star,
} from "lucide-react";
import { FileUploader } from "../FileUploader";

interface PickAnswerFormProps {
  question: QuestionValidtionType;
  setQuestion: (value: QuestionValidtionType, index: number) => void;
  index: number;
  setStep: Dispatch<SetStateAction<number>>;
  numberOfQuestions: number;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  files: Record<number, File>;
}

function PickAnswerForm({
  question,
  setQuestion,
  index,
  setStep,
  numberOfQuestions,
  setFiles,
  files,
}: PickAnswerFormProps) {
  const [image, setImage] = useState("");

  const [isEditingQuestion, setIsEditingQuestion] = useState(
    question ? false : true
  );
  const [isEditingOptionOne, setIsEditingOptionOne] = useState(
    question ? false : true
  );
  const [isEditingOptionTow, setIsEditingOptionTow] = useState(
    question ? false : true
  );
  const [isEditingOptionThree, setIsEditingOptionThree] = useState(
    question ? false : true
  );
  const [isEditingOptionFour, setIsEditingOptionFour] = useState(
    question ? false : true
  );

  const form = useForm<QuestionValidtionType>({
    resolver: zodResolver(QuestionValidtion),
    defaultValues: {
      text: question ? question.text : "",
      ImageUrl: question ? question.ImageUrl : undefined,
      correctOption: question ? question.correctOption : "",
      optionTow: question ? question.optionTow : "",
      optionThree: question ? question.optionThree : "",
      optionFour: question ? question.optionFour : "",
    },
  });

  function onSubmit(values: QuestionValidtionType) {
    setQuestion(values, index);
  }

  return (
    <Form {...form}>
      <form
        className="mt-2 flex flex-col  justify-start gap-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 ">
            <FormField
              control={form.control}
              name="ImageUrl"
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
                      index={index + 1}
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
                <FormItem className="flex w-full flex-col gap-3">
                  <FormControl>
                    <div>
                      <Textarea
                        className={cn(
                          "resize-y min-h-24 max-h-48 h-24 font-semibold text-2xl",
                          {
                            hidden: !isEditingQuestion,
                          }
                        )}
                        placeholder="Question..."
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value}
                        onBlur={(e) => {
                          field.onBlur();
                          if (field.value.length > 0) {
                            setIsEditingQuestion(false);
                          }
                        }}
                        ref={field.ref}
                        name={field.name}
                        disabled={field.disabled}
                      />
                      <p
                        className={cn(
                          "text-2xl font-semibold min-h-24 select-none cursor-pointer",
                          {
                            hidden: isEditingQuestion,
                          }
                        )}
                        autoFocus
                        onClick={(e) => {
                          setIsEditingQuestion(true);
                        }}
                      >
                        {field.value}
                      </p>
                      {/* )} */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col justify-start gap-5">
            <FormLabel
              htmlFor="image"
              className="flex items-start text-muted-foreground -mb-3"
            >
              Options{" "}
            </FormLabel>
            <FormField
              control={form.control}
              name="correctOption"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <div
                        className={cn("flex gap-3 items-center", {
                          hidden: !isEditingOptionOne,
                        })}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          A.
                        </span>
                        <Textarea
                          className="resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2 border-green-500"
                          placeholder="Correct Option..."
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur();
                            if (field.value.length > 0) {
                              setIsEditingOptionOne(false);
                            }
                          }}
                          ref={field.ref}
                          name={field.name}
                          disabled={field.disabled}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "flex gap-3 w-full text-xl font-semibold justify-start border-2 border-green-500 py-7",
                          {
                            hidden: isEditingOptionOne,
                          }
                        )}
                        onClick={() => {
                          setIsEditingOptionOne(true);
                        }}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          A.
                        </span>
                        {field.value}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="optionTow"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <div
                        className={cn("flex gap-3 items-center", {
                          hidden: !isEditingOptionTow,
                        })}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          B.
                        </span>
                        <Textarea
                          className="resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2 border-red-500"
                          placeholder="Option tow..."
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur();
                            if (field.value.length > 0) {
                              setIsEditingOptionTow(false);
                            }
                          }}
                          ref={field.ref}
                          name={field.name}
                          disabled={field.disabled}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "flex gap-3 w-full text-xl font-semibold justify-start border-2 border-red-500 py-7",
                          {
                            hidden: isEditingOptionTow,
                          }
                        )}
                        onClick={() => {
                          setIsEditingOptionTow(true);
                        }}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          B.
                        </span>
                        {field.value}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="optionThree"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <div
                        className={cn("flex gap-3 items-center", {
                          hidden: !isEditingOptionThree,
                        })}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          C.
                        </span>
                        <Textarea
                          className="resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2 border-red-500"
                          placeholder="Option three..."
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur();
                            if (field.value.length > 0) {
                              setIsEditingOptionThree(false);
                            }
                          }}
                          ref={field.ref}
                          name={field.name}
                          disabled={field.disabled}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "flex gap-3 w-full text-xl font-semibold justify-start border-2 border-red-500 py-7",
                          {
                            hidden: isEditingOptionThree,
                          }
                        )}
                        onClick={() => {
                          setIsEditingOptionThree(true);
                        }}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          C.
                        </span>
                        {field.value}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="optionFour"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <div
                        className={cn("flex gap-3 items-center", {
                          hidden: !isEditingOptionFour,
                        })}
                      >
                        <span className="font-bold text-xl text-muted-foreground">
                          D.
                        </span>
                        <Textarea
                          className="resize-y text-xl min-h-14 max-h-28 h-4 font-semibold border-2 border-red-500 "
                          placeholder="Option four..."
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur();
                            if (field.value.length > 0) {
                              setIsEditingOptionFour(false);
                            }
                          }}
                          ref={field.ref}
                          name={field.name}
                          disabled={field.disabled}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "flex gap-3 w-full text-xl font-semibold justify-start border-2 border-red-500 py-7 text-wrap",
                          {
                            hidden: isEditingOptionFour,
                          }
                        )}
                        onClick={() => {
                          setIsEditingOptionFour(true);
                        }}
                      >
                        <span className="font-bold text-xl text-muted-foreground text-wrap">
                          D.
                        </span>
                        {field.value}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={form.formState.isSubmitting}
            className="button col-span-2"
            onClick={() => setStep((prev) => prev - 1)}
          >
            <ArrowBigLeftDash className="w-5 h-5" />
          </Button>
          <Button size="icon" onClick={() => form.reset()} variant="outline">
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
            </Button>
        </div>
      </form>
    </Form>
  );
}

export default PickAnswerForm;
