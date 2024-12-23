import { QUESTION_MARK_TIMES } from "@/constants";
import { formatToMinSec } from "@/lib/utils";
import { motion } from "framer-motion";
import { Medal, TimerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import ResultProgress from "./circular-bar/ResultProgress";
import { usePlayQuizContext } from "./Context";
import RateDialog from "./RateDialog";

export default function QuizResult() {
  const {
    state: { playQuizQuestions, timeTakenArray, quizMode },
  } = usePlayQuizContext();
  const [g, setG] = useState(false);

  const router = useRouter();

  const [progress, setProgress] = useState(0);

  const correctQuestions = playQuizQuestions.filter(
    (question) => question.isAnswerRight
  );

  const totalTime = playQuizQuestions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );
  const timeTaken =
    timeTakenArray &&
    timeTakenArray.reduce((acc, curr) => acc + curr.timeTaken, 0);

  const totalPoints = playQuizQuestions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  const userPoints = correctQuestions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  const updatedQuizQuestions = playQuizQuestions.map((question) => {
    const timeTaken =
      timeTakenArray?.find((t) => t.questionId === question.id)?.timeTaken || 0;
    return { ...question, timeTaken };
  });

  // Calculate scores
  const maximumScore = updatedQuizQuestions.reduce(
    (total, question) => total + question.points,
    0
  );

  const userScore = updatedQuizQuestions
    .filter((question) => question.isAnswerRight)
    .reduce((total, question) => {
      const { points, timeLimit, timeTaken } = question;

      const adjustedTimeTaken =
        timeTaken < QUESTION_MARK_TIMES[`${question.type}`]
          ? 0
          : timeTaken - 3000;

      const calculatedScore =
        timeTaken <= timeLimit
          ? points * (1 - adjustedTimeTaken / timeLimit)
          : 0;
      return total + calculatedScore;
    }, 0);

  useEffect(() => {
    const progress =
      quizMode === "ended" ? (userScore / maximumScore) * 100 : 0;
    setProgress(progress);
  }, [quizMode, totalPoints, userPoints]);

  return (
    <div className="w-full h-full flex-1 flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex-1 flex flex-col gap-2 justify-center items-center">
          <ResultProgress progress={progress} score={userScore} />
          <div className="text-xs">
            Maximum socre is :{" "}
            <span className="text-sm text-primary">{maximumScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 justify-center">
          <motion.div
            initial={{ opacity: 0, x: 10 }} // Start slightly from the right
            animate={{ opacity: 1, x: 0 }} // Move to original position and become visible
            transition={{
              delay: 0 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="bg-card rounded-xl"
            onClick={() => setG((prev) => !prev)}
          >
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Icons.logo className="w-6 h-6 sm:w-10 sm:h-10 fill-primary" />
              <span className="text-lg sm:text-2xl font-medium">{`${correctQuestions.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-DARK text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }} // Start slightly from the right
            animate={{ opacity: 1, x: 0 }} // Move to original position and become visible
            transition={{
              delay: 1 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="bg-card rounded-xl"
          >
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Medal className="w-6 h-6 sm:w-10 sm:h-10 text-yellow" />
              <span className="text-lg sm:text-2xl font-medium">{`${userPoints}/${totalPoints}`}</span>
              <p className="text-gray-DARK text-xs sm:text-sm ">
                Points you get it
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }} // Start slightly from the right
            animate={{ opacity: 1, x: 0 }} // Move to original position and become visible
            transition={{
              delay: 2 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="bg-card rounded-xl "
          >
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-pink/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <TimerIcon className="w-6 h-6 sm:w-10 sm:h-10 text-pink" />
              <span className="text-lg sm:text-xl font-medium">{`${formatToMinSec(
                timeTaken || 0
              )}/${formatToMinSec(totalTime)}`}</span>
              <p className="text-gray-DARK text-xs sm:text-sm ">Time Taken</p>
            </div>
          </motion.div>
        </div>
        <div className="flex gap-3 justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Start above the screen
            animate={{ opacity: 1, y: 0 }} // Move to original position and become visible
            transition={{
              delay: 0 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="animated-item"
          >
            <Button
              className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1"
              onClick={() => {
                router.push("/");
              }}
            >
              <Icons.home className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
              <span className="text-xs">Home</span>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Start above the screen
            animate={{ opacity: 1, y: 0 }} // Move to original position and become visible
            transition={{
              delay: 1 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="animated-item"
          >
           <RateDialog />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Start above the screen
            animate={{ opacity: 1, y: 0 }} // Move to original position and become visible
            transition={{
              delay: 2 * 0.3, // Delay for each item based on its index
              duration: 0.6, // Duration for the animation
            }}
            className="animated-item"
          >
            <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-pink hover:bg-pink/90">
              <Icons.send className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
              <span className="text-xs">Share</span>
            </Button>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
