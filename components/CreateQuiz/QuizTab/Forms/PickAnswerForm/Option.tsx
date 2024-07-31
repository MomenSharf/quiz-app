"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

type OptionProps = {
  questionIndex: number;
  optionIndex: number;
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
};

export default function Option({
  form,
  questionIndex,
  optionIndex,
}: OptionProps) {
  return (
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.options.${optionIndex}.text`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col">
          <FormControl>
            <Textarea
              className={cn(
                "resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2",
                {
                  "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                    form.getFieldState(
                      `questions.${questionIndex}.options.${optionIndex}.text`
                    ).error,
                }
              )}
              placeholder={`Option ${optionIndex + 1}`}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs font-extralight mt-0" />
        </FormItem>
      )}
    />
  );
}

