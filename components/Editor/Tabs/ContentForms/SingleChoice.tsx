import { useEditorContext } from "@/components/Editor/EditorContext";
import ImageEditor from "@/components/Editor/QuestionImageManager/ImageEditor";
import QuestionImageManagerTabs from "@/components/Editor/QuestionImageManager/QuestionImageManagerTabs";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import Image from "next/image";
import React, { useEffect } from "react";
import QuestionImage from "../../QuestionImageManager/QuestionImage";
import CustomInput from "../../CustomInput";
import Question from "../../FormElements/Question";
import Option from "../../FormElements/Option";
import { Button } from "@/components/ui/button";

export default function SingleChoice({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { getValues, setValue },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  useEffect(() => {
    if (question.type === "SINGLE_CHOICE") {
      if (question.options.length === 0) {
        setValue(`questions.${questionIndex}`, {
          ...question,
          options: ["", ""],
        });
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "SINGLE_CHOICE") return;

  const { imageUrl, type } = question;

  const addOption = () => {
    setValue(`questions.${questionIndex}`, {
      ...question,
      options: [...question.options, ''],
    });
  };

  const deleteOption = (index: number) => {
    setValue(`questions.${questionIndex}`, {
      ...question,
      options:question.options.filter((_,i) => i !== index),
    });
  } 

  return (
    <div className="grid sm:grid-cols-2 gap-3 w-full max-w-4xl">
      <div className="flex flex-col gap-3 w-full items-center">
        {imageUrl ? (
          <QuestionImage imageUrl={imageUrl} />
        ) : (
          <QuestionImageManagerTabs />
        )}
        <Question questionIndex={questionIndex} />
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => {
          return (
            <Option key={i} questionIndex={questionIndex} optionIndex={i} deleteOption={deleteOption} />
          );
        })}
        <Button type="button" onClick={addOption}>Add Option</Button>
      </div>
    </div>
  );
}
