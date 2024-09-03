import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import { Badge } from "../ui/badge";
import EditorSidebarItemMenu from "./EditorSidebarItemMenu";
import { Icons } from "../icons";
import { Circle, Ellipsis } from "lucide-react";
import { useEditorContext } from "./EditorContext";

interface EditorSidebarItemProps {
  question: questionSchemaType;
  index: number;
}

export default function EditorSidebarItem({
  question,
  index,
}: EditorSidebarItemProps) {
  const {
    dispatch,
    state: { currentQuestion },
  } = useEditorContext();

  const y = useMotionValue(0);
  const Icon = QUESTION_TYPES_WITH_LABEL_AND_ICONS.find(
    (e) => e.value === question.type
  )?.icon;

  return (
    <Reorder.Item
      value={question}
      id={question.id}
      style={{ y }}
      onDragEnd={(e) => {
        dispatch({ type: "SET_CURRENT_QUESTION", payload: question.id });
      }}
    >
      <div
        key={question.id}
        className={cn(
          buttonVariants({ size: "icon", variant: "outline" }),
          "py-10 w-full min-w-20 min-h-20 relative hover:border-ring hover:bg-background cursor-pointer",
          {
            "border-ring bg-accent hover:bg-accent":
              currentQuestion === question.id,
          }
        )}
        onClick={() => {
          if (currentQuestion !== question.id)
            dispatch({ type: "SET_CURRENT_QUESTION", payload: question.id });
        }}
      >
        {Icon ? (
          <Icon
            className={cn(
              "w-7 h-7 text-muted-foreground fill-muted-foreground",
              {
                "text-primary fill-primary": currentQuestion === question.id,
              }
            )}
          />
        ): (
          <Circle className="w-7 h-7 text-transparent" />
        )}
        <span className="absolute top-1 left-1 text-muted-foreground text-xs">
          {question.questionOrder + 1}
        </span>
        <div className="absolute top-1 right-1">
          <EditorSidebarItemMenu
            trigger={
              <Button
                className="group px-1.5 py-0.5 h-auto rounded-full hover:bg-primary focus-visible:ring-1"
                size="sm"
                variant="ghost"
              >
                <Ellipsis className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground" />
              </Button>
            }
            contentPostionClasses="sm:left-20"
            question={question}
          />
        </div>
      </div>
    </Reorder.Item>
  );
}
