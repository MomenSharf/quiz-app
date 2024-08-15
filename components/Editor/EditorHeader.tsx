"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  CheckCircle,
  CheckCircle2Icon,
  icons,
  Inbox,
  Save,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { $Enums, Quiz } from "@prisma/client";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { quizSchemaType } from "@/lib/validations/quizSchemas";
import { Icons } from "../icons";

type EditorHeader = {
  // quiz: Pick<Quiz, "title">;
  form: UseFormReturn<quizSchemaType>;
  saveState: "GOOD" | "BAD" | "WAITING";
};

export default function EditorHeader({  form, saveState }: EditorHeader) {
  const [isEditingTitle, setIsEditingTitle] = useState(true);

  const router = useRouter();

  // useEffect(() => {
  //   if (isEditingTitle) {
  //     form.setFocus("title");
  //   }
  // }, [form, isEditingTitle]);
  return (
    <div className="bg-card shadow-sm flex gap-1 items-center py-2">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <FormField
        control={form.control}
        name={`title`}
        render={({ field }) => (
          <FormItem>
            <Input
              className={cn(
                "",
                {
                  "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                    form.getFieldState("title").error,
                },
                {
                  hidden: !isEditingTitle,
                }
              )}
              {...field}
              onBlur={() => {
                // setIsEditingTitle(false);
              }}
            />
          </FormItem>
        )}
      />
      <div className="flex justify-center items-center mx-1">
        {saveState === "WAITING" ? (
          <Icons.Loader className="w-6 h-6 stroke-muted-foreground animate-spin" />
        ) : saveState === "BAD" ? (
          <Icons.alert className="w-6 h-6 fill-[#FFC107] stroke-background" />
        ) : (
          <Icons.check className="w-6 h-6 fill-[#28A745]" />
        )}
      </div>
    </div>
  );
}
