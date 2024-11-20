import React, { useEffect, useState } from "react";
import { usePlayQuizContext } from "./Context";
import { UserAvatar, UserAvatarImage } from "../User/UserAvatar";
import { getCurrentUser } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Medal, TimerIcon, Watch, WatchIcon } from "lucide-react";
import ResultProgress from "./circular-bar/ResultProgress";

export default function QuizResult() {
  const {
    state: { playQuizQuestions },
  } = usePlayQuizContext();
  const { data: session } = useSession();

  const correctAnswer = playQuizQuestions.filter(
    (question) => question.isAnswerRight
  );

  const progress = 5;

  return (
    <div className="w-full h-full flex-1 flex flex-col gap-5">
      <Button className="text-lg px-7 rounded-full self-center">
        Quiz Result
      </Button>
      <div className="flex flex-col gap-3">
        <div className="flex-1 flex justify-center items-center">
          <div className="progress-circle-outer">
            <div>
              <ResultProgress progress={5} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-3 justify-center">
          <div className="bg-white rounded-2xl">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm">
              <Icons.logo className="w-6 h-6 sm:w-10 sm:h-10 fill-primary" />
              <span className="text-lg sm:text-3xl font-medium">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl">
            <div className="flex flex-col gap-1 p-3 bg-[#FFC107]/5 rounded-xl max-w-[180px] shadow-sm">
              <Medal className="w-10 h-10 text-[#FFC107]" />
              <span className="text-3xl">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl ">
            <div className="flex flex-col gap-1 p-3 bg-success/5 rounded-xl max-w-[180px] shadow-sm">
              <TimerIcon className="w-10 h-10 text-success" />
              <span className="text-3xl">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="w-full h-full p-5">

          <Button className="w-full h-full" size='icon'>
            <Icons.home className="w-16 h-16 fill-white" />
          </Button>
          </div>
    
        </div>

      </div>
    </div>
  );
}
