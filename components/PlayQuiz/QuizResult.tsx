import React, { useEffect, useState } from "react";
import { usePlayQuizContext } from "./Context";
import { UserAvatar, UserAvatarImage } from "../User/UserAvatar";
import { getCurrentUser } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Medal, Send, Star, TimerIcon, Watch, WatchIcon } from "lucide-react";
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
      <div className="flex flex-col gap-5">
        <div className="flex-1 flex justify-center items-center">
          <ResultProgress progress={80} />
        </div>

        <div className="grid grid-cols-3 gap-3 justify-center">
          <div className="bg-white rounded-2xl">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Icons.logo className="w-6 h-6 sm:w-10 sm:h-10 fill-primary" />
              <span className="text-lg sm:text-3xl font-medium">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-primary/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <Medal className="w-6 h-6 sm:w-10 sm:h-10 text-[#FFC107]" />
              <span className="text-lg sm:text-3xl font-medium">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl ">
            <div className="flex flex-col gap-1 p-2 sm:p-3 bg-[#e91e63]/5 rounded-xl max-w-[180px] shadow-sm h-full">
              <TimerIcon className="w-6 h-6 sm:w-10 sm:h-10 text-[#e91e63]" />
              <span className="text-lg sm:text-3xl font-medium">{`${correctAnswer.length}/${playQuizQuestions.length}`}</span>
              <p className="text-gray-600 text-xs sm:text-sm ">
                Questions you have answerd right
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1">
            <Icons.home className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Home</span>
          </Button>
          <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-[#FFC107] hover:bg-[#FFC107]/90">
            <Icons.star className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Rate</span>
          </Button>
          <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-[#e91e63] hover:bg-[#e91e63]/90">
            <Icons.send className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
            <span className="text-xs">Rate</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
