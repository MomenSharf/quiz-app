"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  QuestionValidtionType,
  QuizValidtion,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PickAnswerForm2 from "./Forms/PickAnswerForm/PickAnswerForm2";
import QuizInfoForm2 from "./Forms/QuizInfoForm/QuizInfoForm2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  NumberWords,
  QuestionsDefaultValues,
  QuizDefaultValues,
} from "@/constants";
import { cn } from "@/lib/utils";
import { RotateCcw, Trash } from "lucide-react";

type Props = {
  type: "CREATE" | "UPDATE";
  userId: string;
};

export default function QuizForm2({ type, userId }: Props) {
  const [quiz, setQuiz] = useLocalStorage<QuizValidtionType>(
    "quiz-info",
    QuizDefaultValues
  );

  const [files, setFiles] = useState<Record<number, File>>({});

  const form = useForm<QuizValidtionType>({
    resolver: zodResolver(QuizValidtion),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
      imageUrl: quiz.imageUrl,
      categories: quiz.categories,
      difficulty: quiz.difficulty,
      questions: quiz.questions,
    },
  });

  console.log(form.formState.errors);

  const onSubmit = (values: QuizValidtionType) => {
    console.log(values);

    setQuiz(values);
  };

  return (
    <Form {...form}>
      <form
        className="mt-1 flex flex-col  justify-start gap-3 transition-all"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="quiz-info">
            <AccordionTrigger
              className={cn("px-2 rounded-tl-md rounded-tr-md", {
                "border-destructive bg-[hsl(var(--destructive)_/_20%)] focus-visible:ring-destructive":
                  form.getFieldState(`title`).error ||
                  form.getFieldState(`description`).error,
              })}
            >
              Quiz Informations
            </AccordionTrigger>

            <AccordionContent className="px-3">
              <QuizInfoForm2
                files={files}
                setFiles={setFiles}
                userId={userId}
                form={form}
              />
            </AccordionContent>
          </AccordionItem>
          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col">
                <FormControl>
                  <>
                    {Array.from(
                      { length: field.value.length },
                      (_, i) => i
                    ).map((_, i) => {
                      return (
                        <AccordionItem value={`question=${i + 1}`} key={i}>
                          <div className="flex gap-3 items-center">
                            <div className="w-full">
                              <AccordionTrigger
                                className={cn(
                                  "px-2 rounded-tl-md rounded-tr-mdl",
                                  {
                                    "border-destructive bg-[hsl(var(--destructive)_/_20%)] focus-visible:ring-destructive":
                                      form.getFieldState(`questions.${i}`)
                                        .error,
                                  }
                                )}
                              >
                                Question {NumberWords[i + 1]}
                              </AccordionTrigger>
                            </div>
                            <div className="flex gap-3 justify-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="w-7 h-7"
                                disabled={field.value.length <= 1}
                                onClick={() => {
                                  // setQuiz((prev) => {
                                  //   return {
                                  //     ...prev,
                                  //     questions: prev.questions.filter(
                                  //       (_, index) => i !== index
                                  //     ),
                                  //   };
                                  // });
                                  field.onChange(
                                    field.value.filter(
                                      (_, index) => i !== index
                                    )
                                  );
                                }}
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
                            </div>
                          </div>
                          <AccordionContent className="px-3">
                            <PickAnswerForm2
                              questionIndex={i}
                              files={files}
                              setFiles={setFiles}
                              form={form}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                    <Button
                      size="lg"
                      type="button"
                      onClick={() => {
                        const newQuestions = field.value
                        newQuestions.push(QuestionsDefaultValues)
                        // setQuiz((prev) => {
                        //   return {
                        //     ...prev,
                        //     questions: newQuestions
                        //   };
                        // });
                        field.onChange(newQuestions);
                      }}
                    >
                      Add Question
                    </Button>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button size="lg" type="submit" className="mt-3 self-end">
              Save
            </Button>
          </div>
        </Accordion>
      </form>
    </Form>
  );
}
