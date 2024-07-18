"use client";
import { cn } from "@/lib/utils";
import {
  QuestionValidtionType,
  QuizValidtionType
} from "@/lib/validations/Quiz";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import PickAnswerForm from "./pickAnswerForm/PickAnswerForm";
import QuizInfoForm from "./QuizInfoForm";
import CreateStatus from "./pickAnswerForm/CreateStatus";

type Props = {
  type: "CREATE" | "UPDATE";
  userId: string;
};

function CreateQuizForm({ type, userId }: Props) {
  const [step, setStep] = useLocalStorage("form-step", 0);

  const [quizInfo, setQuizInfo] = useLocalStorage<QuizValidtionType>(
    "quiz-info",
    {
      title: '',
      numberOfQuestions: 5,
      imageUrl: undefined,
      category: '',
      description: '',
      difficulty: 'EASY',
      questions: []
    }
  );

  const [questions, setQuestions] = useLocalStorage<QuestionValidtionType[]>(
    "questions",
    []
  );

  const [files, setFiles] = useState<Record<number, File>>({});

  const setQuestion = (value: QuestionValidtionType, index: number) => {
    const newQ = questions;
    if (newQ.length >= index) {
      newQ[index] = value;
    } else {
      newQ.push(value);
    }
    setQuestions(newQ);

    setStep((prev) => prev + 1);
  };

  // if(quizInfo.title.length <= 0)  setStep(0);
  // if(questions.length < step)  setStep(questions.length);

  const length = quizInfo.numberOfQuestions;
  return (
    <div>
      <div className={cn({ hidden: step != 0 })}>
        <QuizInfoForm
          quizInfo={quizInfo}
          setQuizInfo={setQuizInfo}
          files={files}
          setFiles={setFiles}
          setStep={setStep}
          userId={userId}
        />
      </div>
      {Array.from({ length }, (_, i) => i).map((_, i) => {
        return (
          <div key={i} className={cn({ hidden: step !== i + 1 })}>
            <PickAnswerForm
              setQuestion={setQuestion}
              question={questions[i]}
              index={i}
              files={files}
              setFiles={setFiles}
              setStep={setStep}
              numberOfQuestions={length}
            />
          </div>
        );
      })}
      <div className={cn({ hidden: step <= quizInfo.numberOfQuestions })}>
        <CreateStatus 
        files={files}
        questions={questions}
        userId={userId}
        quizInfo={quizInfo}
        setStep={setStep}
        />
      </div>
    </div>
  );
}

export default CreateQuizForm;
