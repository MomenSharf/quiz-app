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

import { cn } from "@/lib/utils";
import { ArrowBigRightDash, RotateCcw, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/CreateQuiz/FileUploader";
import DifficultySelector from "./DifficultySelector";
import { CategoriesCombobox } from "./CategoriesCombobox";

interface QuizFormProps {
  files: Record<number, File>;
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;
  userId: string;
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

export default function QuizInfoForm2({
  setFiles,
  files,
  userId,
  form,
}: QuizFormProps) {
  const [image, setImage] = useState("");

  const reset = () => {
    form.setValue("title", "");
    form.setValue("description", "");
    form.setValue("imageUrl", "");
    form.setValue("categories", []);
    form.setValue("difficulty", "EASY");
  };

  return (
    <div className="mt-1 flex flex-col  justify-start gap-3 transition-all">
      <Button
        type="button"
        size="icon"
        onClick={reset}
        variant="outline"
        className="w-7 h-7 self-end"
      >
        <RotateCcw className="w-3 h-3" />
      </Button>

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

    </div>
  );
}
