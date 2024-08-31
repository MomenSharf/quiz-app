import { useEditorContext } from "@/components/Editor/EditorContext";
import ImageEditor from "@/components/Editor/QuestionImageManager/ImageEditor";
import QuestionImageManagerTabs from "@/components/Editor/QuestionImageManager/QuestionImageManagerTabs";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import Image from "next/image";
import React from "react";
import QuestionImage from "../../QuestionImageManager/QuestionImage";
import CustomInput from "../../CustomInput";
import Question from "../../FormElements/Question";

export default function SingleChoice({questionIndex}: {questionIndex: number}) {
  const {
    form: { getValues },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  if (question.type !== "SINGLE_CHOICE") return;

  const { imageUrl, type } = question;

  return (
    <div className="flex flex-col gap-3 w-full max-w-3xl ">
      {/* {imageUrl ? (
        <QuestionImage imageUrl={imageUrl} />
      ) : (
        <QuestionImageManagerTabs />
      )} */}
      <Question questionIndex={questionIndex} />
      <div>gg</div>
    </div>
  );
}
