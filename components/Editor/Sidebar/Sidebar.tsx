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
        timeLimit: 10000,
        points: 10,
      },
    ]);
    dispatch({ type: "SET_CURRENT_QUESTION_ID", payload: id });
  };
  return (
    <aside className="relative flex-shrink-0 border-t sm:border-t-0 sm:border-r  flex sm:flex-col">
  
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
  
    </aside>
  );
}
