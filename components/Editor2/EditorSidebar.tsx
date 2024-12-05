import { UNSAVED_ID_PREFIX } from "@/constants";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import { Reorder } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEditorContext } from "./EditorContext";
import EditorSidebarItem from "./EditorSidebarItem";

export default function EditorSidebar() {
  const {
    dispatch,
    state: { currentQuestion },
    form: {
      setValue,
      getValues,
      formState: { errors },
      trigger,
    },
    headerRef,
    sidebarRef,
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
        timeLimit: 5000,
        points: 1,
      },
    ]);
    dispatch({ type: "SET_CURRENT_QUESTION", payload: id });
  };

  return (
    <div
      className="border-t sm:border-t-0 sm:border-r flex flex-col"
      ref={sidebarRef}
      style={{
        height: `${
          dimensions.width >= 640
            ? `calc(100vh - ${headerRef.current?.offsetHeight || 50}px`
            : "auto"
        }`,
      }}
    >
      <div className="flex sm:flex-col max-w-screen-sm overflow-y-auto">
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
          className="p-3 flex-1 !border-none flex sm:flex-col gap-2 !h-auto overflow-x-auto overflow-y-auto"
        >
          {questions.map((question, i) => (
            <EditorSidebarItem
              key={question.id}
              question={question}
            />
          ))}
        </Reorder.Group>
        <div className="border-l sm:border-t sm:border-l-0 p-3">
          <Button
            type="button"
            variant="outline"
            onClick={newQuetion}
            className="py-10 w-full min-w-20 min-h-20 relative hover:border-ring hover:bg-background"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
