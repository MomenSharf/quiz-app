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

  const questionRef = useRef<HTMLDivElement>(null);

  const form = useForm<QuestionValidtionType>({
    resolver: zodResolver(QuestionValidtion),
    defaultValues: {
      text: question ? question.text : "",
      ImageUrl: question ? question.ImageUrl : undefined,
      options: question ? question.options : [],
    },
  });

  function onSubmit(values: QuestionValidtionType) {
    setQuestion(values, index);
  }

  useEffect(() => {
    questionRef.current?.querySelector("textarea")?.focus();
  }, [isEditingQuestion]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        className="mt-2 flex flex-col  justify-start gap-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 justify-end">
          <Button
                      type="button"

            variant="outline"
            size="icon"
            className="w-7 h-7"
            onClick={() => {}}
          >
            <Trash className="w-3 h-3 text-red-500" />
          </Button>
          <Button
            type="button"
            size="icon"
            onClick={() => form.reset()}
            variant="outline"
            className="w-7 h-7"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7"
            onClick={() => {}}
          >
            <Save className="w-3 h-3" />
          </Button>
        </div>
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
                <FormItem className="space-y-1 flex w-full flex-col">
                  <FormLabel
                    htmlFor="image"
                    className="flex items-start text-muted-foreground mb-2"
                  >
                    Question
                  </FormLabel>
                  <FormControl>
                    <div ref={questionRef}>
                      <Textarea
                        className={cn(
                          "resize-y min-h-24 max-h-48 h-24 font-semibold text-2xl",
                          {
                            hidden: !isEditingQuestion,
                          },
                          {
                            "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                              form.getFieldState("text").error,
                          }
                        )}
                        placeholder="Question..."
                        onChange={(e) => {
                          if (e.target.value.length <= 120) {
                            if (e.target.value.split("\n").length <= 5) {
                              field.onChange(e.target.value);
                            } else {
                              toast("Maximum 5 lins");
                            }
                          } else {
                            toast("Maximum 150 characters");
                          }
                        }}
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
                        maxLength={180}
                      />
                      <Button
                        autoFocus
                        onClick={(e) => {
                          setIsEditingQuestion(true);
                        }}
                        variant="outline"
                        type="button"
                        className={cn(
                          "text-2xl font-semibold min-h-24 h-auto w-full justify-start items-start overflow-hidden text-start",
                          {
                            hidden: isEditingQuestion,
                          }
                        )}
                      >
                        <pre style={{ fontFamily: "inherit" }}>
                          {field.value}
                        </pre>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                  </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="options"
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
                            field={field}
                            key={i}
                            index={i}
                            errors={form.formState.errors.options}
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

          {/* <div className="flex flex-col justify-start gap-5">
            <FormLabel
              htmlFor="image"
              className="flex items-start text-muted-foreground -mb-3"
            >
              Options
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
          </div> */}
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
      </form>
    </Form>
  );
}

export default PickAnswerForm;
