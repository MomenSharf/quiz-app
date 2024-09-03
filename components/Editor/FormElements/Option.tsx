import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useEditorContext } from "../EditorContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Option({
  questionIndex,
  optionIndex,
  deleteOption
}: {
  questionIndex: number;
  optionIndex: number;
  deleteOption: (index: number) => void
}) {
  const {
    form: { control, getFieldState, getValues },
  } = useEditorContext();


  return (
    <div className="flex gap-2">
      <FormField
        control={control}
        name={`questions.${questionIndex}.options.${optionIndex}`}
        render={({ field }) => (
          <FormItem className="space-y-1 flex w-full flex-col">
            <FormControl>
              <Textarea
                className={cn(
                  "resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2",

                  {
                    "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                      getFieldState(
                        `questions.${questionIndex}.options.${optionIndex}`
                      ).error,
                  }
                )}
                placeholder={`Option ${optionIndex + 1}...`}
                {...field}
                value={getValues(
                  `questions.${questionIndex}.options.${optionIndex}`
                )}
              />
            </FormControl>
            <FormMessage className="text-xs font-extralight mt-0" />
          </FormItem>
        )}
      />
      <Button onClick={() => deleteOption(optionIndex)}>delete</Button>
    </div>
  );
}
