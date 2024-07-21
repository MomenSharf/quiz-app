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
import QuizFormProgress from "./QuizFormProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
      numberOfQuestions: 1,
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
  
  const [isAllSuccess, setIsAllSuccess] = useState(false)

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
    // <Tabs defaultValue={tab} className="w-full mt-3">
    //   <TabsList className="w-full justify-stretch">
    //     <TabsTrigger
    //       value="INFO"
    //       className="basis-1/3 transition-all"
    //       onClick={() => setTab("INFO")}
    //     >
    //       info
    //     </TabsTrigger>
    //     <TabsTrigger
    //       value="QUESTIONS"
    //       className="basis-1/3 transition-all"
    //       onClick={() => setTab("QUESTIONS")}
    //     >
    //       Questions
    //     </TabsTrigger>
    //     <TabsTrigger
    //       value="STATUS"
    //       className="basis-1/3 transition-all"
    //       onClick={() => setTab("STATUS")}
    //     >
    //       Status
    //     </TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="INFO">
    //     <QuizInfoForm
    //       quizInfo={quizInfo}
    //       setQuizInfo={setQuizInfo}
    //       files={files}
    //       setFiles={setFiles}
    //       setTab={setTab}
    //       userId={userId}
    //     />
    //   </TabsContent>
    //   <TabsContent value="QUESTIONS">
    //     <QuizFormProgress
    //       numberOfQuestions={quizInfo.numberOfQuestions}
    //       step={step}
    //     />
    //     {Array.from({ length }, (_, i) => i).map((_, i) => {
    //       return (
    //         <div key={i} className={cn({ hidden: step !== i })}>
    //           <PickAnswerForm
    //             setQuestion={setQuestion}
    //             question={questions[i]}
    //             index={i}
    //             files={files}
    //             setFiles={setFiles}
    //             setStep={setStep}
    //             numberOfQuestions={length}
    //           />
    //         </div>
    //       );
    //     })}
    //   </TabsContent>
    //   <TabsContent value="STATUS">
    //     <CreateStatus
    //       files={files}
    //       questions={questions}
    //       userId={userId}
    //       quizInfo={quizInfo}
    //       setStep={setStep}
    //       setQuestions={setQuestions}
    //       setQuizInfo={setQuizInfo}
    //     />
    //   </TabsContent>
    // </Tabs>
    <div className="flex flex-col">
      {/* <div className={cn({ hidden: step <= 0 })}>
        <QuizFormProgress
          numberOfQuestions={quizInfo.numberOfQuestions}
          step={step}
        />
      </div> */}
      <div className={cn({ hidden:( step != 0) || isAllSuccess })}>
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
          <div key={i} className={cn({ hidden: (step !== i + 1) || isAllSuccess })}>
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
      <div className={cn({ hidden: step <= quizInfo.numberOfQuestions && !isAllSuccess })}>
        <CreateStatus
          files={files}
          questions={questions}
          userId={userId}
          quizInfo={quizInfo}
          setStep={setStep}
          setQuestions={setQuestions}
          setQuizInfo={setQuizInfo}
          setIsAllSuccess={setIsAllSuccess}
        />
      </div>
    </div>
  );
}

export default CreateQuizForm;
