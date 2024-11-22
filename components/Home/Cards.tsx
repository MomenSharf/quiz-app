import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export default function Cards() {
  return (
    <div className="container w-full flex flex-col gap-3 items-center h-full mt-3">
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl overflow-hidden flex">
          <div className="relative w-full bg-primary/80 flex flex-col justify-between gap-3 p-3 sm:p-5">
            <p className="text-white text-sm sm:text-lg font-medium">
              Start Your Journey: <br /> Create a New Quiz and Challenge the
              World!
            </p>
            <Button
              className="self-start bg-card text-primary hover:bg-card/90 rounded-xl"
              size="sm"
            >
              Create Quiz
            </Button>
            <Icons.quizzes className="absolute w-6 h-6 sm:w-10 sm:h-10 fill-white right-3 bottom-3" />
          </div>
        </div>
        <div className="bg-card rounded-xl overflow-hidden flex">
          <div className="relative w-full flex flex-col justify-between gap-3 p-3 sm:p-5">
            <p className="text-sm sm:text-lg font-medium">
              Test Your Knowledge: <br /> Play Exciting Quizzes Powered by AI!
            </p>
            <Button className="self-start rounded-xl" size="sm">
              Create with AI
            </Button>
            <Icons.aiStars className="absolute w-6 h-6 sm:w-10 sm:h-10 fill-primary right-3 bottom-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
