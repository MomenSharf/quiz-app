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

function MatchingPairsItem({
  type,
  item,
  isCorrect,
  isShaking,
}: {
  type: "text" | "match";
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
        {type === "text" ? item.text : item.match}
      </div>
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
    </Reorder.Item>
  );
}

export default function MatchingPairs({
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
  const shuffledmatches = useCallback(
    () => shuffleArray([...question.items]),
    [question.items]
  );
  const [texts, setTexts] = useState(shuffledItems);
  const [matches, setMatches] = useState(shuffledmatches);

  useEffect(() => {
    if (
      quizMode === "answered" &&
      !playQuizQuestions[currentQuestion].isAnswerRight
    ) {
      setTimeout(() => {
        setTexts(question.items);
        setMatches(question.items);
      }, 300);
    } else if (
      quizMode === "playing" &&
      playQuizQuestions[currentQuestion] &&
      playQuizQuestions[currentQuestion].isAnswerRight === null &&
      currentQuestion !== 0
    ) {
      setTexts(shuffleArray([...question.items]));
      setMatches(shuffleArray([...question.items]));
    }
  }, [quizMode]);

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "MATCHING_PAIRS";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "MATCHING_PAIRS";

  return (
    texts &&
    matches && (
      <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-1">
        <Reorder.Group
          axis="y"
          onReorder={setTexts}
          values={texts}
          className="flex flex-col gap-3 w-full"
        >
          {texts.map((text, i) => {
            return (
              <MatchingPairsItem
                type="text"
                key={text.id}
                item={text}
                isShaking={isShaking}
                isCorrect={isCorrect || false}
              />
            );
          })}
        </Reorder.Group>
        <Reorder.Group
          axis="y"
          onReorder={setMatches}
          values={matches}
          className="flex flex-col gap-3 w-full"
        >
          {matches.map((match, i) => {
            return (
              <MatchingPairsItem
                type="match"
                key={match.id}
                item={match}
                isShaking={isShaking}
                isCorrect={isCorrect || false}
              />
            );
          })}
        </Reorder.Group>
        <Button
          className="col-span-2"
          onClick={() => {
            if (quizMode === "playing") {
              dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
              dispatch({
                type: "SET_USER_ANSWER",
                payload: { type: "MATCHING_PAIRS", answer: { texts, matches } },
              });
            }
          }}
          disabled={(quizMode === "answered" || quizMode === "timeOut")}

        >
          Submit
        </Button>
      </div>
    )
  );
}
