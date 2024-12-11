import { Button } from "@/components/ui/button";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import { Reorder } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEditorContext } from "../Context";
import SidebarItem from "./SidebarItem";
import { useScroller } from "@/hooks/useScroller";

export default function Sidebar() {
  const {
    dispatch,
    state: { currentQuestionId },
    form: {
      setValue,
      getValues,
      formState: { errors },
      trigger,
    },
  } = useEditorContext();

  const {goLeft, goRight, isLeftVisible,isRightVisible, sliderRef} = useScroller()
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
    dispatch({ type: "SET_CURRENT_QUESTION", payload: id });
  };
  return <aside className="relative flex-shrink-0 border-t sm:border-t-0 sm:border-r flex flex-col">
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
     <div className="flex sm:flex-col"
     style={{'strokeWidth': 'Initial'}}>
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
          className="p-1.5 sm:p-3 flex-1 !border-none flex sm:flex-col gap-2 !h-auto overflow-x-auto overflow-y-auto editor-sidebar"
        >
          {questions.map((question, i) => (
            <SidebarItem
              key={question.id}
              question={question}
            />
          ))}
        </Reorder.Group>
        <div className="border-l sm:border-t sm:border-l-0 p-1.5 flex justify-center items-center">
          <Button
            type="button"
            variant="outline"
            onClick={newQuetion}
            className="w-16 h-16 sm:w-20 sm:h-20  relative hover:border-ring hover:bg-background"
          >
            <Plus strokeWidth={2} className="w-5 h-5 sm:w-7 sm:h-7  text-muted-foreground" />
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
      </div>
  </aside>;
}
