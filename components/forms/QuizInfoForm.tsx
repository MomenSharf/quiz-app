"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { QuizValidtion, QuizValidtionType } from "@/lib/validations/Quiz";
import { ArrowBigRightDash, CheckCircle, RotateCcw, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
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

interface QuizFormProps {
  quizInfo: QuizValidtionType | null;
  setQuizInfo: Dispatch<SetStateAction<QuizValidtionType>>;
  files: Record<number, File>;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  setTab: Dispatch<SetStateAction<"INFO" | "QUESTIONS" | "STATUS">>;
  userId: string;
}

function QuizInfoForm({
  quizInfo,
  setQuizInfo,
  setTab,
  setFiles,
  files,
  userId,
}: QuizFormProps) {
  const [image, setImage] = useState("");

  const form = useForm<QuizValidtionType>({
    resolver: zodResolver(QuizValidtion),
    defaultValues: {
      title: quizInfo ? quizInfo.title : "",
      description: quizInfo ? quizInfo.description : "",
      imageUrl: quizInfo ? quizInfo.imageUrl : "",
      numberOfQuestions: quizInfo ? quizInfo.numberOfQuestions : 5,
      category: quizInfo ? quizInfo.category : "",
      difficulty: quizInfo ? quizInfo.difficulty : undefined,
    },
  });

  const onSubmit = (values: QuizValidtionType) => {
    setQuizInfo(values);
    toast(
      <>
        <span className="w-full">Chenges saved</span>{" "}
        <CheckCircle className="w-5 h-5 text-green-500" />
      </>
    );
  };

  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        className="mt-5 flex flex-col  justify-start gap-3 transition-all"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <Button
            type="button"
            size="icon"
            onClick={() => form.reset()}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            type="submit"
            size="icon"
            variant="outline"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 self-end"
          >
            <Save className="w-5 h-5" />
          </Button>
        </div>
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
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)]":
                        form.getFieldState("title").error,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-extralight mt-0" />
              </FormItem>
            )}
          />
          <FormField
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
                    <SelectItem className="cursor-pointer" value="Medium">
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
          />
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
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)]":
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

          <div className="flex justify-center">
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
        </div>
      </form>
    </Form>
  );
}

export default QuizInfoForm;
