"use client";
import { cn } from "@/lib/utils";
import {
  QuestionValidtionType,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
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
      title: "",
      numberOfQuestions: 5,
      imageUrl: undefined,
      category: "",
      description: "",
      difficulty: "EASY",
      questions: [],
    }
  );

  const [questions, setQuestions] = useLocalStorage<QuestionValidtionType[]>(
    "questions",
    []
  );

  const [files, setFiles] = useState<Record<number, File>>({});
  console.log(files);

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

  useEffect(() => {
    if (questions.length > quizInfo.numberOfQuestions) {
      setQuestions((prev) => prev.slice(0, quizInfo.numberOfQuestions));
    }
  }, [quizInfo, questions, setQuestions]);

  useEffect(() => {
    const newFiles = files;
    Object.entries(files).forEach(([index, _]) => {
      if (parseInt(index) > quizInfo.numberOfQuestions)
        delete newFiles[parseInt(index)];
    });

    setFiles(newFiles);
  }, [questions, files, quizInfo]);

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
          setQuestions={setQuestions}
          setQuizInfo={setQuizInfo}
        />
      </div>
    </div>
  );
}

export default CreateQuizForm;
