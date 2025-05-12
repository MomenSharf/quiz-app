import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Cards() {
  return (
    <div className="w-full flex flex-col gap-3 items-center h-full">
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl overflow-hidden flex">
          <div className="relative w-full bg-primary/80 flex flex-col gap-2 p-3 sm:p-5 ">
            <h4 className="text-sm sm:text-lg font-bold text-white">
              Start Your Journey
            </h4>
            <p className="text-xs sm:text-sm text-white">
              Create a New Quiz and Challenge the World!
            </p>
            <Link
              className={cn(
                buttonVariants({ size: "sm" }),
                "self-start mt-auto justify-items-end bg-card text-primary hover:bg-card/90 rounded-xl"
              )}
              href="editor/new"
            >
              Create Quiz
            </Link>
            <Icons.quizzes className="absolute w-6 h-6 sm:w-10 sm:h-10 fill-white right-3 bottom-3" />
          </div>
        </div>
        <div className="bg-card rounded-xl overflow-hidden flex">
          <div className="relative w-full flex flex-col   gap-2 p-3 sm:p-5">
            <h4 className="text-sm sm:text-lg font-bold">
              Test Your Knowledge
            </h4>
            <p className="justify-self-start text-xs sm:text-sm">
              Play Exciting Quizzes Powered by AI!
            </p>
            <div className="flex items-center gap-2 h-full">
              <Button className="self-start mt-auto rounded-xl" size="sm">
                Play with AI{" "}
              </Button>
            </div>
            <Icons.aiStars className="absolute w-6 h-6 sm:w-10 sm:h-10 fill-primary right-3 bottom-3" />
            <span className="text-xxs text-primary absolute top-1 sm:top-3 right-3">
              {"( Soon... )"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
