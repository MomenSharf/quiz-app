import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  questionSchemaType,
  quizSchemaType,
} from "@/lib/validations/quizSchemas";
import { Reorder } from "framer-motion";
import EditorSidebarItem from "./EditorSidebarItem";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import { setQuarter } from "date-fns";
type EditorSidebarProps = {
  headerRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  form: UseFormReturn<quizSchemaType>;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
};

export default function EditorSidebar({
  headerRef,
  sidebarRef,
  form,
  currentQuestion,
  setCurrentQuestion,
}: EditorSidebarProps) {
  const questions = form.getValues("questions");
  const dimensions = useScreenDimensions();
  console.log(questions);
  

  const newQuetion = async () => {
     form.setValue("questions", [
      ...questions,
      {
        id: questions.length.toString(),
        content: {
          type: "UNSELECTED",
          questionOrder: questions.length,
        },
      },
    ]);
    setCurrentQuestion(questions.length)
  };

  return (
    <div
      className="border-t sm:border-t-0 sm:border-r flex flex-col  bg-background"
      ref={sidebarRef}
      style={{
        height: `${
          dimensions.width >= 640
            ? `calc(100vh - ${headerRef.current?.offsetHeight || 50}px`
            : "auto"
        }`,
      }}
    >
      <div className="flex sm:flex-col max-w-screen-sm overflow-y-auto ">
        <Reorder.Group
          axis={dimensions.width >= 640 ? "y" : "x"}
          onReorder={(questions) =>
            form.setValue(
              "questions",
              questions.map((question, i) => ({
                ...question,
                content: {
                  ...question.content,
                  questionOrder: i,
                },
              }))
            )
          }
          values={questions}
          style={{ height: 250, border: "1px solid black", overflowY: "auto" }}
          layoutScroll
          className="p-3 flex-1 !border-none flex sm:flex-col gap-2 !h-auto overflow-x-auto overflow-y-auto"
        >
          {questions.map((question, i) => (
            <EditorSidebarItem
              key={question.id}
              question={question}
              index={i}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          ))}
        </Reorder.Group>
        <div className="border-l sm:border-t sm:border-l-0 p-3">
          <Button variant="outline" onClick={newQuetion} className="py-10 w-full min-w-20 min-h-20 relative hover:border-ring hover:bg-background">
            <Plus className="w-4 h-4 text-muted-foreground"  />
          </Button>
        </div>
      </div>
    </div>
  );
}
