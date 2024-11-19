import stringSimilarity from "string-similarity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlayQuizQuestion, usePlayQuizContext } from "../Context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ShortAnswer({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const [animationKey, setAnimationKey] = useState(0);

  const {
    dispatch,
    state: {
      playQuizQuestions,
      currentQuestion,
      timeTaken,
      quizMode,
      userAnswer,
    },
  } = usePlayQuizContext();

  const userInputSchama = z.object({
    userInput: z.string().min(1, "At least one character"),
  });
  type userInputSchamaType = z.infer<typeof userInputSchama>;
  const shortAnswerForm = useForm<userInputSchamaType>({
    resolver: zodResolver(userInputSchama),
    defaultValues: { userInput: "" },
  });

  const { control, getFieldState, handleSubmit } = shortAnswerForm;

  const isShaking =
    quizMode === "answered" &&
    !playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "SHORT_ANSWER";

  const isCorrect =
    quizMode === "answered" &&
    playQuizQuestions[currentQuestion].isAnswerRight &&
    userAnswer?.type === "SHORT_ANSWER";

  const onSubmit = (data: userInputSchamaType) => {
    console.log(10);

    if (question.correctAnswer) {
      if (quizMode === "playing") {
        dispatch({ type: "SET_QUIZ_MODE", payload: "answered" });
        dispatch({
          type: "SET_USER_ANSWER",
          payload: { type: "SHORT_ANSWER", answer: data.userInput },
        });
      }
    }
  };

  return (
    <Form {...shortAnswerForm}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name={"userInput"}
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col">
              <FormControl>
                <motion.div
                  key={animationKey} // This forces a re-render when isCorrect changes
                  whileTap={{
                    scale: 0.99,
                    transition: {
                      duration: 0.1,
                    },
                  }}
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
                >
                  <Textarea
                    className={cn(
                      "resize-none font-semibold focus:z-10 h-28 text-start bg-background",
                      {
                        "border-destructive focus-visible:ring-destructive":
                          getFieldState("userInput").error || isShaking,
                        "border-success focus-visible:ring-success": isCorrect,
                      }
                    )}
                    placeholder="Type your answer..."
                    {...field}
                  />
                </motion.div>
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
