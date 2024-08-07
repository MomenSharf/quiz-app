"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, icons, Inbox, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { $Enums, Quiz } from "@prisma/client";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { quizSchemaType } from "@/lib/validations/quizSchemas";

type EditorHeader = {
  quiz: Pick<Quiz, "title">;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      categories: string[];
      difficulty: "EASY" | "MEDIUM" | "HARD";
      visibility: "PUBLIC" | "PRIVATE";
      questions: {
        options: string[];
        type: $Enums.QuestionType;
        question: string;
        correctAnswer: string;
      }[];
      imageUrl?: string | undefined;
    },
    any,
    undefined
  >;
};

export default function EditorHeader({ quiz, form }: EditorHeader) {
  const [isEditingTitle, setIsEditingTitle] = useState(true);

  const { title } = quiz;
  const router = useRouter();

  useEffect(() => {
    form.setFocus('title')
  }, [form, isEditingTitle])
  return (
    <div className="bg-card shadow-sm flex gap-1 items-center py-2">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div>
          <FormField
            control={form.control}
            name={`title`}
            render={({ field }) => (
              <FormItem >
                <Input
                  className={cn("", {
                    "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                      form.getFieldState("title").error,
                  }, {
                    'hidden': !isEditingTitle
                  })}
                  
                  {...field}
                  onBlur={() => {
                    // setIsEditingTitle(false);
                  }}
                />
              </FormItem>
            )}
          />
          <Button
            variant="white"
            className={cn("font-semibold border hover:border-primary",  {
              'hidden': isEditingTitle
            })}
            onClick={() => {
              // setIsEditingTitle(true);
            }}
          >
            {title}
          </Button>

      </div>
          <button>g</button>
    </div>
  );
}
