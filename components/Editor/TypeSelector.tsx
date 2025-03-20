import React from "react";
import { Button } from "../ui/button";
import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import { useEditorContext } from "./Context";
import { cn } from "@/lib/utils";
import ErrorSpan from "./Question/QuestionForms/QuestionFormsElements/ErrorSpan";

export default function TypeSelector({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: {
      setValue,
      formState: { errors, isSubmitted },
      trigger,
      getValues,
    },
  } = useEditorContext();
  console.log(errors);

  const questions = getValues("questions");

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(7rem,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] gap-5">
        {QUESTION_TYPES_WITH_LABEL_AND_ICONS.map(
          ({ value, label, icon: Icon }) => {
            return (
              <Button
                key={label}
                variant="outline"
                type="button"
                className="py-10"
                onClick={async () => {
                  setValue(`questions.${questionIndex}.type`, value);
                  if (errors.categories) {
                    await trigger();
                  }
                }}
              >
                <div className=" flex flex-col gap-1 items-center justify-center">
                  <Icon
                    key={label}
                    className={cn(
                      "w-7 h-7 fill-muted-foreground text-muted-foreground",
                      {
                        "w-10 h-10": value === "TRUE_FALSE",
                      }
                    )}
                  />
                  <span
                    className={cn({
                      "-mt-2": value === "TRUE_FALSE",
                    })}
                  >
                    {label}
                  </span>
                </div>
              </Button>
            );
          }
        )}
      </div>
      <ErrorSpan
        error={
          isSubmitted && questions.length < 2 && questions[0].type === "UNSELECTED"
            ? {
                message: "Please select a question type",
              }
            : null
        }
      />
    </div>
  );
}
