import { buttonVariants } from "@/components/ui/button";
import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import { cn } from "@/lib/utils";
import {
  questionSchemaType,
  quizSchemaType,
} from "@/lib/validations/quizSchemas";
import { Reorder, useMotionValue } from "framer-motion";
import { Circle } from "lucide-react";
import { useEditorContext } from "../Context";
import SidebarItemMenu from "./SidebarItemMenu";
import { Icons } from "@/components/icons";

export default function SidebarItem({
  question,
  questionIndex,
}: {
  question: questionSchemaType;
  questionIndex: number;
}) {
  const {
    dispatch,
    state: { currentQuestionId, isSettingsOpen },
    form: { getFieldState },
  } = useEditorContext();

  const y = useMotionValue(0);
  const Icon = QUESTION_TYPES_WITH_LABEL_AND_ICONS.find(
    (e) => e.value === question.type
  )?.icon;

  const { error } = getFieldState(`questions.${questionIndex}`);

  return (
    <Reorder.Item
      value={question}
      id={question.id}
      style={{ y }}
      onDragEnd={(e) => {
        dispatch({ type: "SET_CURRENT_QUESTION_ID", payload: question.id });
      }}
      key={question.id}
      className={cn(
        buttonVariants({ size: "icon", variant: "outline" }),
        "!min-w-16 !min-h-16 sm:!min-w-20 sm:!min-h-20 relative hover:border-ring hover:bg-background cursor-pointer",
        
        {
          "border-ring bg-accent hover:bg-accent":
            currentQuestionId === question.id && !isSettingsOpen,
        }
      )}
      onClick={() => {
        if (currentQuestionId !== question.id || isSettingsOpen) {
          if (isSettingsOpen)
            dispatch({
              type: "SET_IS_SETTINGS_OPEN",
              payload: false,
            });
          dispatch({ type: "SET_CURRENT_QUESTION_ID", payload: question.id });
        }
      }}
    >
      {Icon ? (
        <Icon
          className={cn(
            "w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground fill-gray-medium",
            {
              "text-primary fill-primary":
                currentQuestionId === question.id && !isSettingsOpen,
            }
          )}
        />
      ) : (
        <Circle className="w-7 h-7 text-transparent" />
      )}
      <span className="absolute top-1 left-1 text-muted-foreground text-xs">
        {question.questionOrder + 1}
      </span>
      <div className="absolute -top-0.5 right-0.5 sm:top-0 sm:right-1">
        <SidebarItemMenu question={question} />
      </div>
      {error && (
        <Icons.alert className="absolute w-4 h-4 fill-amber stroke-background -top-3 -right-2 z-10" />
      )}
    </Reorder.Item>
  );
}
