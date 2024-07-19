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

import { QuizValidtion, QuizValidtionType } from "@/lib/validations/Quiz";
import { ArrowBigRightDash, Star } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { CategoriesCombobox } from "../CategoriesCombobox";
import { Input } from "../ui/input";
import { FileUploader } from "./FileUploader";

interface QuizFormProps {
  quizInfo: QuizValidtionType | null;
  setQuizInfo: Dispatch<SetStateAction<QuizValidtionType>>;
  files: Record<number, File>;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  setStep: Dispatch<SetStateAction<number>>;
  userId: string;
}

function QuizInfoForm({
  quizInfo,
  setQuizInfo,
  setStep,
  setFiles,
  files,
  userId,
}: QuizFormProps) {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<string>("");

  const form = useForm<QuizValidtionType>({
    resolver: zodResolver(QuizValidtion),
    defaultValues: {
      title: quizInfo ? quizInfo.title : "",
      description: quizInfo ? quizInfo.description : "",
      imageUrl: quizInfo ? quizInfo.imageUrl : "",
      numberOfQuestions: quizInfo ? quizInfo.numberOfQuestions : 5,
      category: quizInfo ? quizInfo.category : "",
    },
  });

  function onSubmit(values: QuizValidtionType) {
    setQuizInfo(values);
    setStep(1);
  }

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col  justify-start gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 flex-1">
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3 flex-1">
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CategoriesCombobox
                    onFieldChange={field.onChange}
                    category={quizInfo ? quizInfo.category : undefined}
                    setCategory={setCategory}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Textarea
                    className="resize-none h-full"
                    placeholder="Descrption..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="image" className="flex items-start">
                    Image optional{" "}
                    <Star className=" text-red-500 w-2 h-2 ml-1" />
                  </FormLabel>
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
        <Button
          type="submit"
          size="icon"
          variant='outline'
          disabled={form.formState.isSubmitting}
          className="button col-span-2 self-end"
        >
          <ArrowBigRightDash className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
}

export default QuizInfoForm;
