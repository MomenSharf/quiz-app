import React, { useCallback } from "react";
import Header from "./Header";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { useEditorContext } from "../Context";
import { cn } from "@/lib/utils";
import QuestionInput from "./QuestionInput";

export default function Question({
  question,
  questionIndex,
}: {
  question: questionSchemaType;
  questionIndex: number;
}) {
  const {
    // form: { getValues, getFieldState },
  } = useEditorContext();

  const Form = useCallback(() => {
    switch (question.type) {
      case "PICK_ANSWER":
        return "PICK_ANSWER";

      case "TRUE_FALSE":
        return "TRUE_FALSE";
      case "SHORT_ANSWER":
        return "SHORT_ANSWER";
      case "MATCHING_PAIRS":
        return "MATCHING_PAIRS";
      case "ORDER":
        return "ORDER";
      case "FILL_IN_THE_BLANK":
        return "FILL_IN_THE_BLANK";
      default:
        "no type";
        break;
    }
  }, [question.type]);
  return (
    <div className="flex flex-col">
      <Header questionIndex={questionIndex} />
      {question.type !== "UNSELECTED" && (
        <div
          className={cn(
            "p-1.5 sm:p-3 grid sm:grid-cols-2 gap-3 w-full max-w-3xl",
            {
              "sm:grid-cols-3 max-w-4xl": question.image?.url,
            }
          )}
        >
          {question.image?.url && (
            <div className="flex flex-col gap-3 w-full items-center">
              image
              {/* <QuestionImage imageUrl={question.image?.url} /> */}
            </div>
          )}
          <div className="sm:col-span-2 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex w-full">
                    <QuestionInput questionIndex={questionIndex} />
                    {/* <QuestionImageManagerTabs
              trigger={
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="rounded-tl-none rounded-bl-none border-l-0 h-full"
                >
                  <Icons.picture  className="w-5 h-5" />
                </Button>
              }
            /> */}
                  </div>
                </div>
              </div>
              {/* <ErrorSpan error={error} /> */}
            </div>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
}
