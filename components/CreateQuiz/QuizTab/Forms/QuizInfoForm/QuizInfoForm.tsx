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

import { cn } from "@/lib/utils";
import { QuizValidtion, QuizValidtionType } from "@/lib/validations/Quiz";
import { ArrowBigRightDash, RotateCcw, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/CreateQuiz/FileUploader";
import DifficultySelector from "./DifficultySelector";
import { CategoriesCombobox } from "./CategoriesCombobox";

interface QuizFormProps {
  quizInfo: QuizValidtionType | null;
  setQuizInfo: Dispatch<SetStateAction<QuizValidtionType>>;
  files: Record<number, File>;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  userId: string;
  setStep: Dispatch<SetStateAction<number>>;
}

function QuizInfoForm({
  quizInfo,
  setQuizInfo,
  setFiles,
  files,
  userId,
  setStep,
}: QuizFormProps) {
  const [image, setImage] = useState("");

  const form = useForm<QuizValidtionType>({
    resolver: zodResolver(QuizValidtion),
    defaultValues: {
      title: quizInfo ? quizInfo.title : "",
      description: quizInfo ? quizInfo.description : "",
      imageUrl: quizInfo ? quizInfo.imageUrl : "",
      categories: quizInfo ? quizInfo.categories : [],
      difficulty: quizInfo ? quizInfo.difficulty : "EASY",
    },
  });

  const onSubmit = (values: QuizValidtionType) => {
    setQuizInfo(values);
    setStep(1);
  };

  const reset = () => {
    setQuizInfo({
      title: "",
      imageUrl: undefined,
      categories: [],
      description: "",
      difficulty: "EASY",
      questions: [],
    });
    form.setValue("title", "");
    form.setValue("description", "");
    form.setValue("imageUrl", "");
    form.setValue("categories", []);
    form.setValue("difficulty", "EASY");
  };

  return (
    <Form {...form}>
      <form
        className="mt-1 flex flex-col  justify-start gap-3 transition-all"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            size="icon"
            onClick={reset}
            variant="outline"
            className="w-7 h-7 self-end"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7 self-end"
            onClick={() => {}}
          >
            <Save className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex gap-3">
          {/* <div className="felx-1"> */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col flex-1">
                <FormControl>
                  <Input
                    placeholder="Title..."
                    className={cn("transition-all", {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        form.getFieldState("title").error,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />
          {/* </div> */}
          {/* <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col w-20">
                <FormControl>
                  <Input
                    placeholder="Number of Questions..."
                    type="number"
                    className={cn("transition-all w-full", {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        form.getFieldState("numberOfQuestions").error,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1 flex w-full flex-col">
                <FormControl>
                  <Textarea
                    placeholder="Descrption..."
                    className={cn(
                      "h-full max-h-72 w-full resize-none transition-all",
                      {
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                          form.getFieldState("description").error,
                      }
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    files={files}
                    image={image}
                    setImage={setImage}
                    setFiles={setFiles}
                    index={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <DifficultySelector
                  difficulty={field.value}
                  onFieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <CategoriesCombobox
                  categories={field.value}
                  onFieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          disabled={form.formState.isSubmitting}
          className="self-end"
        >
          <ArrowBigRightDash className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
}

export default QuizInfoForm;
