import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./EditorContext";
import { Textarea } from "../ui/textarea";

export default function CustomInput({
  optionsIndex,
}: {
  optionsIndex: number;
}) {
  const {
    form: { control, getFieldState },
    state: { currentQuestion },
  } = useEditorContext();
  return (
    <FormField
      control={control}
      name={`questions.${currentQuestion}.options.${optionsIndex}`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col">
          <FormLabel
            htmlFor="image"
            className="flex items-start text-muted-foreground mb-2"
          >
            Question
          </FormLabel>
          <FormControl>
            <Textarea
              className={cn(
                "resize-y min-h-24 max-h-48 h-24 font-semibold text-2xl",

                {
                  "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                    getFieldState(`questions.${0}`).error,
                }
              )}
              placeholder="Question..."
              maxLength={180}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs font-extralight mt-0" />
        </FormItem>
      )}
    />
  );
}
