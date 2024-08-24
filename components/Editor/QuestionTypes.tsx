import { QuestionTypesWithLabelAndIcons } from "@/constants";
import React from "react";
import { Button } from "../ui/button";
import { QuestionType } from "@/types";
import { cn } from "@/lib/utils";
type QuestionTypeProps = {
  type: QuestionType;
  setQuestionType: (type: QuestionType) => void;
};

export default function QuestionTypes({
  type,
  setQuestionType,
}: QuestionTypeProps) {
  return (
    <div className="p-3 grid grid-cols-[repeat(auto-fill,_minmax(7rem,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] gap-5">
      {QuestionTypesWithLabelAndIcons.map((item) => {
        return (
          <Button
            key={item.label}
            variant="outline"
            className={cn("py-10", {
              "border-ring bg-accent": type === item.value,
            })}
            onClick={() => setQuestionType(item.value)}
          >
            <div className=" flex flex-col gap-1 items-center justify-center">
              <item.icon
                key={item.label}
                className={cn("w-7 h-7 fill-muted-foreground text-muted-foreground", {
                  "text-primary": type === item.value,

                })}
              />
              <span className={cn( {
                  "text-foreground": type === item.value,

                })}>{item.label}</span>
            </div>
          </Button>
        );
      })}
      
    </div>
  );
}
