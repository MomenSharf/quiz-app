import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Item, PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { cn, shuffleArray } from "@/lib/utils";
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
  isCorrect,
  isShaking,
}: {
  item: Item;
  isShaking: boolean;
  isCorrect: boolean;
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
      initial={{ x: 0, scale: 1 }}
      animate={{
        x: isShaking ? [0, -10, 10, -10, 10, 0] : 0,
        scale: isCorrect ? [1, 1.1, 1] : 1,
        rotate: isCorrect ? [0, 5, -5, 0] : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="flex"
    >
      <div
        className={cn(
          buttonVariants(),
          "flex-1 rounded-tr-none rounded-br-none bg-card hover:bg-card text-foreground"
        )}
      >
        {item.text}
      </div>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="rounded-tl-none rounded-bl-none focus:z-10  bg-card hover:bg-card"
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
      playQuizQuestions,
      currentQuestion,
      userAnswer,
      isResultSheetOpen,
    },
  } = usePlayQuizContext();
  const shuffledItems = useCallback(
    () => shuffleArray([...question.items]),
    [question.items]
  );
  const [items, setItems] = useState(shuffledItems);

  useEffect(() => {
    if (quizMode === "answered" || quizMode === "timeOut") {
      setTimeout(() => {
        setItems(
          question.items.sort(
            (a, b) => (a.order ? a.order : 0) - (b.order ? b.order : 0)
          )
        );
      }, 500);
    } else if (
      quizMode === "playing" &&
      playQuizQuestions[currentQuestion] &&
      playQuizQuestions[currentQuestion].isAnswerRight === null &&
      currentQuestion !== 0
    ) {
      setItems(shuffleArray([...question.items]));
    }
  }, [quizMode]);

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "CORRECT_ORDER";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "CORRECT_ORDER";

  return (
    items && (
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
        className="flex flex-col gap-3"
      >
        {items.map((item, i) => {
          return (
            <CorrectOrderItem
              key={item.id}
              item={item}
              isShaking={isShaking}
              isCorrect={isCorrect || false}
            />
          );
        })}
        <Button
          onClick={() => {
            if (quizMode === "playing") {
              dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
              dispatch({
                type: "SET_USER_ANSWER",
                payload: { type: "CORRECT_ORDER", answer: items },
              });
            }
          }}
          disabled={(quizMode === "answered" || quizMode === "timeOut")}
        >
          Submit
        </Button>
      </Reorder.Group>
    )
  );
}
