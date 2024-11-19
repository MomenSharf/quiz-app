import React, { useState } from "react";
import { Item, PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GripVertical } from "lucide-react";

function CorrectOrderItem({
  item,
  itemIndex,
}: {
  item: Item;
  itemIndex: number;
}) {
  
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      whileDrag={{ scale: 1.05 }}
      dragListener={false}
      dragControls={dragControls}
      className="flex"
    >
      <div
        className={cn(
          buttonVariants(),
          "flex-1 rounded-tr-none rounded-br-none bg-white hover:bg-white text-foreground"
        )}
      >
        {item.text}
      </div>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="rounded-tl-none rounded-bl-none focus:z-10  bg-white hover:bg-white"
          >
            <GripVertical
              onPointerDown={(e) => dragControls.start(e)}
              className="w-4 h-4 rounded-tl-none rounded-bl-none text-primary"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">Reorder</TooltipContent>
      </Tooltip>
    </Reorder.Item>
  );
}

export default function CorrectOrder({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const {
    dispatch,
    state: {
      quizMode,
      userAnswer,
      playQuizQuestions,
      currentQuestion,
      timeTaken,
    },
  } = usePlayQuizContext();
  const [items, setItems] = useState(question.items);

  return (
    items && (
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
        className="flex flex-col gap-3"
      >
        {items.map((item, i) => {
          return <CorrectOrderItem key={item.id} item={item} itemIndex={i} />;
        })}
        <Button
          onClick={() => {
            const newPlayQuizQuestions = playQuizQuestions.map(
              (question, i) => {
                if (currentQuestion === i) {
                  return {
                    ...question,
                    isAnswerRight: question.correctAnswer === "true",
                    timeTaken,
                  };
                } else {
                  return question;
                }
              }
            );
            if (quizMode === "playing") {
              dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
              dispatch({ type: "SET_USER_ANSWER", payload: item });
              setTimeout(() => {
                dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
              }, 500);
              dispatch({
                type: "SET_PLAY_QUIZ_QUESTIONS",
                payload: newPlayQuizQuestions,
              });
            }
          }}
        >
          Submit
        </Button>
      </Reorder.Group>
    )
  );
}
