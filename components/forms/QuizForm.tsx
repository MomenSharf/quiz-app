"use client";
import {
  QuestionValidtionType,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { useState } from "react";
import QuizInfoForm from "./QuizInfoForm";
import { cn } from "@/lib/utils";
import PickAnswerForm from "./pickAnswerForm/PickAnswerForm";
import { useLocalStorage } from "@uidotdev/usehooks";

type Props = {
  type: "CREATE" | "UPDATE";
};

function CreateQuizForm({ type }: Props) {
  const [step, setStep] = useLocalStorage("form-step", 0);

  const [quizInfo, setQuizInfo] = useLocalStorage<QuizValidtionType | null>(
    "quiz-info",
    null
  );

  const [questions, setQuetions] = useLocalStorage<QuestionValidtionType[]>(
    "form-questions",
    []
  );

  // const { startUpload } = useUploadThing("imageUploader");

  // async function onSubmit(values: z.infer<typeof QuizValidtion>) {
  //   let uploadedImageUrl = values.imageUrl;

  //   if (files.length > 0) {
  //     const uploadedImages = await startUpload(files);

  //     if (!uploadedImages) {
  //       return toast({
  //         description: "Uploading images failed, try again",
  //         variant: "destructive",
  //       });
  //     }

  //     uploadedImageUrl = uploadedImages[0].url;
  //   }
  // }

  if (step === 0 || !quizInfo) {
    return <QuizInfoForm setQuizInfo={setQuizInfo} setStep={setStep} />;
  }

  const length = quizInfo?.numberOfQuestions + 1;

  return (
    <div>
      {Array.from({ length }, (_, i) => i).map((_, i) => {
        console.log(i);

        return (
          <div key={i} className={cn({ hidden: step !== i })}>
            <PickAnswerForm
              questions={questions}
              setQuestions={setQuetions}
              step={step}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CreateQuizForm;
