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
import { ArrowBigRightDash, CheckCircle, RotateCcw, Save } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FileUploader } from "./FileUploader";
import { toast } from "sonner";
import DifficultySelector from "../DifficultySelector";
import { CategoriesCombobox } from "../CategoriesCombobox";

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
  setStep
}: QuizFormProps) {
  const [image, setImage] = useState("");

  const form = useForm<QuizValidtionType>({
    resolver: zodResolver(QuizValidtion),
    defaultValues: {
      title: quizInfo ? quizInfo.title : "",
      description: quizInfo ? quizInfo.description : "",
      imageUrl: quizInfo ? quizInfo.imageUrl : "",
      numberOfQuestions:  1,
      categories: quizInfo ? quizInfo.categories : [],
      difficulty: quizInfo ? quizInfo.difficulty : undefined,
    },
  });
  // console.log(10);

  useEffect(() => {
    console.log(10);
  }, [form]);

  const onSubmit = (values: QuizValidtionType) => {
    setQuizInfo(values);
    // toast(
    //   <>
    //     <span className="w-full">Chenges saved</span>{" "}
    //     <CheckCircle className="w-5 h-5 text-green-500" />
    //   </>
    // );
    setStep(1)
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 flex flex-col  justify-start gap-3 transition-all"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold my-3">Game Informations</h1>
      
        <div className="flex gap-3">
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
          {/* <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="EASY">
                      Easy
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="MEDIUM">
                      Medium
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="HARD">
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
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
