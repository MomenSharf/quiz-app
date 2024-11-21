import { Medal, TimerIcon } from "lucide-react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import ResultProgress from "./circular-bar/ResultProgress";
import { usePlayQuizContext } from "./Context";
import { formatToMinSec } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTION_MARK_TIMES } from "@/constants";

export default function QuizResult() {
  const {
    state: { playQuizQuestions, timeTakenArray, quizMode },
  } = usePlayQuizContext();

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

      const adjustedTimeTaken = timeTaken < QUESTION_MARK_TIMES[`${question.type}`] ? 0 : timeTaken - 3000;

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
          <div className="bg-white rounded-xl">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Icons.logo className="w-6 h-6 sm:w-10 sm:h-10 fill-primary" />
              <span className="text-lg sm:text-3xl font-medium">{`${correctQuestions.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Medal className="w-6 h-6 sm:w-10 sm:h-10 text-[#FFC107]" />
              <span className="text-lg sm:text-3xl font-medium">{`${userPoints}/${totalPoints}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Points you get it
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl ">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-[#e91e63]/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <TimerIcon className="w-6 h-6 sm:w-10 sm:h-10 text-[#e91e63]" />
              <span className="text-lg sm:text-3xl font-medium">{`${formatToMinSec(
                timeTaken || 0
              )}/${formatToMinSec(totalTime)}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">Time Taken</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1"
            onClick={() => {
              router.push("/");
            }}
          >
            <Icons.home className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Home</span>
          </Button>
          <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-[#FFC107] hover:bg-[#FFC107]/90">
            <Icons.star className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Rate</span>
          </Button>
          <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-[#e91e63] hover:bg-[#e91e63]/90">
            <Icons.send className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
