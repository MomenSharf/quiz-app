import { Button } from "@/components/ui/button";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import { Reorder } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import { useEditorContext } from "../Context";
import SidebarItem from "./SidebarItem";
import { useScroller } from "@/hooks/useScroller";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    dispatch,
    form: {
      setValue,
      getValues,
      formState: { errors },
      trigger,
    },
  } = useEditorContext();

  const { goLeft, goRight, isLeftVisible, isRightVisible, sliderRef } =
    useScroller();
  const questions = getValues("questions");
  const dimensions = useScreenDimensions();

  const newQuetion = async () => {
    const id = crypto.randomUUID();
    setValue("questions", [
      ...questions,
      {
        id,
        type: "UNSELECTED",
        questionOrder: questions.length,
        timeLimit: 5000,
        points: 1,
      },
    ]);
    dispatch({ type: "SET_CURRENT_QUESTION_ID", payload: id });
  };
  return (
    <aside className="relative flex-shrink-0 border-t sm:border-t-0 sm:border-r  flex sm:flex-col">
      {/* <Button
        size="icon"
        variant="outline"
        className="absolute w-10 h-3 sm:w-4 sm:h-9 bg-white hover:bg-white border-0 rounded-bl-none rounded-br-none sm:rounded-tl-none sm:rounded-bl-none sm:rounded-br-md -top-3 right-8  sm:top-16 sm:-right-4"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? (
          <>
            <ChevronLeft className="hidden sm:block w-3 h-3 sm:w-4 sm:h-4" />
            <ChevronDown className="sm:hidden w-3 h-3 sm:w-4 sm:h-4" />
          </>
        ) : (
          <>
            <ChevronRight className="hidden sm:block w-3 h-3 sm:w-4 sm:h-4" />
            <ChevronUp className="sm:hidden w-3 h-3 sm:w-4 sm:h-4" />
          </>
        )}
      </Button> */}
      {/* <div
        className={cn("relative flex sm:flex-col", {
          hidden: !isSidebarOpen,
        })}
      > */}
        {isLeftVisible && (
          <div
            className="flex sm:hidden cursor-pointer group absolute z-[2] top-1/2 left-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full justify-center items-center"
            onClick={goLeft}
          >
            <ChevronLeft
              className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary"
              onClick={goLeft}
            />
          </div>
        )}
        <Reorder.Group
          axis={dimensions.width >= 640 ? "y" : "x"}
          onReorder={async (questions) => {
            setValue(
              "questions",
              questions.map((question, i) => ({
                ...question,
                questionOrder: i,
              }))
            );
            if (errors.questions) {
              await trigger();
            }
          }}
          ref={sliderRef}
          values={questions}
          style={{ height: 250, border: "1px solid black", overflowY: "auto" }}
          layoutScroll
          className="p-1.5 sm:p-3 flex-1 sm:flex-none !border-none flex sm:flex-col gap-2 !h-auto editor-sidebar z-10 !overflow-y-visible"
        >
          {questions
            .sort((a, b) => a.questionOrder - b.questionOrder)
            .map((question, i) => (
              <SidebarItem key={question.id} question={question} questionIndex={i} />
            ))}
        </Reorder.Group>
        <div className="sm:flex-1  border-l sm:border-t sm:border-l-0 p-1.5 flex justify-start items-center sm:justify-center sm:items-start">
          <Button
            type="button"
            variant="outline"
            onClick={newQuetion}
            className="w-16 h-16 sm:w-20 sm:h-20  relative hover:border-ring hover:bg-background"
          >
            <Plus
              strokeWidth={3}
              className="w-4 h-4 sm:w-5 sm:h-5  text-muted-foreground"
            />
          </Button>
        </div>
        {isRightVisible && (
          <div
            className="flex sm:hidden cursor-pointer group absolute z-[2] top-1/2 right-20 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full justify-center items-center"
            onClick={goRight}
          >
            <ChevronRight className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary" />
          </div>
        )}
      {/* </div> */}
    </aside>
  );
}
