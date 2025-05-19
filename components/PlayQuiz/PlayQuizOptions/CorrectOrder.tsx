import { Button, buttonVariants } from "@/components/ui/button";
import { cn, shuffleArray } from "@/lib/utils";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Item, PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { ReorderIcon } from "./Icon";

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
  const iRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) =>
      e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener("touchstart", touchHandler, { passive: false });

      return () => {
        //@ts-ignore
        iTag.removeEventListener("touchstart", touchHandler, {
          passive: false,
        });
      };
    }
  }, [iRef]);

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
          "flex-1 rounded-tr-none rounded-br-none bg-card hover:bg-card text-foreground max-w-[90%]"
        )}
      >
        <span className="truncate max-w-full">
          {item.text} 
        </span>
      </div>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="rounded-tl-none rounded-bl-none border-none"
      >
        <ReorderIcon
          dragControls={dragControls}
          ref={iRef}
          className="fill-accent-foreground w-3 h-4"
        />
      </Button>
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
  }, [currentQuestion, playQuizQuestions, question.items, quizMode]);

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "CORRECT_ORDER";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "CORRECT_ORDER";

  return (
    <div className="grid grid-cols-1">
      {items && (
        <Reorder.Group
          axis="y"
          onReorder={setItems}
          values={items}
          className="flex flex-col gap-3 max-w-full"
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
            disabled={quizMode === "answered" || quizMode === "timeOut"}
          >
            Submit
          </Button>
        </Reorder.Group>
      )}
    </div>
  );
}
