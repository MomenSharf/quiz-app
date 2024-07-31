"use client";
import { cn } from "@/lib/utils";
import {
  QuestionValidtionType,
  QuizValidtionType,
} from "@/lib/validations/Quiz";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import QuizFormProgress from "./QuizFormProgress";
import QuizInfoForm from "./Forms/QuizInfoForm/QuizInfoForm";
import PickAnswerForm from "./Forms/PickAnswerForm/PickAnswerForm";
import CreateStatus from "../CreateStatus";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Trash } from "lucide-react";

type Props = {
  type: "CREATE" | "UPDATE";
  userId: string;
};

export default function QuizForm({ type, userId }: Props) {
  const [step, setStep] = useLocalStorage("form-step", 0);

  const [quizInfo, setQuizInfo] = useLocalStorage<QuizValidtionType>(
    "quiz-info",
    {
      title: "",
      imageUrl: undefined,
      categories: [],
      description: "",
      difficulty: "EASY",
      questions: [],
    }
  );

  const [questions, setQuestions] = useLocalStorage<QuestionValidtionType[]>(
    "questions",
    []
  );

  const [numberOfQuestions, setNumberOfQuestions] = useLocalStorage(
    "number-of-questions",
    1
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

  useEffect(() => {
    if (questions.length > numberOfQuestions) {
      setQuestions((prev) => prev.slice(0, numberOfQuestions));
    }
  }, [questions, setQuestions, numberOfQuestions]);

  useEffect(() => {
    const newFiles = files;
    Object.entries(files).forEach(([index, _]) => {
      if (parseInt(index) > numberOfQuestions) delete newFiles[parseInt(index)];
    });

    setFiles(newFiles);
  }, [questions, files, numberOfQuestions]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="quiz-info" about="information about the quiz ">
        <AccordionTrigger>Quiz Informations</AccordionTrigger>

        <AccordionContent className="px-3">
          <QuizInfoForm
            quizInfo={quizInfo}
            setQuizInfo={setQuizInfo}
            files={files}
            setFiles={setFiles}
            setStep={setStep}
            userId={userId}
          />
        </AccordionContent>
      </AccordionItem>
      {Array.from({ length: numberOfQuestions }, (_, i) => i).map((_, i) => {
        return (
          <AccordionItem value={`question=${i + 1}`} key={i}>
            {/* <div className="flex items-center gap-3">
              <div className="w-full"> */}
                <AccordionTrigger className="flex-1">
                  Question {i + 1}
                </AccordionTrigger>
              {/* </div> */}
              {/* <Button
                variant="outline"
                size="icon"
                className="w-7 h-7"
                onClick={() => {}}
              >
                <Trash className="w-3 h-3 text-red-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-7 h-7"
                onClick={() => {}}
              >
                <Save className="w-3 h-3" />
              </Button> */}
            {/* </div> */}
            <AccordionContent className="px-3">
              <PickAnswerForm
                setQuestion={setQuestion}
                question={questions[i]}
                index={i}
                files={files}
                setFiles={setFiles}
                setStep={setStep}
                numberOfQuestions={length}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
      <div className="grid grid-cols-2 gap-3">

      <Button
        size="lg"
        type="button"
        onClick={() => {
          if (numberOfQuestions === 10) {
            toast("Maximam 10 questions");
          } else {
            setNumberOfQuestions((prev) => prev + 1);
          }
        }}
        >
        Add Question
      </Button>
      <Button
        size="lg"
        type="button"
        onClick={() => {}}
        >
       Save
      </Button>
        </div>
    </Accordion>

    // <div className="w-full flex flex-col">
    //   <div className={cn({ hidden: step <= 0 })}>
    //     <QuizFormProgress
    //       numberOfQuestions={quizInfo.numberOfQuestions}
    //       step={step}
    //     />
    //   </div>
    //   <div className={cn({ hidden: step != 0 || isAllSuccess })}>
    //     <QuizInfoForm
    //       quizInfo={quizInfo}
    //       setQuizInfo={setQuizInfo}
    //       files={files}
    //       setFiles={setFiles}
    //       setStep={setStep}
    //       userId={userId}
    //     />
    //   </div>
    //   {Array.from({ length }, (_, i) => i).map((_, i) => {
    //     return (
    //       <div
    //         key={i}
    //         className={cn({ hidden: step !== i + 1 || isAllSuccess })}
    //       >
    //         <PickAnswerForm
    //           setQuestion={setQuestion}
    //           question={questions[i]}
    //           index={i}
    //           files={files}
    //           setFiles={setFiles}
    //           setStep={setStep}
    //           numberOfQuestions={length}
    //         />
    //       </div>
    //     );
    //   })}
    //   <div
    //     className={cn({
    //       hidden: step <= quizInfo.numberOfQuestions && !isAllSuccess,
    //     })}
    //   >
    //     <CreateStatus
    //       files={files}
    //       questions={questions}
    //       userId={userId}
    //       quizInfo={quizInfo}
    //       setStep={setStep}
    //       setQuestions={setQuestions}
    //       setQuizInfo={setQuizInfo}
    //       setIsAllSuccess={setIsAllSuccess}
    //     />
    //   </div>
    // </div>
  );
}
