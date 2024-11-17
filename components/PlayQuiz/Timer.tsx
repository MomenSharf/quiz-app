import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Progress } from "../ui/progress";
import { TimerIcon } from "lucide-react";
import { usePlayQuizContext } from "./Context";

export default function Timer({ timeLimit }: { timeLimit: number }) {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit * 1000 / 3); // Initialize with the passed timeLimit
  const intervalIdRef = useRef<number | null>(null);

  const {dispatch, state : {quizMode} } = usePlayQuizContext()

  // Calculate progress as a percentage between 0 and 100
  const progressValue = ((remainingTime / timeLimit) * 1000) / 10000
  //  Math.floor(
  // );

  useEffect(() => {
    // Log progressValue to see if it updates

    if (quizMode === 'playing') {
      intervalIdRef.current = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            dispatch({type: 'SET_QUIZ_MODE', payload:'timeOut'})
            
            clearInterval(intervalIdRef.current as number); // Stop the countdown when it reaches 0
            return 0;
          }
          return prevTime - 10; // Decrease the time by 10 ms (for smoother countdown)
        });
      }, 10);
    }

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [dispatch, quizMode, remainingTime]); // Ensure remainingTime is included as a dependency

  function start() {
    if (remainingTime > 0) {
      setIsRunning(prev => !prev);
    }else {
      reset()
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
      <div className="flex text-sm">
        <span>{minutes}</span>
        <span>:{seconds}</span>
        <span className="text-xs relative top-[2px]">:{milliseconds}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Progress
        value={Math.floor(progressValue)}
        className={cn("h-3 w-full border bg-transparent transition-colors", {
          "bg-destructive-var": remainingTime <= 1000, 
        })}
      />

      <div
        onClick={start}
        className={cn('transition-colors w-[80px] flex gap-1',{
          "text-destructive": remainingTime <= 1000, 
        })}
      >
        <TimerIcon className="left-2 w-4 h-4" />

        {formatTime()}
      </div>

      
    </div>
  );
}

