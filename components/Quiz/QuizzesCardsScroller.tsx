import React from "react";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { SearchQuiz } from "@/types";
import QuizCard from "./QuizCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MotionDiv } from "@/hooks/useMotion";

export default function QuizzesCardsScroller({
  quizzes,
  title,
  route,
}: {
  quizzes: SearchQuiz[];
  title: string;
  route: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-3">
        <h2 className="font-bold text-lg">{title}</h2>

        <Link
          href={route}
          className={cn(buttonVariants({ size: "sm", variant: "link" }))}
        >
          See more
        </Link>
      </div>
      <UseScrollerContainer
        scrollBy={300}
        className="flex gap-3 overflow-x-scroll"
      >
        {quizzes.map((quiz, i) => (
          <QuizCard key={quiz.id} quiz={quiz} index={i} />
        ))}
      </UseScrollerContainer>
    </div>
  );
}
