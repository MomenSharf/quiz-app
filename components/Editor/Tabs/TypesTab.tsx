import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import React, { useState } from "react";
import { QuestionType } from "@/types";
import { cn } from "@/lib/utils";
import { useEditorContext } from "../EditorContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type QuestionTypeProps = {
  type: QuestionType;
  questionIndex: number;
};

export default function TypesTab({ type, questionIndex }: QuestionTypeProps) {
  const {
    dispatch,
    form: { setValue },
  } = useEditorContext();

  const router = useRouter();

  return (
    <div className="p-3 grid grid-cols-[repeat(auto-fill,_minmax(7rem,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] gap-5">
      {QUESTION_TYPES_WITH_LABEL_AND_ICONS.map((item) => {
        return (
          <Button
            key={item.label}
            variant="outline"
            type="button"
            className={cn("py-10", {
              "border-ring bg-accent": type === item.value,
            })}
            onClick={() => {
              if (item.value !== type)
                setValue(`questions.${questionIndex}.type`, item.value);
                dispatch({type: 'SET_CURRENT_QUESTION_TAB', payload: 'content'})
            }}
          >
            <div className=" flex flex-col gap-1 items-center justify-center">
              <item.icon
                key={item.label}
                className={cn(
                  "w-7 h-7 fill-muted-foreground text-muted-foreground",
                  {
                    "text-primary": type === item.value,
                  }
                )}
              />
              <span
                className={cn({
                  "text-foreground": type === item.value,
                })}
              >
                {item.label}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
