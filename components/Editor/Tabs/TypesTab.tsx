import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useEditorContext } from "../EditorContext";
import { Button } from "@/components/ui/button";
import { type QuestionType } from "@prisma/client";
type QuestionTypeProps = {
  type: QuestionType;
  questionIndex: number;
};

export default function TypesTab({ type, questionIndex }: QuestionTypeProps) {
  const {
    dispatch,
    form: { setValue },
  } = useEditorContext();

  return (
    <div className="p-3 grid grid-cols-[repeat(auto-fill,_minmax(7rem,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] gap-5">
      {QUESTION_TYPES_WITH_LABEL_AND_ICONS.map(({value, label, icon: Icon}) => {
        return (
          <Button
            key={label}
            variant="outline"
            type="button"
            className={cn("py-10", {
              "border-ring bg-accent": type === value,
            })}
            onClick={() => {
              if (value !== type)
                setValue(`questions.${questionIndex}.type`,  value);
                dispatch({type: 'SET_CURRENT_QUESTION_TAB', payload: 'content'})
            }}
          >
            <div className=" flex flex-col gap-1 items-center justify-center">
              <Icon
                key={label}
                className={cn(
                  "w-7 h-7 fill-muted-foreground text-muted-foreground",
                  {
                    "text-primary": type === value,
                    'w-10 h-10': value === 'TRUE_FALSE'
                  },

                )}
              />
              <span
                className={cn({
                  "text-foreground": type === value,
                  '-mt-2': value === 'TRUE_FALSE'
                })}
              >
                {label}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}