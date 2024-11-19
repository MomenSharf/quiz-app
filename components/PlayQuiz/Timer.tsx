import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Progress } from "../ui/progress";
import { TimerIcon, TimerOff } from "lucide-react";
import { usePlayQuizContext } from "./Context";
import { intervalToDuration } from "date-fns";
import { buttonVariants } from "../ui/button";

export default function Timer({
  timeLimit,
  questionOrder,
}: {
  timeLimit: number;
  questionOrder: number;
}) {

  const [isRunning, setIsRunning] = useState(false);
  // const [remainingTime, setRemainingTime] = useState((timeLimit * 1000) / 3); // Initialize with the passed timeLimit
  const [remainingTime, setRemainingTime] = useState(timeLimit); // Initialize with the passed timeLimit
  const intervalIdRef = useRef<number | null>(null);

  const {
    dispatch,
    state: { quizMode, currentQuestion },
  } = usePlayQuizContext();

  // Calculate progress as a percentage between 0 and 100
  const progressValue = (remainingTime / timeLimit) * 100;
  //  Math.floor(
  // );

  useEffect(() => {
    if (quizMode === "answered") {
      // Defer dispatch to prevent state updates during rendering
      setTimeout(() => {
        dispatch({
          type: "SET_TIME_TAKEN",
          payload: timeLimit - remainingTime,
        });
      }, 0);
      return; // Do not start the timer if answered
    }
    if (quizMode === "playing" && currentQuestion === questionOrder) {
      intervalIdRef.current = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalIdRef.current as number); // Stop the countdown when it reaches 0
            setTimeout(() => {
              dispatch({ type: "SET_TIME_TAKEN", payload: timeLimit });
              dispatch({ type: "SET_QUIZ_MODE", payload: 'timeOut' });
              setTimeout(() => {
                dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
              }, 500);
            }, 0);
            return 0;
          }
          return prevTime - 10; // Decrease the time by 10 ms
        });
      }, 10);
    }

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [dispatch, quizMode, remainingTime, timeLimit]); // Ensure remainingTime is included as a dependency

  function start() {
    if (remainingTime > 0) {
      setIsRunning((prev) => !prev);
    } else {
      reset();
    }
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setRemainingTime(timeLimit * 1000); // Reset to the timeLimit
    setIsRunning(false);
  }

  function formatTime() {
    const minutes = String(Math.floor(remainingTime / (1000 * 60))).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(
      2,
      "0"
    );
    const milliseconds = String(
      Math.floor((remainingTime % 1000) / 10)
    ).padStart(2, "0");

    return (
      <div
        className={cn("flex text-sm items-center text-success", {
          "text-[#FFC107]": remainingTime <= timeLimit / 3.5,
          "text-destructive": remainingTime <= timeLimit / 10,
        })}
      >
        <span>{minutes}</span>
        <span>:{seconds}</span>
        <span>:{milliseconds}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* <Progress
        value={Math.floor(progressValue)}
        className={cn("h-3 w-full border bg-transparent transition-colors", {
          "bg-destructive-var": remainingTime <= 1000,
        })}
      /> */}

      <div
        onClick={start}
        className={cn(buttonVariants(),
          "transition-colors text-sm flex gap-1 items-center justify-center py-2 px-4 bg-success/20 hover:bg-success/20 rounded-full",
          {
            "bg-[#FFC107]/20 hover:bg-[#FFC107]/20": remainingTime <= timeLimit / 3.5,
            "bg-destructive/20 hover:bg-destructive/20": remainingTime <= timeLimit / 10,
          }
        )}
      >
        {remainingTime > 0 ? (
          <TimerIcon
            className={cn("w-4 h-4 text-success", {
              "text-[#FFC107]": remainingTime <= timeLimit / 3.5,
              "text-destructive": remainingTime <= timeLimit / 10,
            })}
          />
        ) : (
          <TimerOff className="w-4 h-4 text-destructive" />
        )}
        {formatTime()}
      </div>
    </div>
  );
}
