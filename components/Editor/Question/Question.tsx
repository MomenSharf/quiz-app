import React, { useCallback, useState } from "react";
import Header from "./Header";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { useEditorContext } from "../Context";
import { cn } from "@/lib/utils";
import QuestionInput from "./QuestionInput";
import PickAnswer from "./QuestionForms/PickAnswer";
import TrueFalse from "./QuestionForms/TrueFalse";
import ShortAnswer from "./QuestionForms/ShortAnswer";
import CorrectOrder from "./QuestionForms/CorrectOrder";
import FillInTheBlanks from "./QuestionForms/FillInTheBlanks";
import MatchingPairs from "./QuestionForms/MatchingPairs";
import TypeSelector from "../TypeSelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import QuestionImage from "./QuestionImage";

export default function Question({
  question,
  questionIndex,
}: {
  question: questionSchemaType;
  questionIndex: number;
}) {
  const [isImageManagerTabs, setIsImageManagerTabs] = useState(false);

  const Form = useCallback(() => {
    switch (question.type) {
      case "PICK_ANSWER":
        return <PickAnswer questionIndex={questionIndex} />;

      case "TRUE_FALSE":
        return <TrueFalse questionIndex={questionIndex} />;
      case "SHORT_ANSWER":
        return <ShortAnswer questionIndex={questionIndex} />;
      case "MATCHING_PAIRS":
        return <MatchingPairs questionIndex={questionIndex} />;
      case "ORDER":
        return <CorrectOrder questionIndex={questionIndex} />;
      case "FILL_IN_THE_BLANK":
        return <FillInTheBlanks questionIndex={questionIndex} />;
      default:
        <TypeSelector questionIndex={questionIndex} />;
        break;
    }
  }, [question.type, questionIndex]);
  return (
    <div className="flex flex-col">
      <Header questionIndex={questionIndex} />
      {question.type !== "UNSELECTED" && (
        <div className="flex justify-center">
          <div
            className={cn(
              "p-1.5 sm:p-3 grid sm:grid-cols-2 gap-3 w-full max-w-3xl",
              {
                "sm:grid-cols-5 max-w-4xl": question.imageUrl,
              }
            )}
          >
            {question.imageUrl && (
              <div className="sm:col-span-2">

              <QuestionImage
                imageUrl={question.imageUrl}
                field={`questions.${questionIndex}.imageUrl`}
                openImageManagerTabs={() => {
                  setIsImageManagerTabs(true);
                }}
                />
                </div>
            )}
            <div className="sm:col-span-3 flex flex-col gap-3">
              <QuestionInput
                questionIndex={questionIndex}
                isImageManagerTabs={isImageManagerTabs}
                setIsImageManagerTabs={setIsImageManagerTabs}
              />
              <Form />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
